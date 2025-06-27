/* eslint-disable prettier/prettier */

import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { router, SplashScreen, Slot } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GlobalProvider from '../context/GlobalProvider';

import '../global.css';
import SearchContextProvider from '../context/SearchContext';
import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
SplashScreen.preventAutoHideAsync();
// Register background message handler outside of component
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  // You can store navigation data in AsyncStorage or similar
  // to handle it when the app becomes active
});

const RootStack = () => {
  const insets = useSafeAreaInsets();

  // Handle foreground messages
  useEffect(() => {
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      try {
        // Display a custom notification using Notifee
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          android: {
            importance: AndroidImportance.HIGH,
          },
        });

        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId: channelId,
          },
        });
      } catch (error) {
        console.error('Error displaying notification:', error);
      }
    });

    return unsubscribeForeground;
  }, []);

  // Handle initial notification (app opened from notification)
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);

          try {
            const message = JSON.parse(remoteMessage);
            const type = message?.data?.type;
            if (type === 'navigation' && message?.data?.route) {
              // Add a small delay to ensure the app is fully loaded
              setTimeout(() => {
                router.navigate(message?.data?.route);
              }, 1000);
            }
          } catch (e) {
            console.error('Error parsing remote message:', e);
          }
          // Handle deep linkin g based on the message content
        }
      })
      .catch((error) => {
        console.error('Error getting initial notification:', error);
      });
  }, []);

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

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Medicine Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#3C9D8D',
      });
    }
  }, []);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: insets.top }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <GlobalProvider>
        <SearchContextProvider>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Slot />
        </SearchContextProvider>
      </GlobalProvider>
    </SafeAreaView>
  );
};

export default RootStack;
