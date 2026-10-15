import * as Location from 'expo-location';
import { useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

import { Body, Button, Row, usePalette } from '@/components/ui';
import { CITIES } from '@/data/cities';
import type { CityId, Lang } from '@/data/types';
import { LANG_NAMES } from '@/i18n';
import { useStore } from '@/store';

export function LanguageList({ onPick }: { onPick?: () => void }) {
  const { lang, setLang } = useStore();
  return (
    <View>
      {(Object.keys(LANG_NAMES) as Lang[]).map((l) => (
        <Row
          key={l}
          selected={l === lang}
          onPress={() => {
            setLang(l);
            onPick?.();
          }}>
          <Body>{LANG_NAMES[l]}</Body>
        </Row>
      ))}
    </View>
  );
}

const byName = (name?: string | null): CityId | undefined =>
  CITIES.find((x) => name && x.name.toLowerCase() === name.toLowerCase().replace('cologne', 'köln'))?.id;

export function CityList({ onPick }: { onPick?: () => void }) {
  const { city, setCity, t } = useStore();
  const c = usePalette();
  const [state, setState] = useState<{ busy?: boolean; note?: string }>({});

  const pick = (id: CityId) => {
    setCity(id);
    onPick?.();
  };

  const locate = async () => {
    setState({ busy: true });
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return setState({ note: t.onboarding.locationFailed });
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      const [place] = await Location.reverseGeocodeAsync(pos.coords);
      const found = byName(place?.city) ?? byName(place?.subregion);
      if (found) return pick(found);
      setState({ note: place?.city ? t.onboarding.notSupported(place.city) : t.onboarding.locationFailed });
    } catch {
      setState({ note: t.onboarding.locationFailed });
    }
  };

  return (
    <View style={{ gap: 16 }}>
      {Platform.OS !== 'web' && (
        <Button
          kind="secondary"
          icon={{ ios: 'location', android: 'my_location', web: 'my_location' }}
          label={state.busy ? t.onboarding.locating : t.onboarding.useLocation}
          onPress={locate}
          disabled={state.busy}
        />
      )}
      {state.busy && <ActivityIndicator color={c.ink} />}
      {state.note && <Body muted accessibilityLiveRegion="polite">{state.note}</Body>}
      <View>
        {CITIES.map((x) => (
          <Row key={x.id} selected={x.id === city} onPress={() => pick(x.id)}>
            <Body>{x.name}</Body>
          </Row>
        ))}
      </View>
    </View>
  );
}
