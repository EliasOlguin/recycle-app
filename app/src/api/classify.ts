import type { Classification } from '@/logic/decide';

// shortcut: no backend yet, so this returns canned results in turn to exercise every state.
// Replace with a POST of the photo to the Node backend (see docs/answer-logic.md) once it exists.
const DEMO: Record<string, Classification> = {
  answer: { parts: [{ category: 'envase_plastico', label: 'Botella de champú', confidence: 0.94 }] },
  parts: { parts: [
    { category: 'papel_carton', label: 'Caja de galletitas', confidence: 0.91 },
    { category: 'envase_plastico', label: 'Ventanita de plástico', confidence: 0.88 },
  ] },
  confirm: { parts: [{ category: 'papel_carton', label: 'Caja', confidence: 0.64 }], alternatives: ['caja_pizza', 'envase_compuesto'] },
  question: { parts: [{ category: 'botella_bebida_plastico', label: 'Botella de agua', confidence: 0.9 }] },
  glass: { parts: [{ category: 'vidrio_envase', label: 'Frasco de mermelada', confidence: 0.92 }] },
  unsure: { parts: [{ category: 'resto_general', confidence: 0.2 }] },
  no_rule: { parts: [{ category: 'aceite_cocina', label: 'Aceite de cocina', confidence: 0.9 }] },
};
export const DEMO_KEYS = Object.keys(DEMO);

let turn = 0;

export async function classify(_photoUri: string): Promise<Classification> {
  await new Promise((r) => setTimeout(r, 900));
  return DEMO[DEMO_KEYS[turn++ % DEMO_KEYS.length]];
}

export const demoClassification = (key: string) => DEMO[key];
