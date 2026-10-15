import { CATEGORY } from '../data/categories';
import { destination, RULES } from '../data/cities';
import type { CityId, Destination, Lang, Text } from '../data/types';

/** What the vision model returns. See docs/answer-logic.md. */
export type Classification = {
  parts: { category: string; label?: string; confidence: number }[];
  alternatives?: string[];
};

export type AnsweredPart = {
  category: string;
  label: string;
  destination: Destination;
  steps: Text[];
};

export type Outcome =
  | { kind: 'answer'; parts: AnsweredPart[] }
  | { kind: 'confirm'; partIndex: number; best: string; alternatives: string[] }
  | { kind: 'question'; partIndex: number; category: string }
  | { kind: 'no_rule'; category: string; label: string }
  | { kind: 'unsure' };

export const HIGH = 0.8;
export const MEDIUM = 0.5;

const labelOf = (category: string, lang: Lang, label?: string) => label ?? CATEGORY[category]?.name[lang] ?? category;

/**
 * Turns a classification into what the app shows.
 * `answers` maps a part index to the category the user picked in a question or confirmation.
 */
export function decide(c: Classification, city: CityId, lang: Lang, answers: Record<number, string> = {}): Outcome {
  const parts = c.parts.filter((p) => CATEGORY[p.category]);
  if (parts.length === 0) return { kind: 'unsure' };

  const lowest = Math.min(...parts.map((p, i) => (answers[i] ? 1 : p.confidence)));
  if (lowest < MEDIUM) return { kind: 'unsure' };
  if (lowest < HIGH) {
    const i = parts.findIndex((p, j) => !answers[j] && p.confidence < HIGH);
    const alternatives = (c.alternatives ?? []).filter((a) => CATEGORY[a] && a !== parts[i].category).slice(0, 2);
    return { kind: 'confirm', partIndex: i, best: parts[i].category, alternatives };
  }

  const answered: AnsweredPart[] = [];
  for (const [i, p] of parts.entries()) {
    const category = answers[i] ?? p.category;
    const label = labelOf(p.category, lang, p.label);
    if (CATEGORY[category].question) return { kind: 'question', partIndex: i, category };
    const rule = RULES[city][category];
    if (!rule) return { kind: 'no_rule', category, label };
    answered.push({
      category,
      label,
      destination: destination(city, rule.destination),
      steps: [...CATEGORY[category].steps, ...rule.steps],
    });
  }
  return { kind: 'answer', parts: answered };
}
