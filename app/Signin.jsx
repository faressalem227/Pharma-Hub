/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, I18nManager, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';

// import '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';
import { MainButton, FormField, LogoBar, Loader } from '../components';
import { icons } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';
const Signin = () => {
  const { isLogged, user, loading, checkAuth, login } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  useEffect(() => {
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
  }, []);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission({
  //     alert: true,
  //     sound: true,
  //     badge: true,
  //   });

  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   console.log('Notification permission status:', authStatus);
  //   return enabled;
  // }

  // const getFcmToken = async () => {
  //   const permession = await requestUserPermission();
  //   await messaging().registerDeviceForRemoteMessages();

  //   const token = await messaging().getToken();
  //   console.log('FCM Token:', token);
  //   return permession ? token : null;
  // };
  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Toast.show({
        type: 'error',
        text1: 'Please fill the inputs',
        text2: 'من فضلك ادخل البيانات المطلوبه',
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: 'right',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
      return;
    }
    try {
      setSubmitting(true);
      const fcmToken = null;
      // await getFcmToken();
      const response = await login(form.email, form.password, fcmToken); //fcmToken
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Sign in successed',
          autoHide: true,
          visibilityTime: 2000,
          text1Style: {
            textAlign: 'left',
          },
        });

        router.replace('/');
      }
    } catch (error) {
      console.error(error);

      Toast.show({
        type: 'error',
        text1: 'Sign in failed',
        autoHide: true,
        visibilityTime: 2000,
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ScrollView className="bg-white p-4">
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <View>
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M16.81 3L7.5 12.31L16.81 21.62"
                  stroke="#595959"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <LogoBar />
          </View>
          <View className="h-full flex-1">
            <Text className="mb-10 text-center font-tbold text-4xl text-secndryText">Sign In</Text>
            <FormField
              inputStyle="p-4"
              title="E-Mail"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              icon={icons.User}
              placeholder="user@gmail.com"
              inputIconUser={form.UserName && icons.deleteIcon}
              handlePress={() => setForm({ ...form, UserName: '', password: '' })}
            />
            <FormField
              inputStyle="p-4"
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              icon={icons.lock}
              placeholder="Enter your password"
            />
            <TouchableOpacity onPress={() => router.navigate('/Reset')}>
              <Text className="mt-4 text-center text-secndryText">forgot your password?</Text>
            </TouchableOpacity>
            <MainButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-14"
              isLoading={isSubmitting}
              icon={icons.Signin}
            />
            <MainButton
              title="Sign up"
              handlePress={() => {
                router.navigate('Signup');
              }}
              containerStyles="mt-7"
              isLoading={isSubmitting}
              icon={icons.Signin}
            />
            <MainButton
              title="FOR BEST DEV EXPERIENCE"
              handlePress={() =>
                setForm({ email: 'kamr151515@gmail.com', password: 'PharmaHub@2025' })
              }
              containerStyles="mt-7"
              isLoading={isSubmitting}
              icon={icons.Signin}
            />
          </View>
          <Toast />
        </View>
      )}
    </ScrollView>
  );
};
export default Signin;
