import { Fragment, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Icon } from '@/components/ui';
import type { Lang } from '@/data/types';
import type { AnsweredPart } from '@/logic/decide';
import { SWATCH } from '@/theme';

type Props = {
  parts: AnsweredPart[];
  lang: Lang;
  city: string;
  title?: string;
  againLabel: string;
  backLabel: string;
  onBack: () => void;
  onAgain: () => void;
  feedback: (fg: string) => React.ReactNode;
};

/**
 * The result: the screen becomes the lid of the right bin.
 * One part floods the whole screen; several parts stack as bands, one lid per part.
 */
export function Flood({ parts, lang, city, title, againLabel, backLabel, onBack, onAgain, feedback }: Props) {
  const insets = useSafeAreaInsets();
  const reduced = useReducedMotion();
  const { height } = useWindowDimensions();
  // The lid opens once: the flood rises from the bottom. Reduce Motion gets a short fade instead.
  const rise = useSharedValue(reduced ? 0 : height);
  const fade = useSharedValue(reduced ? 0 : 1);
  useEffect(() => {
    rise.value = withTiming(0, { duration: 460, easing: Easing.out(Easing.exp) });
    fade.value = withTiming(1, { duration: 180 });
  }, [rise, fade]);
  const enter = useAnimatedStyle(() => ({ transform: [{ translateY: rise.value }], opacity: fade.value }));
  const first = SWATCH[parts[0].destination.swatch];
  const last = SWATCH[parts[parts.length - 1].destination.swatch];
  const single = parts.length === 1;

  return (
    <Animated.View style={[st.screen, { backgroundColor: last.flood }, enter]}>
      <View style={[st.lid, { backgroundColor: first.lid, paddingTop: insets.top }]}>
        <Pressable accessibilityRole="button" accessibilityLabel={backLabel} onPress={onBack} hitSlop={10} style={st.navButton}>
          <Icon name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }} color={first.on} />
        </Pressable>
        <Text numberOfLines={1} style={[st.navTitle, { color: first.on }]}>{title ?? ''}</Text>
        <Text style={[st.navCity, { color: first.on }]}>{city}</Text>
      </View>

      <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
        {parts.map((p, i) => {
          const sw = SWATCH[p.destination.swatch];
          const d = p.destination;
          return (
            <Fragment key={i}>
              {i > 0 && <View style={[st.seam, { backgroundColor: sw.lid }]} />}
              <View style={[st.band, single && st.bandSingle, { backgroundColor: sw.flood }]}>
                {i === 0 && <View style={[st.hinge, { backgroundColor: sw.lid }]} />}
                <Text style={[st.item, { color: sw.on }]}>{p.label}</Text>
                <Text
                  accessibilityRole="header"
                  android_hyphenationFrequency="full"
                  style={[single ? st.german : st.germanSmall, { color: sw.on }]}>
                  {d.german}
                </Text>
                <Text style={[st.translation, { color: sw.on }]}>
                  {d.alias ? `${d.alias} · ` : ''}
                  {d.translation[lang]}
                </Text>
                {single && d.takes && <Text style={[st.takes, { color: sw.on }]}>{d.takes[lang]}</Text>}
                {p.steps.length > 0 &&
                  (single ? (
                    <View style={st.sheet}>
                      {p.steps.map((s, j) => (
                        <View key={j} style={[st.step, j > 0 && st.stepRule]}>
                          <Text style={st.stepNum}>{j + 1}</Text>
                          <Text style={st.stepText}>{s[lang]}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View style={{ marginTop: 10, gap: 4 }}>
                      {p.steps.map((s, j) => (
                        <Text key={j} style={[st.inlineStep, { color: sw.on }]}>{s[lang]}</Text>
                      ))}
                    </View>
                  ))}
              </View>
            </Fragment>
          );
        })}
        <View style={[st.footer, { paddingBottom: insets.bottom + 16 }]}>
          {feedback(last.on)}
          <Button label={againLabel} onPress={onAgain} on={{ bg: last.on, fg: last.flood }} />
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1 },
  lid: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, minHeight: 56, gap: 4 },
  navButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  navTitle: { flex: 1, fontSize: 17, fontWeight: '600', textAlign: 'center' },
  navCity: { fontSize: 15, fontWeight: '600', minWidth: 44, textAlign: 'right', paddingRight: 12 },
  hinge: { position: 'absolute', top: 0, alignSelf: 'center', width: 76, height: 10, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },
  band: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 24 },
  bandSingle: { paddingTop: 40 },
  seam: { height: 10 },
  item: { fontSize: 17, fontWeight: '600', opacity: 0.85 },
  german: { fontSize: 52, lineHeight: 56, fontWeight: '800', letterSpacing: -1, marginTop: 8 },
  germanSmall: { fontSize: 36, lineHeight: 40, fontWeight: '800', letterSpacing: -0.6, marginTop: 4 },
  translation: { fontSize: 20, lineHeight: 26, fontWeight: '600', marginTop: 8 },
  takes: { fontSize: 17, lineHeight: 24, marginTop: 10, opacity: 0.9 },
  sheet: { marginTop: 24, backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16 },
  step: { flexDirection: 'row', gap: 12, paddingVertical: 14 },
  stepRule: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#D6D6D6' },
  stepNum: { fontSize: 17, fontWeight: '700', color: '#111111', minWidth: 14 },
  stepText: { flex: 1, fontSize: 17, lineHeight: 24, color: '#111111' },
  inlineStep: { fontSize: 17, lineHeight: 24 },
  footer: { marginTop: 'auto', paddingHorizontal: 24, paddingTop: 16, gap: 16 },
});
