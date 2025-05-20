/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, I18nManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { MainButton, FormField, LogoBar, Loader } from '../components';
import { icons } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';

const Welcome = () => {
  const { isLogged, user, loading, checkAuth, login } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);

  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  // console.log(form);

  const submit = async () => {
    if (form.UserName === '' || form.password === '') {
      Toast.show({
        type: 'error',
        text1: 'خطأ',
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

      const result = await login(form.email, form.password); //fcmToken

      Toast.show({
        type: 'success',
        text1: 'عملية ناجحه',
        text2: 'تم تسجيل الدخول بنجاح',
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: 'right',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
    } catch (error) {
      //console.log("error", error);
      Toast.show({
        type: 'error',
        text1: 'فشلت العملية',
        text2: error?.response.data.message,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: 'right',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const redirectGuest = async () => {
      await checkAuth(); // Wait for auth state to be checked
      router.replace('/HomeScreen');
    };
    redirectGuest();
  }, []);

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        {loading ? (
          <Loader isLoading={loading} />
        ) : (
          <>
            <LogoBar />
            <View className="my-6 mt-20 h-full px-4">
              <Text className="mb-10 text-center font-tbold text-2xl text-dark">تسجيل الدخول</Text>
              <FormField
                inputStyle="p-4"
                title="البريد الاليكتروني"
                value={form.UserName}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                keyboardType="email-address"
                icon={icons.User}
                placeholder="البريد الاليكتروني"
                inputIconUser={form.UserName && icons.deleteIcon}
                handlePress={() => setForm({ ...form, UserName: '', password: '' })}
              />
              <FormField
                inputStyle="p-4"
                title="كلمة المرور"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
                icon={icons.lock}
                placeholder="ادخل كلمة المرور"
              />
              <MainButton
                title="تسجيل الدخول"
                handlePress={submit}
                containerStyles="mt-14"
                isLoading={isSubmitting}
                icon={icons.Signin}
              />
              <MainButton
                title="انشاء حساب"
                handlePress={() => {
                  router.replace('Signup');
                }}
                containerStyles="mt-8"
                isLoading={isSubmitting}
                icon={icons.Signin}
              />
              <MainButton
                title="FOR BEST DEV EXPERIENCE"
                handlePress={() => {
                  setForm({ email: 'kamr151515@gmail.com', password: 'PharmaHub@2025' });
                }}
                containerStyles="mt-14"
                isLoading={isSubmitting}
                icon={icons.Signin}
              />
            </View>
            <Toast />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

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
