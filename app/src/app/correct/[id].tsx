import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { SearchPanel } from '@/components/search-panel';
import { usePalette } from '@/components/ui';
import { useStore } from '@/store';

/** "It was something else": the user names the item; the result screen then corrects the history entry. */
export default function Correct() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { startScan } = useStore();
  const c = usePalette();
  return (
    <View style={{ flex: 1, backgroundColor: c.paper, paddingTop: 12 }}>
      <SearchPanel
        autoFocus
        onPick={(hit) => {
          startScan({ id, classification: { parts: [{ category: hit.category, label: hit.label, confidence: 1 }] } });
          router.back();
        }}
      />
    </View>
  );
}
