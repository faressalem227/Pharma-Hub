/* eslint-disable prettier/prettier */
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlobalProvider from '../context/GlobalProvider';
import '../global.css';
SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const [fontsLoaded, error] = useFonts({
    'Tajawal-Bold': require('../assets/fonts/Tajawal-Bold.ttf'),
    'Tajawal-Light': require('../assets/fonts/Tajawal-Light.ttf'),
    'Tajawal-Medium': require('../assets/fonts/Tajawal-Medium.ttf'),
    'Tajawal-Regular': require('../assets/fonts/Tajawal-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <SafeAreaView style={{ flex: 1, zIndex: -2, backgroundColor: '#ffffff' }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Signup" options={{ headerShown: false }} />
          <Stack.Screen name="(pages)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </GlobalProvider>
  );
};

export default RootStack;
