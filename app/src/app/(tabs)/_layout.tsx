import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { usePalette } from '@/components/ui';
import { useStore } from '@/store';

export default function TabsLayout() {
  const { t } = useStore();
  const c = usePalette();
  return (
    <NativeTabs tintColor={c.ink}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t.tabs.camera}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="camera" md="photo_camera" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>{t.tabs.search}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="history">
        <NativeTabs.Trigger.Label>{t.tabs.history}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="clock" md="history" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>{t.tabs.settings}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gearshape" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
