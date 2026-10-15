import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';

import { Body, Chip, Icon, Row, usePalette } from '@/components/ui';
import { CATEGORY } from '@/data/categories';
import { destination, RULES } from '@/data/cities';
import { search, type Hit } from '@/logic/search';
import { useStore } from '@/store';

const EXAMPLES = ['caja_pizza', 'pila_bateria', 'botella_vidrio_bebida', 'papel_sucio', 'ropa_calzado'];

/** Text search over the city's categories. Used by the Search tab and by "it was something else". */
export function SearchPanel({ onPick, autoFocus }: { onPick: (hit: Hit) => void; autoFocus?: boolean }) {
  const { t, lang, city } = useStore();
  const c = usePalette();
  const [q, setQ] = useState('');
  const hits = search(q, lang);
  const examples: Hit[] = EXAMPLES.map((k) => ({ category: k, label: CATEGORY[k].name[lang] }));
  const list = q.trim().length >= 2 ? hits : examples;

  return (
    <View style={{ flex: 1 }}>
      <View style={[st.field, { backgroundColor: c.dark ? '#1C1D1F' : '#F1F1F2' }]}>
        <Icon name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }} size={18} color={c.muted} />
        <TextInput
          value={q}
          onChangeText={setQ}
          autoFocus={autoFocus}
          placeholder={t.search.placeholder}
          placeholderTextColor={c.muted}
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel={t.search.placeholder}
          style={[st.input, { color: c.ink }]}
        />
      </View>
      <FlatList
        data={list}
        keyExtractor={(h) => h.category + h.label}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        ListHeaderComponent={
          q.trim().length < 2 ? (
            <Body muted style={st.note}>{t.search.hint} {t.search.examples}:</Body>
          ) : hits.length === 0 ? (
            <Body muted style={st.note}>{t.search.empty(q.trim())}</Body>
          ) : null
        }
        renderItem={({ item }) => {
          const rule = city && RULES[city][item.category];
          const d = rule && city ? destination(city, rule.destination) : null;
          return (
            <Row onPress={() => onPick(item)}>
              {d ? <Chip swatch={d.swatch} /> : <View style={st.noChip} />}
              <View style={{ flex: 1 }}>
                <Body style={{ fontWeight: '600' }}>{item.label}</Body>
                <Body muted style={{ fontSize: 15 }}>{d ? d.german.replace(/­/g, '') : t.search.depends}</Body>
              </View>
            </Row>
          );
        }}
      />
    </View>
  );
}

const st = StyleSheet.create({
  field: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginBottom: 8, paddingHorizontal: 12, borderRadius: 12, minHeight: 44 },
  input: { flex: 1, fontSize: 17, paddingVertical: 10 },
  note: { paddingVertical: 12 },
  noChip: { width: 28, height: 28, borderRadius: 7, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#9A9DA1' },
});
