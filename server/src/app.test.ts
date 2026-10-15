import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildApp } from './app';
import { demoClassifier } from './classify';
import type { Db, Feedback } from './db';

process.env.NODE_ENV = 'test';

function setup() {
  const saved: Feedback[] = [];
  const db: Db = { saveFeedback: async (f) => void saved.push(f), close: async () => {} };
  return { app: buildApp({ db, classify: demoClassifier() }), saved };
}

test('classify returns demo results in test mode', async () => {
  const { app } = setup();
  const res = await app.inject({ method: 'POST', url: '/classify', payload: { image: 'aGVsbG8=', mediaType: 'image/jpeg', lang: 'es' } });
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().parts[0].category, 'envase_plastico');
});

test('classify rejects a bad media type', async () => {
  const { app } = setup();
  const res = await app.inject({ method: 'POST', url: '/classify', payload: { image: 'x', mediaType: 'image/gif', lang: 'es' } });
  assert.equal(res.statusCode, 400);
});

test('feedback is validated and stored', async () => {
  const { app, saved } = setup();
  const ok = await app.inject({ method: 'POST', url: '/feedback', payload: { city: 'koeln', predicted: 'papel_carton', verdict: 'other', corrected: 'caja_pizza' } });
  assert.equal(ok.statusCode, 204);
  assert.deepEqual(saved, [{ city: 'koeln', predicted: 'papel_carton', verdict: 'other', corrected: 'caja_pizza' }]);

  const bad = await app.inject({ method: 'POST', url: '/feedback', payload: { city: 'hamburg', predicted: 'papel_carton', verdict: 'yes' } });
  assert.equal(bad.statusCode, 400);
  assert.equal(saved.length, 1);
});
