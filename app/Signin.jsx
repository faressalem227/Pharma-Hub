/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, I18nManager, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';

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

  // console.log(form);

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Toast.show({
        type: 'error',
        text1: 'Sign in Failed',
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

      const response = await login(form.email, form.password); //fcmToken

      console.log('response', response);

      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Sign in successed',
          text2: 'تم تسجيل الدخول بنجاح',
          autoHide: true,
          visibilityTime: 2000,
          text1Style: {
            textAlign: 'left',
          },
          text2Style: {
            textAlign: 'right',
          },
        });

        router.replace('/');
      }
    } catch (error) {
      //console.log("error", error);
      Toast.show({
        type: 'error',
        text1: 'Sign in failed',
        text2: error?.response.data.message,
        autoHide: true,
        visibilityTime: 2000,
        // text1Style: {
        //   textAlign: 'left',
        // },
        // text2Style: {
        //   textAlign: 'left',
        // },
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

// Request FCM permission and get token
// const authStatus = await messaging().requestPermission();
// const enabled =
// 	authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// 	authStatus === messaging.AuthorizationStatus.PROVISIONAL;

// let fcmToken = null;
// if (enabled) {
// 	fcmToken = await messaging().getToken();
// }

// // Proceed with login regardless of FCM token status

// import "@react-native-firebase/app";
// import messaging from "@react-native-firebase/messaging";
