import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { classify } from '@/api/classify';
import { Body, Button, Title, usePalette } from '@/components/ui';
import { CITY } from '@/data/cities';
import { useStore } from '@/store';

export default function CameraScreen() {
  const { t, lang, city, startScan } = useStore();
  const c = usePalette();
  const cam = useRef<CameraView>(null);
  const [perm, requestPerm] = useCameraPermissions();
  const [ready, setReady] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState(false);

  // Coming back from a result: show the live camera again.
  useFocusEffect(useCallback(() => setPhoto(null), []));

  if (!perm) return <View style={{ flex: 1, backgroundColor: '#000' }} />;

  if (!perm.granted) {
    return (
      <SafeAreaView style={[st.perm, { backgroundColor: c.paper }]}>
        <View style={{ gap: 8 }}>
          <Title>{t.camera.permTitle}</Title>
          <Body muted>{t.camera.permSub}</Body>
        </View>
        <View style={{ gap: 12 }}>
          {perm.canAskAgain && <Button label={t.camera.permAllow} onPress={requestPerm} />}
          <Button kind="secondary" label={t.camera.searchInstead} onPress={() => router.navigate('/search')} />
        </View>
      </SafeAreaView>
    );
  }

  const shoot = async () => {
    if (!cam.current || photo) return;
    setError(false);
    try {
      const pic = await cam.current.takePictureAsync({ quality: 0.6 });
      setPhoto(pic.uri);
      const classification = await classify(pic.uri, lang);
      startScan({ classification, photoUri: pic.uri });
      router.push('/result');
    } catch {
      setPhoto(null);
      setError(true);
    }
  };

  return (
    <View style={st.screen}>
      <CameraView ref={cam} style={StyleSheet.absoluteFill} facing="back" onCameraReady={() => setReady(true)} />
      {photo && (
        <View style={StyleSheet.absoluteFill}>
          <Image source={{ uri: photo }} style={StyleSheet.absoluteFill} contentFit="cover" />
          <View style={st.dim} />
          <View style={st.looking} accessibilityLiveRegion="polite">
            <ActivityIndicator color="#fff" />
            <Text style={st.lookingText}>{t.camera.looking}</Text>
          </View>
        </View>
      )}
      <SafeAreaView edges={['top']} style={st.top}>
        {city && (
          <Pressable accessibilityRole="button" onPress={() => router.push('/pick/city')} style={st.city} hitSlop={8}>
            <Text style={st.cityText}>{CITY[city].name}</Text>
          </Pressable>
        )}
      </SafeAreaView>
      <View style={st.bottom}>
        {error && <Text style={st.error}>{t.camera.failed}</Text>}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t.camera.shoot}
          disabled={!ready || !!photo}
          onPress={shoot}
          style={({ pressed }) => [st.shutter, { transform: [{ scale: pressed ? 0.94 : 1 }], opacity: ready ? 1 : 0.5 }]}>
          <View style={st.shutterInner} />
        </Pressable>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  perm: { flex: 1, padding: 20, paddingTop: 48, justifyContent: 'space-between' },
  dim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.45)' },
  looking: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', gap: 12 },
  lookingText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  top: { position: 'absolute', left: 0, right: 0, top: 0, alignItems: 'center' },
  city: { marginTop: 8, paddingHorizontal: 14, minHeight: 36, justifyContent: 'center', borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.55)' },
  cityText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 28, alignItems: 'center', gap: 14 },
  error: { color: '#fff', fontSize: 15, backgroundColor: 'rgba(0,0,0,0.65)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  shutter: { width: 78, height: 78, borderRadius: 39, borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  shutterInner: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#fff' },
});
