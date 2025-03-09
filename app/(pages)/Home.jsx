/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { LogoBar, UserInfo } from '../../components';
import Dropdown from '../../components/UI/DropDown';
import SmallButton from '../../components/UI/SmallButton';
import MainLayout from '../../components/layout/MainLayout';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
function Home() {
  const { user, DepartmentID, setDepartmentID, departmentData } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTypeStore, setSelectedTypeStore] = useState(null);
  const router = useRouter();
  const StoresData = ['دمياط', 'القاهرة', 'اسكندرية '];
  const [selectStation, setSelectStation] = useState(null);
  return (
    <ScrollView className="bg-white">
      {/* <Text>Home</Text> */}
      <MainLayout title="Home" hasLeftComponent loading={false}>
        <UserInfo />
        <View className="mx-[16px] mb-6">
          <Dropdown
            placeholder="اسم المحطه"
            title="أختر اسم المحطه"
            defaultOption={{
              key: user?.DepartmentID,
              value: user?.UserDepartmentName,
            }}
            onChange={(v) => setDepartmentID(v)}
            data={departmentData}
          />
        </View>
        <View className="mx-2 flex-row items-center justify-between p-2">
          <SmallButton
            title="منظومة الموظفين"
            icon={icons.persones}
            handlePress={() => router.navigate('/EmployeesSystem')}
          />
          <SmallButton
            title="ادارة الأصول"
            icon={icons.manage}
            handlePress={() => router.navigate('/AssetHome')}
          />
        </View>
        <View className="mx-2 flex-row items-center justify-between p-2">
          <SmallButton
            title="المخازن"
            icon={icons.Storefront}
            handlePress={() => router.navigate('/StoresBranches')}
          />
          <SmallButton
            title="منظومة التشغيل"
            icon={icons.MechanicTime}
            handlePress={() => router.navigate('/OperationsHome')}
          />
          {/* <SmallButton title="المشتريات"
                                icon={icons.ShoppingCart}
                                handlePress={() => router.navigate("/PurchasesPage")}
                            /> */}
        </View>

        <View className="mx-2 flex-row items-center justify-between p-2">
          <SmallButton
            title="SCADA"
            icon={icons.Vector}
            handlePress={() => router.navigate('/ScadaHome')}
          />
          <SmallButton
            title="منظومة الصيانة"
            icon={icons.Setting}
            handlePress={() => router.navigate('/MaintenanceHome')}
          />
        </View>
        <View className="mx-2 flex-row items-center justify-between p-2">
          <SmallButton
            title="منظومة الطاقة"
            icon={icons.PowerIcon}
            handlePress={() => router.navigate('/EnergyHome')}
          />
          {/* <SmallButton title="منظومة الصيانة"
                                icon={icons.Setting}
                                handlePress={() => router.navigate("/MaintenanceHome")}
                            /> */}
          <SmallButton
            title="report"
            icon={icons.Setting}
            handlePress={() => router.navigate('/ReportsStim')}
          />
        </View>
      </MainLayout>
    </ScrollView>
  );
}

export default Home;
