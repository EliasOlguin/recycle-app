import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CityList, LanguageList } from '@/components/pickers';
import { Body, Button, Chip, Row, Title, usePalette } from '@/components/ui';
import { CITY, DESTINATIONS } from '@/data/cities';
import { useStore } from '@/store';

export default function Onboarding() {
  const { t, city, lang, finishOnboarding } = useStore();
  const c = usePalette();
  const [step, setStep] = useState(0);
  const o = t.onboarding;

  const bins = city ? DESTINATIONS[city].filter((d) => d.type === 'bin') : [];

  return (
    <SafeAreaView style={[st.screen, { backgroundColor: c.paper }]}>
      <ScrollView contentContainerStyle={st.content}>
        {step === 0 && (
          <>
            <Title>{o.languageTitle}</Title>
            <LanguageList />
          </>
        )}
        {step === 1 && (
          <>
            <View style={{ gap: 6 }}>
              <Title>{o.cityTitle}</Title>
              <Body muted>{o.citySub}</Body>
            </View>
            <CityList onPick={() => setStep(2)} />
          </>
        )}
        {step === 2 && city && (
          <>
            <View style={{ gap: 6 }}>
              <Title>{o.startTitle}</Title>
              <Body muted>{o.startSub}</Body>
            </View>
            <View>
              <Body style={st.caption}>{CITY[city].name}</Body>
              {bins.map((d) => (
                <Row key={d.key}>
                  <Chip swatch={d.swatch} />
                  <View style={{ flex: 1 }}>
                    <Body style={{ fontWeight: '600' }}>{d.german.replace(/­/g, '')}</Body>
                    <Body muted style={{ fontSize: 15 }}>{d.alias ? `${d.alias} · ` : ''}{d.translation[lang]}</Body>
                  </View>
                </Row>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <View style={st.footer}>
        {step === 0 && <Button label={o.next} onPress={() => setStep(1)} />}
        {step === 1 && <Button label={o.next} onPress={() => setStep(2)} disabled={!city} />}
        {step === 2 && <Button label={o.start} onPress={finishOnboarding} />}
      </View>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 20, paddingTop: 32, gap: 24 },
  caption: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  footer: { paddingHorizontal: 20, paddingBottom: 12 },
});
