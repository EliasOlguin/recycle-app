import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { StoreProvider, useStore } from '@/store';

SplashScreen.preventAutoHideAsync();

function Routes() {
  const { ready, onboarded, t } = useStore();
  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);
  if (!ready) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={onboarded}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="result" options={{ presentation: 'fullScreenModal', animation: 'none' }} />
        <Stack.Screen name="pick/[what]" options={{ presentation: 'modal', headerShown: true, title: '' }} />
        <Stack.Screen name="correct/[id]" options={{ presentation: 'modal', headerShown: true, title: t.result.other }} />
      </Stack.Protected>
      <Stack.Protected guard={!onboarded}>
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StoreProvider>
        <StatusBar style="auto" />
        <Routes />
      </StoreProvider>
    </ThemeProvider>
  );
}
