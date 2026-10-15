import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

import { CityList, LanguageList } from '@/components/pickers';
import { usePalette } from '@/components/ui';
import { useStore } from '@/store';

export default function Pick() {
  const { what } = useLocalSearchParams<{ what: 'city' | 'language' }>();
  const { t } = useStore();
  const c = usePalette();
  return (
    <ScrollView style={{ backgroundColor: c.paper }} contentContainerStyle={{ padding: 20 }}>
      <Stack.Screen options={{ title: what === 'city' ? t.settings.city : t.settings.language }} />
      {what === 'city' ? <CityList onPick={() => router.back()} /> : <LanguageList onPick={() => router.back()} />}
    </ScrollView>
  );
}
