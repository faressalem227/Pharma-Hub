/* eslint-disable prettier/prettier */
import { ScrollView, View, Text } from 'react-native';

import { FormField, Dropdown, DatePickerInput } from '../components';
function Signup() {
  return (
    <View className="bg-mainBg flex-1 ">
      <View className="mt-14 items-center gap-4 p-4">
        <Text className="text-mainText font-tbold text-4xl font-bold">انشاء حساب</Text>
        <Text className="text-mainText text-xl font-semibold">انضم إلينا واكتشف علاجك!</Text>
      </View>

      <ScrollView className="p-4">
        <FormField title="اسم المستخدم" placeholder="اسم المستخدم" otherStyles="mb-4" />
        <FormField title="البريد الاليكتروني" placeholder="user@gmail.com" otherStyles="mb-4" />
        <FormField title="كلمة المرور" placeholder="كلمة المرور" otherStyles="mb-4" />
        <View className="mb-4 flex-row gap-2">
          <DatePickerInput title="تاريخ الميلاد" />
          <Dropdown label="النوع" style="w-1/2" placeholder="" />
        </View>
      </ScrollView>
    </View>
  );
}

export default Signup;
