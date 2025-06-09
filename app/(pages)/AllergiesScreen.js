/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';

import { Navback, Dropdown, Loader } from '../../components';
import api from '../../utilities/api';

const AllergyEntry = ({ item, index, size }) => {
  return (
    <View
      className={`py-4 ${index !== size - 1 ? 'border-b border-b-borderGray' : ''}`}
      key={item.ID}>
      <Text className="font-tregular text-lg text-secndryText">{item.SubstanceName}</Text>
    </View>
  );
};

const AllergiesScreen = () => {
  const [activeSubstanceData, setActiveSubstanceData] = useState([]);
  const [userAllergies, setUserAllergies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [counter, setCounter] = useState(0);

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

      setCounter((prev) => prev + 1);
      setSelectedValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserAllergies();
  }, [counter]);

  useEffect(() => {
    getActiveSubstanceData();
  }, []);

  console.log(selectedValue);

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
            <View>
              <FlatList
                data={userAllergies}
                renderItem={({ item, index }) => (
                  <AllergyEntry item={item} index={index} size={userAllergies.length} />
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
