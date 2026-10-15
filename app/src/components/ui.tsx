import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, useColorScheme, View, type TextProps, type ViewStyle } from 'react-native';

import type { Swatch } from '@/data/types';
import { Danger, Dark, Field, Ink, Muted, Paper, Rule, SWATCH } from '@/theme';

export function usePalette() {
  const dark = useColorScheme() === 'dark';
  return dark
    ? { ink: Dark.ink, paper: Dark.paper, muted: Dark.muted, rule: Dark.rule, danger: Dark.danger, field: Dark.field, dark }
    : { ink: Ink, paper: Paper, muted: Muted, rule: Rule, danger: Danger, field: Field, dark };
}

// Outline variants, matching the outline SF Symbols used on iOS.
const OUTLINE: Record<string, string> = { thumb_up: 'thumb-up-off-alt', thumb_down: 'thumb-down-off-alt' };

export function Icon({ name, size = 24, color }: { name: SymbolViewProps['name']; size?: number; color: string }) {
  // On Android, symbols are font glyphs that grow with the system font scale and get clipped;
  // the Material icon font can opt out of scaling, so icons keep their size like native ones.
  const android = typeof name === 'object' ? name.android : undefined;
  if (Platform.OS === 'android' && android) {
    const glyph = (OUTLINE[android] ?? android.replace(/_/g, '-')) as keyof typeof MaterialIcons.glyphMap;
    return <MaterialIcons name={glyph} size={size} color={color} allowFontScaling={false} />;
  }
  return <SymbolView name={name} size={size} tintColor={color} />;
}

/** Typography follows the system: sizes are the platform's text styles and scale with Dynamic Type / font scale. */
export function Title({ style, ...p }: TextProps) {
  const c = usePalette();
  return <Text accessibilityRole="header" style={[s.title, { color: c.ink }, style]} {...p} />;
}
export function Body({ muted, style, ...p }: TextProps & { muted?: boolean }) {
  const c = usePalette();
  return <Text style={[s.body, { color: muted ? c.muted : c.ink }, style]} {...p} />;
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  kind?: 'primary' | 'secondary' | 'destructive';
  /** Colours for buttons that sit on a flood. */
  on?: { fg: string; bg: string };
  icon?: SymbolViewProps['name'];
  leading?: ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
};

export function Button({ label, onPress, kind = 'primary', on, icon, leading, style, disabled }: ButtonProps) {
  const c = usePalette();
  const bg = on?.bg ?? (kind === 'primary' ? c.ink : 'transparent');
  const fg = on?.fg ?? (kind === 'primary' ? c.paper : kind === 'destructive' ? c.danger : c.ink);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        { backgroundColor: bg, borderColor: kind === 'secondary' && !on ? c.ink : bg, opacity: disabled ? 0.4 : pressed ? 0.75 : 1 },
        kind === 'destructive' && { paddingHorizontal: 0, alignSelf: 'flex-start' },
        style,
      ]}>
      {leading}
      {icon && <Icon name={icon} size={20} color={fg} />}
      <Text style={[s.buttonLabel, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

/** A lid-coloured square, the app's only colour outside a flood. Without a swatch: "depends", a dashed empty lid. */
export function Chip({ swatch, size = 28 }: { swatch?: Swatch; size?: number }) {
  const c = usePalette();
  if (!swatch)
    return <View style={{ width: size, height: size, borderRadius: size / 4, borderWidth: 1.5, borderStyle: 'dashed', borderColor: c.muted }} />;
  const sw = SWATCH[swatch];
  return <View style={{ width: size, height: size, borderRadius: size / 4, backgroundColor: sw.flood, borderTopWidth: size / 5, borderTopColor: sw.lid, borderWidth: StyleSheet.hairlineWidth, borderColor: sw.lid }} />;
}

export function Row({
  children,
  onPress,
  right,
  selected,
}: {
  children: ReactNode;
  onPress?: () => void;
  right?: ReactNode;
  /** Makes the row a radio option. */
  selected?: boolean;
}) {
  const c = usePalette();
  const radio = selected !== undefined;
  const body = (
    <View style={[s.row, { borderBottomColor: c.rule }]}>
      <View style={s.rowMain}>{children}</View>
      {right}
      {radio && selected && <Icon name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={20} color={c.ink} />}
      {onPress && !radio && (
        <Icon name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} size={16} color={c.muted} />
      )}
    </View>
  );
  return onPress ? (
    <Pressable
      accessibilityRole={radio ? 'radio' : 'button'}
      accessibilityState={radio ? { selected } : undefined}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
      {body}
    </Pressable>
  ) : (
    body
  );
}

export const s = StyleSheet.create({
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.4 },
  body: { fontSize: 17, lineHeight: 24 },
  button: {
    minHeight: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    paddingHorizontal: 22,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: { fontSize: 17, fontWeight: '600' },
  row: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth },
  rowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
});
