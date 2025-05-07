/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';

import { FormField, Dropdown, DatePickerInput, MainButton } from '../components';

function Signup() {
  const [roleState, setRoleState] = useState({
    type: 0,
    isSetted: false,
  });

  const router = useRouter();

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
          <FormField title="اسم المستخدم" placeholder="اسم المستخدم" otherStyles="mb-4" />
          <FormField title="البريد الاليكتروني" placeholder="user@gmail.com" otherStyles="mb-4" />
          <FormField title="كلمة المرور" placeholder="كلمة المرور" otherStyles="mb-4" />
          <View className="mb-4 flex-row gap-2">
            <DatePickerInput title="تاريخ الميلاد" style="w-1/2" />
            <Dropdown label="النوع" style="w-1/2" placeholder="" haveSearch={false} />
          </View>
          {/* Address */}
          <MainButton
            title="انشاء حساب"
            handlePress={() => {}}
            containerStyles="mt-14"
            // isLoading={isSubmitting}
            // icon={icons.Signin}
          />
        </ScrollView>
      )}
    </View>
  );
}

export default Signup;
