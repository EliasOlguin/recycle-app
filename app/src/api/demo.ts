// Canned classifications that exercise every result state. Used by the backend's test mode
// (no API key) and by the app's dev-only /result?demo=<key> route. Relative imports only:
// the server imports this file too.
import type { Classification } from '../logic/decide';

export const DEMO: Record<string, Classification> = {
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
