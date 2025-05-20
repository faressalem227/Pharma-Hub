/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';

import { FormField, Dropdown, DatePickerInput, MainButton } from '../components';
import api from '../utilities/api';

import Toast from 'react-native-toast-message';

function Signup() {
  const [roleState, setRoleState] = useState({
    type: 0,
    isSetted: false,
  });

  const [genderData, setGenderData] = useState([]);

  const [form, setForm] = useState({
    Email: '',
    Username: '',
    password: '',
    LangID: 1,
    userTypeID: 1,
    BirthDate: '',
    Otp: '',
    gender: '',
  });

  const getGenderData = async () => {
    try {
      const response = await api.get('list?sp=gender_list');

      console.log('gender', response.data.data);

      setGenderData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await api.post('auth/checkUser', form);
    } catch (error) {
      console.log(error?.response?.data, 'error response');
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: 'right',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
      console.error(error);
    }
  };

  const router = useRouter();

  useEffect(() => {
    getGenderData();
  }, []);

  console.log(form);

  return (
    <View className="flex-1 bg-mainBg p-4">
      <TouchableOpacity
        onPress={() => {
          if (roleState.isSetted) {
            setRoleState(() => ({
              type: 0,
              isSetted: false,
            }));
          } else {
            router.replace('');
          }
        }}
        className="mt-3 h-10 w-10 items-center justify-center rounded-[50%] bg-[#24838d70]">
        <Text className="text-5xl font-semibold text-mainText">{'\u2190'}</Text>
      </TouchableOpacity>

      <View className="mt-14 items-center gap-4 p-4">
        <Text className="font-tbold text-4xl font-bold text-mainText">
          {roleState.isSetted ? 'انشاء حساب' : 'اختر نوع الحساب'}
        </Text>
        {!roleState.isSetted && (
          <Text className="text-xl font-semibold text-mainText">للاستكمال</Text>
        )}
        <Text className="text-xl font-semibold text-mainText">
          {roleState.type === 2 ? 'انضم إلينا واكتشف علاجك!' : ''}
        </Text>
      </View>

      {!roleState.isSetted && (
        <View className="flex-1 justify-center gap-4">
          <MainButton
            title="مستخدم"
            handlePress={() =>
              setRoleState(() => ({
                isSetted: true,
                type: 2,
              }))
            }
          />
          <MainButton
            title="صيدليه"
            handlePress={() =>
              setRoleState(() => ({
                isSetted: true,
                type: 1,
              }))
            }
          />
        </View>
      )}

      {roleState.isSetted && (
        <ScrollView className="p-4">
          <FormField
            title="اسم المستخدم"
            placeholder="اسم المستخدم"
            otherStyles="mb-4"
            handleChangeText={(e) => setForm((prev) => ({ ...prev, Username: e }))}
          />
          <FormField
            title="البريد الاليكتروني"
            placeholder="user@gmail.com"
            otherStyles="mb-4"
            handleChangeText={(e) => setForm((prev) => ({ ...prev, Email: e }))}
          />
          <FormField
            title="كلمة المرور"
            placeholder="كلمة المرور"
            otherStyles="mb-4"
            handleChangeText={(e) => setForm((prev) => ({ ...prev, password: e }))}
          />
          <View className="mb-4 flex-row gap-2">
            <DatePickerInput
              title="تاريخ الميلاد"
              style="w-1/2"
              onChange={(e) => setForm((prev) => ({ ...prev, BirthDate: e }))}
            />
            <Dropdown
              data={genderData}
              label="النوع"
              style="w-1/2"
              placeholder=""
              haveSearch={false}
              onSelect={(value) => setForm((prev) => ({ ...prev, gender: value }))}
            />
          </View>
          <MainButton
            title="انشاء حساب"
            handlePress={() => {
              handleSignup();
            }}
            containerStyles="mt-14"
          />
        </ScrollView>
      )}

      <Toast />
    </View>
  );
}

export default Signup;
