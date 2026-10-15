export type Lang = 'es' | 'en' | 'de';
export type Text = Record<Lang, string>;

export type CityId = 'koeln' | 'duesseldorf' | 'berlin';

export type City = {
  id: CityId;
  name: string;
  guideUrl: string;
};

export type DestinationType =
  | 'bin'
  | 'public_container'
  | 'store_return'
  | 'recycling_center'
  | 'hazardous'
  | 'bulky_pickup';

/** Colour family a destination floods the screen with. */
export type Swatch =
  | 'wertstoff'
  | 'papier'
  | 'bio'
  | 'rest'
  | 'glass_white'
  | 'glass_green'
  | 'glass_brown'
  | 'outside';

export type Destination = {
  key: string;
  type: DestinationType;
  /** German name as the city uses it. Soft hyphens (­) mark where it may break. */
  german: string;
  /** Other German name people say, e.g. "Gelbe Tonne". */
  alias?: string;
  /** Plain translation, e.g. "tacho amarillo". */
  translation: Text;
  /** One line of what goes in. */
  takes?: Text;
  swatch: Swatch;
};

export type QuestionOption = { label: Text; category: string };

export type Category = {
  key: string;
  /** Short name for the item kind, used when the classifier gives no label. */
  name: Text;
  question?: { text: Text; options: QuestionOption[] };
};

export type Rule = {
  destination: string;
  steps: Text[];
};
