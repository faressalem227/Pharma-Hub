/* eslint-disable prettier/prettier */
import { useFonts } from 'expo-font';
import { SplashScreen, Slot } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalProvider from '../context/GlobalProvider';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const insets = useSafeAreaInsets();

  const [fontsLoaded, fontError] = useFonts({
    'Tajawal-Bold': require('../assets/fonts/Tajawal-Bold.ttf'),
    'Tajawal-Light': require('../assets/fonts/Tajawal-Light.ttf'),
    'Tajawal-Medium': require('../assets/fonts/Tajawal-Medium.ttf'),
    'Tajawal-Regular': require('../assets/fonts/Tajawal-Regular.ttf'),
  });

  useEffect(() => {
    if (fontError) {
      console.error('Error loading fonts:', fontError);
      return;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: insets.top }}>
      <GlobalProvider>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Slot />
      </GlobalProvider>
    </SafeAreaView>
  );
};

export default RootStack;
