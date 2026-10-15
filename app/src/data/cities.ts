import type { City, CityId, Destination, Rule, Text } from './types';

const t = (es: string, en: string, de: string): Text => ({ es, en, de });

export const CITIES: City[] = [
  { id: 'koeln', name: 'Köln', guideUrl: 'https://www.awbkoeln.de/muellabc/' },
  { id: 'duesseldorf', name: 'Düsseldorf', guideUrl: 'https://www.awista-kommunal.de/abfall-abc' },
  { id: 'berlin', name: 'Berlin', guideUrl: 'https://www.bsr.de/abfall-abc' },
];
export const CITY = Object.fromEntries(CITIES.map((c) => [c.id, c])) as Record<CityId, City>;

// Destinations shared by name across the three launch cities. Each city lists the ones it uses.
const D = {
  wertstoff: { key: 'wertstoff', type: 'bin', german: 'Wertstoff­tonne', alias: 'Gelbe Tonne', swatch: 'wertstoff',
    translation: t('tacho amarillo', 'yellow bin', 'gelbe Tonne'),
    takes: t('Envases y objetos de plástico, metal y tetra brik.', 'Packaging and objects made of plastic, metal and drink cartons.', 'Verpackungen und Gegenstände aus Kunststoff, Metall, Verbund.') },
  papier: { key: 'papier', type: 'bin', german: 'Papier­tonne', alias: 'Blaue Tonne', swatch: 'papier',
    translation: t('tacho azul', 'blue bin', 'blaue Tonne'),
    takes: t('Papel y cartón limpios.', 'Clean paper and cardboard.', 'Sauberes Papier und Pappe.') },
  bio: { key: 'bio', type: 'bin', german: 'Bio­tonne', alias: 'Braune Tonne', swatch: 'bio',
    translation: t('tacho marrón', 'brown bin', 'braune Tonne'),
    takes: t('Restos de comida y de jardín. Sin plástico.', 'Food and garden scraps. No plastic.', 'Küchen- und Gartenabfälle. Kein Plastik.') },
  rest: { key: 'rest', type: 'bin', german: 'Rest­müll', alias: 'Graue Tonne', swatch: 'rest',
    translation: t('tacho gris', 'grey bin', 'graue Tonne'),
    takes: t('Lo que no se recicla ni es peligroso.', 'What is neither recyclable nor hazardous.', 'Was nicht verwertbar und nicht schädlich ist.') },
  glas_weiss: { key: 'glas_weiss', type: 'public_container', german: 'Weiß­glas', swatch: 'glass_white',
    translation: t('contenedor de vidrio blanco', 'clear glass container', 'Container für Weißglas'),
    takes: t('Envases de vidrio transparente.', 'Clear glass packaging.', 'Verpackungen aus farblosem Glas.') },
  glas_gruen: { key: 'glas_gruen', type: 'public_container', german: 'Grün­glas', swatch: 'glass_green',
    translation: t('contenedor de vidrio verde', 'green glass container', 'Container für Grünglas'),
    takes: t('Vidrio verde, azul y de otros colores.', 'Green, blue and other coloured glass.', 'Grünes, blaues und andersfarbiges Glas.') },
  glas_braun: { key: 'glas_braun', type: 'public_container', german: 'Braun­glas', swatch: 'glass_brown',
    translation: t('contenedor de vidrio marrón', 'brown glass container', 'Container für Braunglas'),
    takes: t('Envases de vidrio marrón.', 'Brown glass packaging.', 'Verpackungen aus Braunglas.') },
  altkleider: { key: 'altkleider', type: 'public_container', german: 'Alt­kleider­container', swatch: 'outside',
    translation: t('contenedor de ropa', 'clothing container', 'Altkleidercontainer') },
  pfand: { key: 'pfand', type: 'store_return', german: 'Pfand­rückgabe', swatch: 'outside',
    translation: t('devolver en la tienda', 'return to the shop', 'im Geschäft zurückgeben') },
  handel: { key: 'handel', type: 'store_return', german: 'Rückgabe im Handel', swatch: 'outside',
    translation: t('devolver en la tienda', 'return to the shop', 'im Geschäft zurückgeben') },
  sperrmuell: { key: 'sperrmuell', type: 'bulky_pickup', german: 'Sperr­müll', swatch: 'outside',
    translation: t('residuos voluminosos', 'bulky waste', 'Sperrmüll') },
} satisfies Record<string, Destination>;

const city = (extra: Destination[]) => [...Object.values(D), ...extra] as Destination[];

export const DESTINATIONS: Record<CityId, Destination[]> = {
  koeln: city([
    { key: 'center', type: 'recycling_center', german: 'Wertstoff-Center', swatch: 'outside', translation: t('centro de reciclaje', 'recycling centre', 'Wertstoff-Center') },
    { key: 'schadstoff', type: 'hazardous', german: 'Schadstoff­mobil', swatch: 'outside', translation: t('camión de residuos peligrosos', 'hazardous waste truck', 'Schadstoffmobil') },
  ]),
  duesseldorf: city([
    { key: 'center', type: 'recycling_center', german: 'Recycling­hof', swatch: 'outside', translation: t('centro de reciclaje', 'recycling centre', 'Recyclinghof') },
  ]),
  berlin: city([
    { key: 'center', type: 'recycling_center', german: 'Recycling­hof', swatch: 'outside', translation: t('centro de reciclaje', 'recycling centre', 'Recyclinghof') },
  ]),
};

const r = (destination: string, ...steps: Text[]): Rule => ({ destination, steps });

const GLASS = { vidrio_blanco: r('glas_weiss'), vidrio_verde: r('glas_gruen'), vidrio_marron: r('glas_braun') };
const PACKAGING = { envase_plastico: r('wertstoff'), envase_metal: r('wertstoff'), envase_compuesto: r('wertstoff'), pfand: r('pfand') };
const OBJECTS = { plastico_no_envase: r('wertstoff'), metal_no_envase: r('wertstoff') };

/**
 * Only rules marked ✅ in docs/city-rules.md. A category with no rule here shows
 * "no rule yet for your city" instead of a national guess.
 * Rule steps are added after the category's default steps.
 */
export const RULES: Record<CityId, Record<string, Rule>> = {
  koeln: {
    ...PACKAGING, ...GLASS, ...OBJECTS,
    vidrio_blanco: r('glas_weiss', t('De lunes a viernes, de 7 a 20.', 'Monday to Friday, 7:00–20:00.', 'Montag bis Freitag, 7 bis 20 Uhr.')),
    vidrio_verde: r('glas_gruen', t('De lunes a viernes, de 7 a 20.', 'Monday to Friday, 7:00–20:00.', 'Montag bis Freitag, 7 bis 20 Uhr.')),
    vidrio_marron: r('glas_braun', t('De lunes a viernes, de 7 a 20.', 'Monday to Friday, 7:00–20:00.', 'Montag bis Freitag, 7 bis 20 Uhr.')),
    papel_carton: r('papier'),
    papel_sucio: r('bio'),
    vidrio_no_envase: r('rest'),
    ceramica_porcelana: r('rest'),
    organico_crudo: r('bio'),
    organico_cocido: r('bio'),
    jardin: r('bio', t('Para mucha poda, pedí un retiro a la AWB.', 'For lots of cuttings, book a pickup with AWB.', 'Bei viel Grünschnitt: Abholung bei der AWB anmelden.')),
    resto_general: r('rest'),
    pila_bateria: r('handel', t('También en el Bürgeramt o el Wertstoff-Center.', 'Also at the Bürgeramt or the Wertstoff-Center.', 'Auch im Bürgeramt oder Wertstoff-Center.')),
    electronico_chico: r('center'),
    electronico_grande: r('sperrmuell', t('Pedí turno de retiro de aparatos con el servicio de Sperrmüll.', 'Book an appliance pickup through the Sperrmüll service.', 'Altgeräte-Abholung beim Sperrmüll-Service anmelden.'), t('O llevalo al Wertstoff-Center.', 'Or take it to the Wertstoff-Center.', 'Oder zum Wertstoff-Center bringen.')),
    bombilla_especial: r('schadstoff', t('También en el Bürgeramt o en tiendas.', 'Also at the Bürgeramt or in shops.', 'Auch im Bürgeramt oder im Handel.')),
    bombilla_incandescente: r('rest'),
    quimico: r('schadstoff'),
    medicamento: r('rest', t('Solo cantidades chicas.', 'Small amounts only.', 'Nur kleine Mengen.')),
    ropa_reusable: r('altkleider'),
    voluminoso: r('sperrmuell', t('Retiro gratis hasta 3 m³ con turno (unas 3 semanas).', 'Free pickup up to 3 m³ by appointment (about 3 weeks).', 'Kostenlose Abholung bis 3 m³ mit Termin (ca. 3 Wochen).'), t('O llevalo gratis al Wertstoff-Center.', 'Or take it to the Wertstoff-Center for free.', 'Oder kostenlos zum Wertstoff-Center bringen.')),
    madera: r('center', t('Pedazos chicos pueden ir a Restmüll.', 'Small pieces can go in Restmüll.', 'Kleine Stücke dürfen in den Restmüll.')),
  },
  duesseldorf: {
    ...PACKAGING, ...GLASS, ...OBJECTS,
    papel_carton: r('papier'),
    papel_sucio: r('rest'),
    papel_especial: r('rest'),
    ceramica_porcelana: r('rest', t('Solo cantidades chicas.', 'Small amounts only.', 'Nur kleine Mengen.')),
    organico_crudo: r('bio'),
    jardin: r('bio'),
    resto_general: r('rest'),
    electronico_grande: r('center', t('O retiro de Sperrmüll con aviso, o en la tienda al comprar uno nuevo.', 'Or a Sperrmüll pickup, or at the shop when buying a new one.', 'Oder Sperrmüll-Abholung, oder beim Neukauf im Handel.')),
    aceite_cocina: r('rest', t('Solo poco y bien cerrado. Mucho: Recyclinghof en envase de plástico.', 'Small amounts only, well closed. Large amounts: Recyclinghof in a plastic container.', 'Nur kleine Mengen, verschlossen. Größere: Recyclinghof im Kunststoffbehälter.')),
    medicamento: r('rest', t('O en la recolección de residuos peligrosos.', 'Or at the hazardous waste collection.', 'Oder bei der Schadstoffsammlung.')),
    ropa_reusable: r('altkleider'),
    ropa_mala: r('rest'),
    voluminoso: r('sperrmuell', t('Pedí el retiro con aviso o llevalo al Recyclinghof.', 'Book a pickup or take it to the Recyclinghof.', 'Abholung anmelden oder zum Recyclinghof bringen.')),
    madera: r('center'),
  },
  berlin: {
    ...PACKAGING, ...GLASS, ...OBJECTS,
    papel_carton: r('papier'),
    papel_sucio: r('bio'),
    papel_especial: r('rest'),
    ceramica_porcelana: r('rest'),
    organico_crudo: r('bio'),
    organico_cocido: r('bio', t('Envolvela en papel de diario.', 'Wrap it in newspaper.', 'In Zeitungspapier einwickeln.')),
    jardin: r('bio'),
    resto_general: r('rest'),
    electronico_chico: r('center', t('O en tiendas grandes que venden electrónica.', 'Or at large shops that sell electronics.', 'Oder im größeren Elektrohandel.')),
    electronico_grande: r('center', t('Gratis. También con el retiro de Sperrmüll.', 'Free. Also with a Sperrmüll pickup.', 'Kostenlos. Auch mit der Sperrmüllabholung.')),
    bombilla_especial: r('center'),
    bombilla_incandescente: r('rest'),
    quimico: r('center', t('En la recepción de residuos peligrosos del Recyclinghof.', 'At the Recyclinghof hazardous waste desk.', 'An der Schadstoffannahme des Recyclinghofs.')),
    medicamento: r('rest', t('Mejor: farmacia o recepción de residuos peligrosos.', 'Better: a pharmacy or the hazardous waste desk.', 'Besser: Apotheke oder Schadstoffannahme.')),
    ropa_reusable: r('altkleider'),
    ropa_mala: r('rest'),
    voluminoso: r('center', t('Gratis hasta 3 m³. También podés pedir un retiro.', 'Free up to 3 m³. You can also book a pickup.', 'Bis 3 m³ kostenlos. Abholung ist auch möglich.')),
  },
};

export function destination(cityId: CityId, key: string): Destination {
  const d = DESTINATIONS[cityId].find((x) => x.key === key);
  if (!d) throw new Error(`Unknown destination ${key} in ${cityId}`);
  return d;
}
