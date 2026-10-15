import type { Swatch } from '@/data/types';

/** The shell is ink and white; colour belongs to destinations. */
export const Ink = '#111111';
export const Paper = '#FFFFFF';
export const Muted = '#5C5F63';
export const Rule = '#E3E3E3';
export const Danger = '#B3261E';

export const Dark = {
  ink: '#F2F2F2',
  paper: '#0B0B0C',
  muted: '#A4A7AB',
  rule: '#2A2B2E',
};

/** Lid colours. `lid` is the darker strip that caps the flood; `on` is text on the flood. */
export const SWATCH: Record<Swatch, { flood: string; lid: string; on: string }> = {
  wertstoff: { flood: '#F2C200', lid: '#D4A900', on: '#111111' },
  papier: { flood: '#1E5AA8', lid: '#174A8C', on: '#FFFFFF' },
  bio: { flood: '#7A4B2A', lid: '#633C21', on: '#FFFFFF' },
  rest: { flood: '#4A4F55', lid: '#3A3E43', on: '#FFFFFF' },
  glass_white: { flood: '#E4EAEC', lid: '#C9D3D7', on: '#111111' },
  glass_green: { flood: '#2E7D4F', lid: '#246640', on: '#FFFFFF' },
  glass_brown: { flood: '#8A5A2B', lid: '#714821', on: '#FFFFFF' },
  outside: { flood: '#25282C', lid: '#17191C', on: '#FFFFFF' },
};
