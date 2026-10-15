import { router } from 'expo-router';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Body, Button, Row, Title, usePalette } from '@/components/ui';
import { CITY } from '@/data/cities';
import { LANG_NAMES } from '@/i18n';
import { useStore } from '@/store';

export default function SettingsScreen() {
  const { t, lang, city, history, clearHistory } = useStore();
  const c = usePalette();
  const s = t.settings;

  const confirmClear = () => {
    if (Platform.OS === 'web') {
      if (window.confirm(`${s.clearConfirm}\n${s.clearBody}`)) clearHistory();
      return;
    }
    Alert.alert(s.clearConfirm, s.clearBody, [
      { text: s.cancel, style: 'cancel' },
      { text: s.delete, style: 'destructive', onPress: clearHistory },
    ]);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.paper }}>
      <ScrollView contentContainerStyle={st.content}>
        <Title>{s.title}</Title>
        <View>
          <Row onPress={() => router.push('/pick/city')} right={<Body muted>{city ? CITY[city].name : ''}</Body>}>
            <Body>{s.city}</Body>
          </Row>
          <Row onPress={() => router.push('/pick/language')} right={<Body muted>{LANG_NAMES[lang]}</Body>}>
            <Body>{s.language}</Body>
          </Row>
        </View>
        <View style={{ gap: 6 }}>
          <Row right={<Body muted>{s.guest}</Body>}>
            <Body>{s.account}</Body>
          </Row>
          <Body muted style={{ fontSize: 15 }}>{s.guestNote}</Body>
        </View>
        {/* Destructive action kept apart from everything else. */}
        <View style={st.danger}>
          <Button kind="destructive" label={s.clear} onPress={confirmClear} disabled={history.length === 0} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  content: { padding: 20, paddingTop: 12, gap: 32 },
  danger: { marginTop: 48, alignItems: 'flex-start' },
});
