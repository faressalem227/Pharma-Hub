/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';

import { Navback, Dropdown, Loader } from '../../components';
import api from '../../utilities/api';

const AllergyEntry = ({ item, index, size, handleDelete = () => {} }) => {
  return (
    <View
      className={`flex-row items-center justify-between py-4 ${index !== size - 1 ? 'border-b border-b-borderGray' : ''}`}
      key={item.ID}>
      <Text className="font-tregular text-lg text-secndryText">{item.SubstanceName}</Text>

      <TouchableOpacity onPress={() => handleDelete(item.ID)}>
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M3.75 23.25C3.0625 23.25 2.47417 23.0054 1.985 22.5163C1.49584 22.0271 1.25084 21.4383 1.25 20.75V4.5C0.895838 4.5 0.599171 4.38 0.360004 4.14C0.120838 3.9 0.000837644 3.60333 4.31034e-06 3.25C-0.000829023 2.89667 0.119171 2.6 0.360004 2.36C0.600838 2.12 0.897504 2 1.25 2H6.25C6.25 1.64583 6.37001 1.34917 6.61 1.11C6.85001 0.870833 7.14667 0.750833 7.5 0.75H12.5C12.8542 0.75 13.1513 0.87 13.3913 1.11C13.6313 1.35 13.7508 1.64667 13.75 2H18.75C19.1042 2 19.4013 2.12 19.6413 2.36C19.8813 2.6 20.0008 2.89667 20 3.25C19.9992 3.60333 19.8792 3.90042 19.64 4.14125C19.4008 4.38208 19.1042 4.50167 18.75 4.5V20.75C18.75 21.4375 18.5054 22.0263 18.0163 22.5163C17.5271 23.0063 16.9383 23.2508 16.25 23.25H3.75ZM7.5 18.25C7.85417 18.25 8.15126 18.13 8.39126 17.89C8.63126 17.65 8.75084 17.3533 8.75 17V8.25C8.75 7.89583 8.63 7.59917 8.39001 7.36C8.15 7.12083 7.85334 7.00083 7.5 7C7.14667 6.99917 6.85001 7.11917 6.61 7.36C6.37001 7.60083 6.25 7.8975 6.25 8.25V17C6.25 17.3542 6.37001 17.6512 6.61 17.8912C6.85001 18.1312 7.14667 18.2508 7.5 18.25ZM12.5 18.25C12.8542 18.25 13.1513 18.13 13.3913 17.89C13.6313 17.65 13.7508 17.3533 13.75 17V8.25C13.75 7.89583 13.63 7.59917 13.39 7.36C13.15 7.12083 12.8533 7.00083 12.5 7C12.1467 6.99917 11.85 7.11917 11.61 7.36C11.37 7.60083 11.25 7.8975 11.25 8.25V17C11.25 17.3542 11.37 17.6512 11.61 17.8912C11.85 18.1312 12.1467 18.2508 12.5 18.25Z"
            fill="#CF4A4A"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const AllergiesScreen = () => {
  const [activeSubstanceData, setActiveSubstanceData] = useState([]);
  const [userAllergies, setUserAllergies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const getActiveSubstanceData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('list?sp=active_substance_List');

      setActiveSubstanceData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserAllergies = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('alergic');
      setUserAllergies(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAlergy = async () => {
    try {
      const response = await api.post('alergic', {
        ActiveSubstanceID: selectedValue,
      });

      getUserAllergies();
      setSelectedValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllergy = async (id) => {
    try {
      const response = await api.delete(`alergic/${id}`);
      if (response?.data?.success) {
        Toast.show({
          type: 'success',
          text1: response.data.message,
          autoHide: true,
          visibilityTime: 2000,
          text1Style: {
            textAlign: 'left',
          },
        });

        getUserAllergies();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActiveSubstanceData();
    getUserAllergies();
  }, []);

  return (
    <>
      {!isLoading && (
        <View className="flex-1 bg-white p-4">
          <View className="flex-row">
            <Navback title="Allergies" />
          </View>

          <View className="mt-8 flex-row items-center gap-2">
            <View className="flex-1">
              <Dropdown
                placeholder="Add Allergy"
                value={selectedValue}
                data={activeSubstanceData}
                onChange={(val) => setSelectedValue(val)}
              />
            </View>

            <TouchableOpacity
              className="w-1/4 rounded-md bg-mainText px-2 py-5"
              onPress={handleAddAlergy}>
              <Text className="text-center text-white">Add</Text>
            </TouchableOpacity>
          </View>

          {userAllergies.length > 0 && (
            <View className="mt-5">
              <FlatList
                data={userAllergies}
                renderItem={({ item, index }) => (
                  <AllergyEntry
                    item={item}
                    index={index}
                    size={userAllergies.length}
                    handleDelete={handleDeleteAllergy}
                  />
                )}
                keyExtractor={(item) => item.ID}
              />
            </View>
          )}
        </View>
      )}

      <View>
        <Loader isLoading={isLoading} />
      </View>
    </>
  );
};

export default AllergiesScreen;
