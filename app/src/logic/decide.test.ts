// Run: npx tsx src/logic/decide.test.ts
import assert from 'node:assert/strict';

import { CATEGORY } from '../data/categories';
import { DESTINATIONS, RULES } from '../data/cities';
import { decide } from './decide';

const one = (category: string, confidence = 0.95) => ({ parts: [{ category, confidence }] });

// High confidence → answer with the city's destination.
let o = decide(one('envase_plastico'), 'koeln', 'es');
assert.equal(o.kind, 'answer');
assert.equal(o.kind === 'answer' && o.parts[0].destination.key, 'wertstoff');

// Same item, different cities: kitchen paper is Bio in Köln, Restmüll in Düsseldorf.
o = decide(one('papel_sucio'), 'koeln', 'es');
assert.equal(o.kind === 'answer' && o.parts[0].destination.key, 'bio');
o = decide(one('papel_sucio'), 'duesseldorf', 'es');
assert.equal(o.kind === 'answer' && o.parts[0].destination.key, 'rest');

// Unverified rule → no_rule, never a national guess.
assert.equal(decide(one('aceite_cocina'), 'berlin', 'es').kind, 'no_rule');

// Thresholds.
assert.equal(decide(one('envase_plastico', 0.6), 'koeln', 'es').kind, 'confirm');
assert.equal(decide(one('envase_plastico', 0.3), 'koeln', 'es').kind, 'unsure');
assert.equal(decide({ parts: [{ category: 'not_a_category', confidence: 0.99 }] }, 'koeln', 'es').kind, 'unsure');

// Confirming a medium guess answers it.
o = decide(one('envase_plastico', 0.6), 'koeln', 'es', { 0: 'envase_plastico' });
assert.equal(o.kind, 'answer');

// Chained questions: glass bottle → no Pfand → colour → container.
o = decide(one('botella_vidrio_bebida'), 'berlin', 'es');
assert.equal(o.kind === 'question' && o.category, 'botella_vidrio_bebida');
o = decide(one('botella_vidrio_bebida'), 'berlin', 'es', { 0: 'vidrio_envase' });
assert.equal(o.kind === 'question' && o.category, 'vidrio_envase');
o = decide(one('botella_vidrio_bebida'), 'berlin', 'es', { 0: 'vidrio_verde' });
assert.equal(o.kind === 'answer' && o.parts[0].destination.key, 'glas_gruen');

// Parts: yogurt cup + foil lid → two answered parts.
o = decide({ parts: [{ category: 'envase_plastico', confidence: 0.9, label: 'Vaso' }, { category: 'envase_metal', confidence: 0.9, label: 'Tapa' }] }, 'koeln', 'es');
assert.equal(o.kind === 'answer' && o.parts.length, 2);

// Data integrity: every rule points at a real category and destination; question options exist.
for (const [city, rules] of Object.entries(RULES)) {
  for (const [cat, rule] of Object.entries(rules)) {
    assert.ok(CATEGORY[cat], `${city}: unknown category ${cat}`);
    assert.ok(DESTINATIONS[city as keyof typeof DESTINATIONS].some((d) => d.key === rule.destination), `${city}: unknown destination ${rule.destination}`);
  }
}
for (const c of Object.values(CATEGORY)) for (const opt of c.question?.options ?? []) assert.ok(CATEGORY[opt.category], `${c.key}: option ${opt.category}`);

console.log('decide: ok');
