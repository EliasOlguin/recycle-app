import { router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchPanel } from '@/components/search-panel';
import { Title, usePalette } from '@/components/ui';
import { useStore } from '@/store';

export default function SearchScreen() {
  const { t, startScan } = useStore();
  const c = usePalette();
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.paper }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 }}>
        <Title>{t.tabs.search}</Title>
      </View>
      <SearchPanel
        onPick={(hit) => {
          // A typed answer is certain: confidence 1, so only clarifying questions remain.
          startScan({ classification: { parts: [{ category: hit.category, label: hit.label, confidence: 1 }] } });
          router.push('/result');
        }}
      />
    </SafeAreaView>
  );
}
