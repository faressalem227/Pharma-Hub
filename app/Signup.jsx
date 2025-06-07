/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';

import {
  FormField,
  Dropdown,
  DatePickerInput,
  MainButton,
  LogoBar,
  OtpLayout,
} from '../components';
import { icons } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';
import api from '../utilities/api';

function Signup() {
  const [roleState, setRoleState] = useState({
    type: 0,
    isSetted: false,
  });

  const [genderData, setGenderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [form, setForm] = useState({
    Username: '',
    Email: '',
    password: '',
    BirthDate: '',
    gender: '',
    Otp: '',
    LangID: 1,
    userTypeID: 1,
  });

  const { login } = useGlobalContext();

  const getGenderData = async () => {
    try {
      const response = await api.get('list?sp=gender_list');

      console.log('gender', response.data.data);

      setGenderData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckUser = async () => {
    const userData = Object.entries(form);

    for (let i = 0; i < userData.length; i++) {
      const [key, value] = userData[i];
      if (key !== 'Otp' && (value === '' || value === null || value === undefined)) {
        Toast.show({
          type: 'error',
          text1: `please fill your ${key}`,
          autoHide: true,
          visibilityTime: 2000,
        });

        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await api.post('auth/checkUser', form);
      setShowOtp(true);
    } catch (error) {
      console.log(error?.response?.data, 'error response');
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: 'left',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleVerifyOtp = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await api.post('auth/Verify-otp', {
  //       Otp: form.Otp,
  //       Email: form.Email,
  //     });

  //     handleSubmitForm();
  //   } catch (error) {
  //     console.log(error?.response?.data, 'error response');
  //     Toast.show({
  //       type: 'error',
  //       text1: error?.response?.data?.message,
  //       autoHide: true,
  //       visibilityTime: 3000,
  //       text1Style: {
  //         textAlign: 'left',
  //       },
  //       text2Style: {
  //         textAlign: 'right',
  //       },
  //     });
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmitForm = async () => {
    try {
      setIsLoading(true);
      const res = await api.post('auth/signup', form);

      if (res?.data.success) {
        const response = await login(form.Email, form.password);

        Toast.show({
          type: 'success',
          autoHide: true,
          visibilityTime: 2000,
          text1: `Welcome ${form.Username}`,
          text1Style: {
            textAlign: 'left',
          },
        });

        if (response) {
          router.replace('/');
        }
      }
    } catch (error) {
      console.log(error?.response?.data, 'error response');
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
        autoHide: true,
        visibilityTime: 2000,
        text1Style: {
          textAlign: 'left',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    getGenderData();
  }, []);

  useEffect(() => {
    if (roleState.type === 2) {
      setForm((prev) => ({
        ...prev,
        userTypeID: 2,
      }));
    }
  }, [roleState.type]);

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => {
            if (showOtp) {
              setShowOtp(false);
            } else if (roleState.isSetted) {
              setRoleState({
                type: 0,
                isSetted: false,
              });
            } else if (!roleState.isSetted) {
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

      {!showOtp && (
        <>
          <View className="mt-14 items-center gap-1 p-4">
            <Text className="font-tbold text-4xl text-secndryText">
              {roleState.isSetted ? 'Create an account' : 'Choose Role'}
            </Text>
            {!roleState.isSetted && (
              <Text className="font-tmedium text-xl text-secndryText">to continue</Text>
            )}
            {roleState.type === 1 && roleState.isSetted && (
              <Text className="font-tmedium text-xl text-secndryText">
                Join us and explore your cure!
              </Text>
            )}
          </View>

          {!roleState.isSetted && (
            <View className="flex-1 justify-center gap-4">
              <MainButton
                title="User"
                handlePress={() =>
                  setRoleState(() => ({
                    isSetted: true,
                    type: 1,
                  }))
                }
              />
              <MainButton
                title="Pharmacy"
                handlePress={() =>
                  setRoleState(() => ({
                    isSetted: true,
                    type: 2,
                  }))
                }
              />
            </View>
          )}

          {roleState.isSetted && (
            <ScrollView className="p-4">
              <FormField
                title="Username"
                placeholder="Enter your username"
                otherStyles="mb-4"
                value={form.Username || ''}
                handleChangeText={(e) => setForm((prev) => ({ ...prev, Username: e }))}
              />
              <FormField
                title="E-mail"
                placeholder="user@gmail.com"
                otherStyles="mb-4"
                value={form.Email || ''}
                handleChangeText={(e) => setForm((prev) => ({ ...prev, Email: e }))}
              />
              <FormField
                icon={icons.lock}
                title="Password"
                placeholder="Enter you password"
                otherStyles="mb-4"
                value={form.password || ''}
                handleChangeText={(e) => setForm((prev) => ({ ...prev, password: e }))}
              />
              <View className="mb-4 flex-row gap-2">
                <DatePickerInput
                  title="Birth date"
                  style="w-1/2"
                  onChange={(e) => setForm((prev) => ({ ...prev, BirthDate: e }))}
                />
                <Dropdown
                  data={genderData}
                  label="Gender"
                  style="w-1/2"
                  placeholder=""
                  haveSearch={false}
                  value={form.gender}
                  onChange={(value) => setForm((prev) => ({ ...prev, gender: value }))}
                />
              </View>
              <MainButton
                isLoading={isLoading}
                title="Sign up"
                handlePress={() => {
                  handleCheckUser();
                }}
                containerStyles="mt-14"
              />
            </ScrollView>
          )}
        </>
      )}

      {showOtp && (
        <OtpLayout
          onChange={setForm}
          onSubmit={handleSubmitForm}
          isLoading={isLoading}
          email={form.Email}
        />
      )}

      <Toast />
    </View>
  );
}

export default Signup;
