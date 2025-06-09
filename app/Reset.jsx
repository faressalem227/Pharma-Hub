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

  const [content, setContent] = useState('mail');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

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
      setIsLoading(true);
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
      setIsLoading(true);
      const response = await api.post('auth/Verify-otp', {
        Email: form.email,
        Otp: form.Otp,
      });

      console.log('verfiy response', response.data);

      Toast.show({
        type: 'success',
        text1: response.data.message,
        autoHide: true,
        visibilityTime: 2000,
        text1Style: {
          textAlign: 'left',
        },
      });
      setToken(response.data.resetToken);
      setContent('password');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const passwordArr = Object.entries(password);

    for (let index = 0; index < passwordArr.length; index++) {
      const { key, value } = passwordArr[index];

      if (value === '' || value === null) {
        Toast.show({
          type: 'error',
          text1: `Please fill the ${key} field`,
          autoHide: true,
          visibilityTime: 2000,
          text1Style: {
            textAlign: 'left',
          },
        });

        return;
      }
    }

    if (password.newPassword !== password.confirmNewPassword) {
      Toast.show({
        type: 'error',
        text1: "Passwords doesn't match",
        autoHide: true,
        visibilityTime: 2000,
        text1Style: {
          textAlign: 'left',
        },
      });

      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post('auth/reset-password', {
        newPassword: password.newPassword,
        token,
      });

      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: response.data.message,
          autoHide: true,
          visibilityTime: 2000,
        });

        setTimeout(() => {}, 2000);

        router.replace('/Signin');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(token);

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => {
            if (content === 'Otp' || content === 'password') {
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

      {content === 'password' && (
        <View className="mt-4">
          <Text className="mb-12 text-center font-tbold text-4xl text-secndryText">
            Create new password
          </Text>

          <View className="gap-3">
            <FormField
              placeholder="New password"
              value={password.newPassword || ''}
              handleChangeText={(val) =>
                setPassword((prev) => ({
                  ...prev,
                  newPassword: val,
                }))
              }
            />
            <FormField
              placeholder="Confirm new password"
              value={password.confirmNewPassword || ''}
              handleChangeText={(val) =>
                setPassword((prev) => ({
                  ...prev,
                  confirmNewPassword: val,
                }))
              }
            />
          </View>

          <MainButton
            title="Create"
            isLoading={isLoading}
            handlePress={handleResetPassword}
            containerStyles="mt-5"
          />
        </View>
      )}

      <Toast />
    </View>
  );
};

export default Reset;
