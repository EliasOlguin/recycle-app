import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Body, Button, Chip, Row, Title, usePalette } from '@/components/ui';
import { destination } from '@/data/cities';
import type { HistoryEntry, HistoryPart } from '@/store';
import { useStore } from '@/store';

const plain = (s: string) => s.replace(/­/g, '');

export default function HistoryScreen() {
  const { t, lang, history } = useStore();
  const c = usePalette();
  const when = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'es-AR', { day: 'numeric', month: 'short' });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.paper }}>
      <View style={st.header}>
        <Title>{t.history.title}</Title>
      </View>
      <FlatList
        data={history}
        keyExtractor={(h) => h.id}
        contentContainerStyle={history.length ? st.list : st.emptyWrap}
        ListEmptyComponent={
          <View style={{ gap: 16 }}>
            <Body muted>{t.history.empty}</Body>
            <Button label={t.history.openCamera} onPress={() => router.navigate('/')} />
          </View>
        }
        renderItem={({ item }) => <Entry entry={item} date={when(item.at)} />}
      />
    </SafeAreaView>
  );
}

function Entry({ entry, date }: { entry: HistoryEntry; date: string }) {
  const { t } = useStore();
  const c = usePalette();
  const name = (p: HistoryPart) => plain(destination(entry.city, p.destination).german);
  return (
    <Row right={<Body muted style={{ fontSize: 15 }}>{date}</Body>}>
      <View style={{ gap: 4 }}>
        {entry.parts.map((p, i) => (
          <Chip key={i} swatch={destination(entry.city, p.destination).swatch} />
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <Body style={{ fontWeight: '600' }}>{entry.parts.map((p) => p.label).join(' + ')}</Body>
        <Body muted style={{ fontSize: 15 }}>{entry.parts.map(name).join(' + ')}</Body>
        {entry.wrong && (
          <Body muted style={{ fontSize: 15 }} accessibilityLabel={`${t.history.corrected}: ${entry.wrong.map(name).join(' + ')}`}>
            <Body muted style={{ fontSize: 15, textDecorationLine: 'line-through', color: c.muted }}>
              {entry.wrong.map(name).join(' + ')}
            </Body>{' '}
            · {t.history.corrected}
          </Body>
        )}
      </View>
    </Row>
  );
}

const st = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  list: { paddingHorizontal: 20, paddingBottom: 32 },
  emptyWrap: { paddingHorizontal: 20, paddingTop: 16 },
});
