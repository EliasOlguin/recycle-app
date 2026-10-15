import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { openBrowserAsync } from 'expo-web-browser';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { demoClassification } from '@/api/classify';
import { Flood } from '@/components/flood';
import { Body, Button, Chip, Icon, Row, Title, usePalette } from '@/components/ui';
import { CATEGORY } from '@/data/categories';
import { CITY, destination, RULES } from '@/data/cities';
import { decide } from '@/logic/decide';
import { useStore } from '@/store';

export default function Result() {
  const store = useStore();
  const { demo } = useLocalSearchParams<{ demo?: string }>();
  // Dev-only: /result?demo=<key> opens a canned state without the camera, for previews.
  const scan = __DEV__ && demo && demoClassification(demo) ? { id: `demo-${demo}`, classification: demoClassification(demo) } : store.scan;

  if (!scan || !store.city) return <Redirect href="/" />;
  return <ResultFor key={scan.id + JSON.stringify(scan.classification)} scanId={scan.id} classification={scan.classification} />;
}

function ResultFor({ scanId, classification }: { scanId: string; classification: Parameters<typeof decide>[0] }) {
  const { t, lang, city, history, record, correct } = useStore();
  const cityId = city!;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const outcome = useMemo(() => decide(classification, cityId, lang, answers), [classification, cityId, lang, answers]);
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));
  const toSearch = () => {
    close();
    router.navigate('/search');
  };

  useEffect(() => {
    if (outcome.kind !== 'answer' || scanId.startsWith('demo-')) return;
    const parts = outcome.parts.map((p) => ({ label: p.label, category: p.category, destination: p.destination.key }));
    const existing = history.find((h) => h.id === scanId);
    if (!existing) record({ id: scanId, at: new Date().toISOString(), city: cityId, parts });
    // Same scan, different answer: the user corrected it. History keeps the first answer struck through.
    else if (JSON.stringify(existing.parts) !== JSON.stringify(parts)) correct(scanId, parts);
  }, [outcome, scanId, cityId, history, record, correct]);

  if (outcome.kind === 'answer') {
    return (
      <Flood
        parts={outcome.parts}
        lang={lang}
        city={CITY[cityId].name}
        title={outcome.parts.length > 1 ? t.result.parts(outcome.parts.length) : undefined}
        againLabel={t.result.again}
        backLabel={t.result.back}
        onBack={close}
        onAgain={close}
        feedback={(fg) =>
          feedback ? (
            <Text style={[st.feedbackText, { color: fg }]} accessibilityLiveRegion="polite">{t.result.thanks}</Text>
          ) : (
            <View style={st.feedback}>
              <Text style={[st.feedbackText, { color: fg }]}>{t.result.helped}</Text>
              <Thumb fg={fg} label={t.result.yes} icon="up" onPress={() => setFeedback('yes')} />
              <Thumb fg={fg} label={t.result.no} icon="down" onPress={() => setFeedback('no')} />
              <Pressable accessibilityRole="button" onPress={() => router.push(`/correct/${scanId}`)} hitSlop={8} style={st.other}>
                <Text style={[st.feedbackText, st.underline, { color: fg }]}>{t.result.other}</Text>
              </Pressable>
            </View>
          )
        }
      />
    );
  }

  const label = classification.parts[0]?.label ?? '';

  if (outcome.kind === 'confirm') {
    const options = [outcome.best, ...outcome.alternatives];
    return (
      <Neutral
        onClose={close}
        closeLabel={t.result.back}
        title={t.result.confirmTitle}
        sub={t.result.confirmSub}
        actions={<Button kind="secondary" label={t.result.noneOfThese} onPress={toSearch} />}>
        <View>
          {options.map((cat) => {
            const rule = RULES[cityId][cat];
            const d = rule && destination(cityId, rule.destination);
            return (
              <Row key={cat} onPress={() => setAnswers({ ...answers, [outcome.partIndex]: cat })}>
                <Chip swatch={d?.swatch} />
                <View style={{ flex: 1 }}>
                  <Body style={{ fontWeight: '600' }}>{CATEGORY[cat].name[lang]}</Body>
                  <Body muted style={{ fontSize: 15 }}>{d ? d.german.replace(/­/g, '') : t.search.depends}</Body>
                </View>
              </Row>
            );
          })}
        </View>
      </Neutral>
    );
  }

  if (outcome.kind === 'question') {
    const q = CATEGORY[outcome.category].question!;
    return (
      <Neutral
        onClose={close}
        closeLabel={t.result.back}
        title={q.text[lang]}
        sub={label}
        actions={q.options.map((opt) => {
          const rule = RULES[cityId][opt.category];
          // Answers that lead straight to a container show its colour, e.g. the three glass containers.
          const lead = rule && destination(cityId, rule.destination).type === 'public_container' ? destination(cityId, rule.destination).swatch : undefined;
          return (
            <Button
              key={opt.category}
              kind="secondary"
              label={opt.label[lang]}
              leading={lead && <Chip swatch={lead} size={22} />}
              onPress={() => setAnswers({ ...answers, [outcome.partIndex]: opt.category })}
            />
          );
        })}
      />
    );
  }

  if (outcome.kind === 'no_rule') {
    return (
      <Neutral
        onClose={close}
        closeLabel={t.result.back}
        title={t.result.noRuleTitle(CITY[cityId].name)}
        sub={t.result.noRuleSub}
        actions={
          <>
            <Button label={t.result.openGuide} onPress={() => openBrowserAsync(CITY[cityId].guideUrl)} icon={{ ios: 'safari', android: 'open_in_new', web: 'open_in_new' }} />
            <Button kind="secondary" label={t.result.again} onPress={close} />
          </>
        }>
        <Body style={{ fontWeight: '600' }}>{outcome.label}</Body>
      </Neutral>
    );
  }

  return (
    <Neutral
      onClose={close}
      closeLabel={t.result.back}
      title={t.result.unsureTitle}
      sub={t.result.unsureSub}
      actions={
        <>
          <Button label={t.result.retake} onPress={close} icon={{ ios: 'camera', android: 'photo_camera', web: 'photo_camera' }} />
          <Button kind="secondary" label={t.result.searchInstead} onPress={toSearch} />
        </>
      }
    />
  );
}

function Neutral({ title, sub, onClose, closeLabel, children, actions }: { title: string; sub?: string; onClose: () => void; closeLabel: string; children?: ReactNode; actions: ReactNode }) {
  const c = usePalette();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.paper }}>
      <StatusBar style="auto" />
      <View style={st.neutralNav}>
        <Pressable accessibilityRole="button" accessibilityLabel={closeLabel} onPress={onClose} hitSlop={10} style={st.close}>
          <Icon name={{ ios: 'xmark', android: 'close', web: 'close' }} color={c.ink} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={st.neutral}>
        <View style={{ gap: 8 }}>
          <Title>{title}</Title>
          {!!sub && <Body muted>{sub}</Body>}
        </View>
        {children}
      </ScrollView>
      <View style={st.actions}>{actions}</View>
    </SafeAreaView>
  );
}

function Thumb({ fg, label, icon, onPress }: { fg: string; label: string; icon: 'up' | 'down'; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} hitSlop={6} style={st.thumb}>
      <Icon
        size={22}
        color={fg}
        name={icon === 'up' ? { ios: 'hand.thumbsup', android: 'thumb_up', web: 'thumb_up' } : { ios: 'hand.thumbsdown', android: 'thumb_down', web: 'thumb_down' }}
      />
    </Pressable>
  );
}

const st = StyleSheet.create({
  neutralNav: { paddingHorizontal: 8, minHeight: 52, justifyContent: 'center' },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  neutral: { padding: 20, paddingTop: 8, gap: 28 },
  actions: { paddingHorizontal: 20, paddingBottom: 12, gap: 12 },
  feedback: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  feedbackText: { fontSize: 15, fontWeight: '600' },
  underline: { textDecorationLine: 'underline' },
  thumb: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  other: { marginLeft: 'auto', minHeight: 44, justifyContent: 'center' },
});
