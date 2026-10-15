import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { z } from 'zod';

// The app owns the category list and the demo data; the server reads the same files.
import { DEMO, DEMO_KEYS } from '../../app/src/api/demo';
import { CATEGORIES } from '../../app/src/data/categories';
import type { Lang } from '../../app/src/data/types';
import type { Classification } from '../../app/src/logic/decide';

export const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export type MediaType = (typeof MEDIA_TYPES)[number];

const KEYS = CATEGORIES.map((c) => c.key) as [string, ...string[]];

/** What the model must return. Categories are an enum, so it cannot invent one. */
const Result = z.object({
  parts: z.array(
    z.object({
      category: z.enum(KEYS),
      label: z.string().describe('Short name of the part, in the user language'),
      confidence: z.number().describe('0 to 1'),
    }),
  ),
  alternatives: z.array(z.enum(KEYS)).describe('Up to 2 other plausible categories for the least certain part'),
});

const LANG_NAME: Record<Lang, string> = { es: 'Spanish', en: 'English', de: 'German' };

const SYSTEM = `You identify household waste in a photo for a recycling app used in Germany.
Classify what the person is about to throw away into the categories below. Only classify; the app decides the bin.

Rules:
- One entry in "parts" per part a person would separate before throwing it away (a yogurt cup and its foil lid are two parts). Usually one part.
- "confidence" is your honest probability that the category is right. Use below 0.5 when the photo is unclear or the item is ambiguous.
- If there is no identifiable waste item in the photo, return an empty "parts" list.
- "alternatives": up to 2 other categories that could also fit the least certain part.

Categories (key: name; examples):
${CATEGORIES.map((c) => `- ${c.key}: ${c.name.en}${c.words.length ? `; ${c.words.filter((w) => /^[\x00-\x7F]+$/.test(w)).slice(0, 6).join(', ')}` : ''}`).join('\n')}`;

export type Classifier = (image: string, mediaType: MediaType, lang: Lang) => Promise<Classification>;

/** Test mode: no API key, so return the canned results in turn. */
export function demoClassifier(): Classifier {
  let turn = 0;
  return async () => DEMO[DEMO_KEYS[turn++ % DEMO_KEYS.length]];
}

export function claudeClassifier(client: Anthropic, model: string): Classifier {
  return async (image, mediaType, lang) => {
    const response = await client.beta.messages.parse({
      model,
      max_tokens: 4096,
      output_config: { effort: 'low', format: betaZodOutputFormat(Result) },
      // On a safety decline the API re-runs the request on a fallback model it picks.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
            { type: 'text', text: `Write each "label" in ${LANG_NAME[lang]}.` },
          ],
        },
      ],
    });
    // A refusal or a truncated answer becomes "no parts", which the app shows as "I'm not sure".
    if (response.stop_reason !== 'end_turn' || !response.parsed_output) return { parts: [] };
    return response.parsed_output;
  };
}
