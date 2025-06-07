/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';

import { LogoBar, OtpLayout, FormField, MainButton } from '../components';
import { icons } from '../constants';
import api from '../utilities/api';
const Reset = () => {
  const [form, setForm] = useState({
    email: '',
    Otp: '',
  });

  const [token, setToken] = useState('');

  const [content, setContent] = useState('mail');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleForgotPassword = async () => {
    if (form.email === '' || form.email === null || form.email === undefined) {
      Toast.show({
        type: 'error',
        text1: 'Please enter your email',
        autoHide: true,
        visibilityTime: 2000,
      });
      return;
    }

    try {
      const response = await api.post('auth/forgot-password-mobile', { Email: form.email });

      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: response.data.message,
          autoHide: true,
          visibilityTime: 2000,
        });

        setTimeout(() => {}, 2000);

        setContent('Otp');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await api.post('auth/Verify-otp', form);

      console.log('verfiy response', response);

      if (response.data.success) {
        setContent('password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => {
            if (content === 'Otp') {
              setContent('mail');
            } else {
              router.back();
            }
          }}>
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
      {content === 'mail' && (
        <View>
          <View className="mt-2">
            <View>
              <Text className="text-center font-tbold text-4xl text-secndryText">
                Forgot password
              </Text>
              <Text className="text mt-2 text-center font-tbold text-secndryText">
                forgot your password don't worry write your mail to receive a verification code!
              </Text>
            </View>
            <FormField
              inputStyle="p-4"
              title="E-Mail"
              value={form?.email || ''}
              handleChangeText={(value) =>
                setForm((prev) => ({
                  ...prev,
                  email: value,
                }))
              }
              otherStyles="mt-7"
              keyboardType="email-address"
              icon={icons.User}
              placeholder="user@gmail.com"
            />

            <MainButton
              title="Confirm"
              handlePress={handleForgotPassword}
              containerStyles="mt-7"
              isLoading={isLoading}
            />
          </View>
        </View>
      )}

      {content === 'Otp' && (
        <OtpLayout
          email={form.email}
          isLoading={isLoading}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              Otp: value,
            }))
          }
          onSubmit={handleVerifyOtp}
        />
      )}

      <Toast />
    </View>
  );
};

export default Reset;
