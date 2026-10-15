import Fastify from 'fastify';
import { z } from 'zod';

import { CATEGORIES } from '../../app/src/data/categories';
import { CITIES } from '../../app/src/data/cities';
import { MEDIA_TYPES, type Classifier } from './classify';
import type { Db } from './db';

const KEYS = CATEGORIES.map((c) => c.key) as [string, ...string[]];
const CITY_IDS = CITIES.map((c) => c.id) as [string, ...string[]];

// Claude accepts images up to 5 MB; base64 adds about a third.
const MAX_IMAGE_B64 = 5 * 1024 * 1024 * 1.34;

const ClassifyBody = z.object({
  image: z.string().min(1).max(MAX_IMAGE_B64),
  mediaType: z.enum(MEDIA_TYPES),
  lang: z.enum(['es', 'en', 'de']),
});

const FeedbackBody = z.object({
  city: z.enum(CITY_IDS),
  predicted: z.enum(KEYS),
  confidence: z.number().min(0).max(1).optional(),
  verdict: z.enum(['yes', 'no', 'other']),
  corrected: z.enum(KEYS).optional(),
});

export function buildApp({ classify, db }: { classify: Classifier; db: Db }) {
  const app = Fastify({ logger: process.env.NODE_ENV !== 'test', bodyLimit: 8 * 1024 * 1024 });

  app.get('/health', async () => ({ ok: true }));

  app.post('/classify', async (req, reply) => {
    const body = ClassifyBody.safeParse(req.body);
    if (!body.success) return reply.code(400).send({ error: 'invalid_request', issues: body.error.issues });
    const { image, mediaType, lang } = body.data;
    try {
      return await classify(image, mediaType, lang);
    } catch (err) {
      req.log.error(err);
      return reply.code(502).send({ error: 'classifier_failed' });
    }
  });

  app.post('/feedback', async (req, reply) => {
    const body = FeedbackBody.safeParse(req.body);
    if (!body.success) return reply.code(400).send({ error: 'invalid_request', issues: body.error.issues });
    await db.saveFeedback(body.data);
    return reply.code(204).send();
  });

  return app;
}
