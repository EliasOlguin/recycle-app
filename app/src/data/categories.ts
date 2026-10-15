import type { Category, Text } from './types';

/** Category with default steps and search words. Rules may override the steps per city. */
export type CategoryDef = Category & { steps: Text[]; words: string[] };

const t = (es: string, en: string, de: string): Text => ({ es, en, de });

const EMPTY = t('Vaciala. No hace falta lavarla.', 'Empty it. No need to rinse.', 'Leeren. Ausspülen ist nicht nötig.');

export const CATEGORIES: CategoryDef[] = [
  // Envases
  { key: 'envase_plastico', name: t('Envase de plástico', 'Plastic packaging', 'Kunststoffverpackung'), steps: [EMPTY],
    words: ['vaso de yogur', 'botella de champú', 'film', 'bolsa de plástico', 'bandeja', 'yogurt cup', 'shampoo bottle', 'plastic bag', 'cling film', 'tray', 'Joghurtbecher', 'Shampooflasche', 'Plastiktüte', 'Folie', 'Schale'] },
  { key: 'envase_metal', name: t('Envase de metal', 'Metal packaging', 'Metallverpackung'), steps: [EMPTY],
    words: ['lata de conserva', 'papel aluminio', 'tapa de aluminio', 'tin can', 'aluminium foil', 'foil lid', 'Konservendose', 'Alufolie', 'Aludeckel'] },
  { key: 'envase_compuesto', name: t('Tetra brik', 'Drink carton', 'Getränkekarton'), steps: [EMPTY, t('No va con el papel.', 'It does not go with paper.', 'Gehört nicht ins Altpapier.')],
    words: ['tetra brik', 'cartón de leche', 'cartón de jugo', 'milk carton', 'juice carton', 'Milchkarton', 'Saftkarton', 'Tetrapak'] },
  { key: 'botella_bebida_plastico', name: t('Botella de bebida', 'Drink bottle', 'Getränkeflasche'), steps: [],
    words: ['botella de agua', 'botella de gaseosa', 'water bottle', 'soda bottle', 'PET-Flasche', 'Wasserflasche'],
    question: { text: t('¿Tiene el logo de Pfand?', 'Does it have the Pfand logo?', 'Hat sie das Pfandlogo?'), options: [
      { label: t('Sí, tiene Pfand', 'Yes, it has Pfand', 'Ja, mit Pfand'), category: 'pfand' },
      { label: t('No', 'No', 'Nein'), category: 'envase_plastico' } ] } },
  { key: 'lata_bebida', name: t('Lata de bebida', 'Drink can', 'Getränkedose'), steps: [],
    words: ['lata de cerveza', 'lata de gaseosa', 'beer can', 'soda can', 'Bierdose', 'Getränkedose'],
    question: { text: t('¿Tiene el logo de Pfand?', 'Does it have the Pfand logo?', 'Hat sie das Pfandlogo?'), options: [
      { label: t('Sí, tiene Pfand', 'Yes, it has Pfand', 'Ja, mit Pfand'), category: 'pfand' },
      { label: t('No', 'No', 'Nein'), category: 'envase_metal' } ] } },
  { key: 'pfand', name: t('Envase con Pfand', 'Pfand container', 'Pfandflasche'),
    steps: [t('Devolvelo en cualquier súper que venda ese tipo de envase.', 'Return it at any shop that sells that kind of container.', 'In jedem Geschäft zurückgeben, das solche Verpackungen verkauft.'), t('Te devuelven el depósito.', 'You get the deposit back.', 'Du bekommst das Pfand zurück.')],
    words: ['pfand', 'envase retornable', 'deposit bottle', 'Pfandflasche', 'Mehrweg'] },

  // Papel
  { key: 'papel_carton', name: t('Papel y cartón', 'Paper and cardboard', 'Papier und Pappe'), steps: [t('Desarmá las cajas grandes.', 'Flatten big boxes.', 'Große Kartons zerkleinern.')],
    words: ['diario', 'revista', 'caja de cartón', 'sobre', 'newspaper', 'magazine', 'cardboard box', 'envelope', 'Zeitung', 'Zeitschrift', 'Karton', 'Briefumschlag'] },
  { key: 'caja_pizza', name: t('Caja de pizza', 'Pizza box', 'Pizzakarton'), steps: [],
    words: ['caja de pizza', 'pizza box', 'Pizzakarton'],
    question: { text: t('¿Está muy sucia de grasa o con restos?', 'Is it very greasy or has food on it?', 'Ist er stark fettig oder mit Essensresten?'), options: [
      { label: t('Sí, está sucia', 'Yes, it is dirty', 'Ja, verschmutzt'), category: 'resto_general' },
      { label: t('No, está limpia', 'No, it is clean', 'Nein, sauber'), category: 'papel_carton' } ] } },
  { key: 'papel_sucio', name: t('Papel de cocina usado', 'Used kitchen paper', 'Benutztes Küchenpapier'), steps: [],
    words: ['servilleta', 'papel de cocina', 'pañuelo de papel', 'napkin', 'kitchen paper', 'tissue', 'Serviette', 'Küchenpapier', 'Taschentuch'] },
  { key: 'papel_especial', name: t('Papel recubierto', 'Coated paper', 'Beschichtetes Papier'), steps: [],
    words: ['papel encerado', 'foto', 'papel de horno', 'wax paper', 'photo', 'baking paper', 'Backpapier', 'Foto', 'Wachspapier'] },

  // Vidrio
  { key: 'botella_vidrio_bebida', name: t('Botella de vidrio', 'Glass bottle', 'Glasflasche'), steps: [],
    words: ['botella de vino', 'botella de cerveza', 'wine bottle', 'beer bottle', 'Weinflasche', 'Bierflasche'],
    question: { text: t('¿Tiene Pfand?', 'Does it have Pfand?', 'Hat sie Pfand?'), options: [
      { label: t('Sí, tiene Pfand', 'Yes, it has Pfand', 'Ja, mit Pfand'), category: 'pfand' },
      { label: t('No', 'No', 'Nein'), category: 'vidrio_envase' } ] } },
  { key: 'vidrio_envase', name: t('Frasco o botella de vidrio', 'Glass jar or bottle', 'Glas oder Flasche'), steps: [],
    words: ['frasco', 'frasco de mermelada', 'jar', 'jam jar', 'Marmeladenglas', 'Einmachglas'],
    question: { text: t('¿De qué color es el vidrio?', 'What colour is the glass?', 'Welche Farbe hat das Glas?'), options: [
      { label: t('Transparente', 'Clear', 'Weiß / farblos'), category: 'vidrio_blanco' },
      { label: t('Verde, azul u otro color', 'Green, blue or other', 'Grün, blau oder andere'), category: 'vidrio_verde' },
      { label: t('Marrón', 'Brown', 'Braun'), category: 'vidrio_marron' } ] } },
  ...(['blanco', 'verde', 'marron'] as const).map((c) => ({
    key: `vidrio_${c}`,
    name: t('Envase de vidrio', 'Glass container', 'Glasverpackung'),
    steps: [t('Vacialo.', 'Empty it.', 'Leeren.')],
    words: [],
  })),
  { key: 'vidrio_no_envase', name: t('Vidrio que no es envase', 'Non-packaging glass', 'Glas, keine Verpackung'), steps: [t('No va al contenedor de vidrio.', 'It does not go in the glass container.', 'Gehört nicht in den Glascontainer.')],
    words: ['vaso', 'espejo', 'ventana', 'pyrex', 'drinking glass', 'mirror', 'window glass', 'Trinkglas', 'Spiegel', 'Fensterglas'] },
  { key: 'ceramica_porcelana', name: t('Cerámica o porcelana', 'Ceramics or porcelain', 'Keramik oder Porzellan'), steps: [],
    words: ['taza', 'plato', 'maceta de barro', 'mug', 'plate', 'clay pot', 'Tasse', 'Teller', 'Porzellan'] },

  // Orgánico
  { key: 'organico_crudo', name: t('Restos de fruta y verdura', 'Fruit and veg scraps', 'Obst- und Gemüsereste'), steps: [t('Sin bolsa de plástico, ni siquiera compostable.', 'No plastic bags, not even compostable ones.', 'Ohne Plastiktüte, auch keine kompostierbare.')],
    words: ['cáscara', 'cáscara de banana', 'borra de café', 'saquito de té', 'peel', 'banana peel', 'coffee grounds', 'tea bag', 'Schale', 'Bananenschale', 'Kaffeesatz', 'Teebeutel'] },
  { key: 'organico_cocido', name: t('Sobras de comida', 'Food leftovers', 'Speisereste'), steps: [t('Sin bolsa de plástico.', 'No plastic bags.', 'Ohne Plastiktüte.')],
    words: ['sobras', 'comida', 'carne', 'pescado', 'pan', 'leftovers', 'meat', 'fish', 'bread', 'Essensreste', 'Fleisch', 'Brot'] },
  { key: 'jardin', name: t('Restos de jardín', 'Garden waste', 'Gartenabfälle'), steps: [],
    words: ['pasto', 'hojas', 'ramas', 'flores', 'grass', 'leaves', 'branches', 'flowers', 'Rasenschnitt', 'Laub', 'Äste', 'Blumen'] },

  // Restmüll
  { key: 'resto_general', name: t('Residuo común', 'General waste', 'Restmüll'), steps: [],
    words: ['pañal', 'cepillo de dientes', 'bolsa de aspiradora', 'colilla', 'arena de gato', 'diaper', 'toothbrush', 'vacuum bag', 'cigarette', 'cat litter', 'Windel', 'Zahnbürste', 'Staubsaugerbeutel', 'Zigarette', 'Katzenstreu'] },
  { key: 'plastico_no_envase', name: t('Objeto de plástico', 'Plastic object', 'Kunststoffgegenstand'), steps: [t('Si es muy grande, va a voluminosos.', 'If it is very large, it is bulky waste.', 'Wenn es sehr groß ist: Sperrmüll.')],
    words: ['juguete', 'balde', 'percha', 'tupper', 'toy', 'bucket', 'hanger', 'plastic box', 'Spielzeug', 'Eimer', 'Kleiderbügel', 'Plastikdose'] },
  { key: 'metal_no_envase', name: t('Objeto de metal', 'Metal object', 'Metallgegenstand'), steps: [],
    words: ['sartén', 'olla', 'cubiertos', 'pan', 'pot', 'cutlery', 'Pfanne', 'Topf', 'Besteck'] },

  // Especiales
  { key: 'pila_bateria', name: t('Pilas y baterías', 'Batteries', 'Batterien'), steps: [t('Nunca a la basura común.', 'Never in general waste.', 'Nie in den Hausmüll.')],
    words: ['pila', 'batería', 'power bank', 'battery', 'Batterie', 'Akku'] },
  { key: 'electronico_chico', name: t('Aparato electrónico chico', 'Small electronics', 'Elektrokleingerät'), steps: [t('Sacale las pilas si se puede.', 'Remove batteries if you can.', 'Batterien möglichst entnehmen.')],
    words: ['celular', 'cable', 'secador', 'auriculares', 'phone', 'charger', 'hair dryer', 'headphones', 'Handy', 'Kabel', 'Föhn', 'Kopfhörer'] },
  { key: 'electronico_grande', name: t('Electrodoméstico grande', 'Large appliance', 'Elektrogroßgerät'), steps: [],
    words: ['heladera', 'lavarropas', 'televisor', 'fridge', 'washing machine', 'TV', 'Kühlschrank', 'Waschmaschine', 'Fernseher'] },
  { key: 'bombilla', name: t('Lámpara', 'Light bulb', 'Glühbirne / Lampe'), steps: [],
    words: ['lámpara', 'foco', 'bombilla', 'light bulb', 'Glühbirne', 'Leuchtmittel'],
    question: { text: t('¿Es LED o de bajo consumo?', 'Is it LED or energy-saving?', 'Ist es eine LED- oder Energiesparlampe?'), options: [
      { label: t('Sí, LED o bajo consumo', 'Yes, LED or energy-saving', 'Ja, LED oder Energiesparlampe'), category: 'bombilla_especial' },
      { label: t('No, incandescente o halógena', 'No, incandescent or halogen', 'Nein, Glüh- oder Halogenlampe'), category: 'bombilla_incandescente' } ] } },
  { key: 'bombilla_especial', name: t('Lámpara LED o de bajo consumo', 'LED or energy-saving bulb', 'LED- oder Energiesparlampe'), steps: [t('Entera, sin romper.', 'Whole, unbroken.', 'Unzerbrochen abgeben.')], words: ['LED', 'Energiesparlampe'] },
  { key: 'bombilla_incandescente', name: t('Lámpara incandescente', 'Incandescent bulb', 'Glühbirne'), steps: [], words: ['halógena', 'halogen', 'Halogenlampe'] },
  { key: 'quimico', name: t('Químicos y pintura', 'Chemicals and paint', 'Chemikalien und Farben'), steps: [t('En su envase original, cerrado.', 'In the original container, closed.', 'In der Originalverpackung, verschlossen.')],
    words: ['pintura', 'solvente', 'aerosol', 'veneno', 'paint', 'solvent', 'spray can', 'poison', 'Farbe', 'Lack', 'Lösungsmittel', 'Spraydose'] },
  { key: 'aceite_cocina', name: t('Aceite de cocina', 'Cooking oil', 'Speiseöl'), steps: [t('Nunca por la pileta ni el inodoro.', 'Never down the sink or toilet.', 'Nie in Spüle oder Toilette.')],
    words: ['aceite', 'aceite de freír', 'grasa', 'cooking oil', 'frying oil', 'fat', 'Speiseöl', 'Frittierfett'] },
  { key: 'medicamento', name: t('Medicamentos', 'Medicines', 'Medikamente'), steps: [t('Nunca por la pileta ni el inodoro.', 'Never down the sink or toilet.', 'Nie in Spüle oder Toilette.')],
    words: ['pastillas', 'remedio', 'jarabe', 'pills', 'medicine', 'syrup', 'Tabletten', 'Medikamente', 'Saft'] },
  { key: 'cartucho_tinta', name: t('Cartucho de tinta', 'Ink cartridge', 'Druckerpatrone'), steps: [], words: ['cartucho', 'tóner', 'cartridge', 'toner', 'Druckerpatrone', 'Toner'] },
  { key: 'ropa_calzado', name: t('Ropa o calzado', 'Clothes or shoes', 'Kleidung oder Schuhe'), steps: [],
    words: ['ropa', 'zapatos', 'sábanas', 'remera', 'clothes', 'shoes', 'sheets', 't-shirt', 'Kleidung', 'Schuhe', 'Bettwäsche'],
    question: { text: t('¿Se puede seguir usando?', 'Can it still be worn?', 'Ist es noch tragbar?'), options: [
      { label: t('Sí, está en buen estado', 'Yes, in good shape', 'Ja, gut erhalten'), category: 'ropa_reusable' },
      { label: t('No, está rota o muy sucia', 'No, torn or very dirty', 'Nein, kaputt oder stark verschmutzt'), category: 'ropa_mala' } ] } },
  { key: 'ropa_reusable', name: t('Ropa en buen estado', 'Wearable clothes', 'Tragbare Kleidung'), steps: [t('En una bolsa cerrada.', 'In a closed bag.', 'In einem verschlossenen Sack.'), t('Zapatos atados de a pares.', 'Shoes tied in pairs.', 'Schuhe paarweise bündeln.')], words: [] },
  { key: 'ropa_mala', name: t('Ropa rota o muy sucia', 'Torn or very dirty clothes', 'Kaputte Kleidung'), steps: [], words: [] },
  { key: 'voluminoso', name: t('Mueble o voluminoso', 'Furniture or bulky item', 'Möbel / Sperrmüll'), steps: [],
    words: ['mueble', 'colchón', 'alfombra', 'silla', 'furniture', 'mattress', 'carpet', 'chair', 'Möbel', 'Matratze', 'Teppich', 'Stuhl'] },
  { key: 'madera', name: t('Madera', 'Wood', 'Holz'), steps: [], words: ['madera', 'tabla', 'pallet', 'wood', 'board', 'Holz', 'Brett', 'Palette'] },
];

export const CATEGORY = Object.fromEntries(CATEGORIES.map((c) => [c.key, c])) as Record<string, CategoryDef>;
