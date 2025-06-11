/* eslint-disable prettier/prettier */

import { useFonts } from 'expo-font';
import { router, SplashScreen, Slot } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalProvider from '../context/GlobalProvider';
import * as Location from 'expo-location';

import '../global.css';
// import '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';
// import notifee, { AndroidImportance } from '@notifee/react-native';
SplashScreen.preventAutoHideAsync();
// Register background message handler outside of component
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
//   // You can store navigation data in AsyncStorage or similar
//   // to handle it when the app becomes active
// });

const RootStack = () => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      try {
        // Request permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
          setLoading(false);
          return;
        }

        // Get current location
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (error) {
        Alert.alert('Error', 'Failed to get location.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Handle foreground messages
  // useEffect(() => {
  //   const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
  //     try {
  //       // Display a custom notification using Notifee
  //       const channelId = await notifee.createChannel({
  //         id: 'default',
  //         name: 'Default Channel',
  //         android: {
  //           importance: AndroidImportance.HIGH,
  //         },
  //       });

  //       await notifee.displayNotification({
  //         title: remoteMessage.notification?.title,
  //         body: remoteMessage.notification?.body,
  //         android: {
  //           channelId: channelId,
  //         },
  //       });
  //     } catch (error) {
  //       console.error('Error displaying notification:', error);
  //     }
  //   });

  //   return unsubscribeForeground;
  // }, []);

  // Handle initial notification (app opened from notification)
  // useEffect(() => {
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log('Notification caused app to open from quit state:', remoteMessage);

  //         // Handle deep linking based on the message content
  //         const type = remoteMessage?.data?.type;
  //         if (type === 'navigation' && remoteMessage?.data?.route) {
  //           // Add a small delay to ensure the app is fully loaded
  //           setTimeout(() => {
  //             router.navigate(remoteMessage.data.route);
  //           }, 1000);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error getting initial notification:', error);
  //     });
  // }, []);

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

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: insets.top }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <GlobalProvider>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Slot />
      </GlobalProvider>
    </SafeAreaView>
  );
};

export default RootStack;
