// Native tabs do not render on web; this bar only exists so the screens can be previewed in a browser.
import { router, Slot, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon, usePalette } from '@/components/ui';
import { useStore } from '@/store';

const TABS = [
  { href: '/', key: 'camera', icon: 'photo_camera' },
  { href: '/search', key: 'search', icon: 'search' },
  { href: '/history', key: 'history', icon: 'history' },
  { href: '/settings', key: 'settings', icon: 'settings' },
] as const;

export default function TabsLayout() {
  const { t } = useStore();
  const c = usePalette();
  const path = usePathname();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <View accessibilityRole="tablist" style={{ ...st.bar, backgroundColor: c.paper, borderTopColor: c.rule }}>
        {TABS.map((tab) => {
          const on = path === tab.href;
          const color = on ? c.ink : c.muted;
          return (
            <Pressable
              key={tab.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              onPress={() => router.navigate(tab.href)}
              style={st.tab}>
              <Icon name={{ web: tab.icon }} color={color} />
              <Text style={{ ...st.label, color, fontWeight: on ? '600' : '400' }}>{t.tabs[tab.key]}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: 20, paddingTop: 6 },
  tab: { flex: 1, alignItems: 'center', gap: 2, minHeight: 48, justifyContent: 'center' },
  label: { fontSize: 11 },
});
