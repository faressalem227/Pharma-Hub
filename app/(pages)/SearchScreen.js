/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDebouncedCallback } from 'use-debounce';

import { SearchInput } from '../../components';
import { SearchContext } from '../../context/SearchContext';
import api from '../../utilities/api';

const MedItem = ({ item, index, size, handleAdd, handleSave, drugList = [] }) => {
  const isIncluded = drugList.some((drug) => drug.ID === item.ID);
  return (
    <View
      className={`flex-row items-center justify-between py-4 ${index !== size - 1 ? 'border-b border-b-borderGray' : ''}`}
      key={item.ID}>
      <Text className="font-tregular text-lg text-secndryText">{item.DrugNameEN}</Text>

      <View>
        {!isIncluded && (
          <TouchableOpacity onPress={() => handleAdd(item)} className="rounded-md bg-mainText p-2">
            <Text className="font-tregular text-white">Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [debounceSearch, setDebounceSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {
    searchedDrugData,
    setSearchedDrugData,
    handleAdd,
    handleRemove,
    getNearestPharmacy,
    drugList,
  } = useContext(SearchContext);

  const debounce = useDebouncedCallback((val) => {
    setDebounceSearch(val);
  }, 200);

  const handleGetMedicine = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`drug/fillter?query=${debounceSearch}&fillterType=1`);

      setSearchedDrugData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearch) {
      handleGetMedicine();
    }
  }, [debounceSearch]);

  return (
    <View className="flex-1 bg-white p-4">
      <View className="mb-4 flex-row items-center gap-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Svg
            width="20"
            height="20"
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
        <View className="flex-1">
          <SearchInput
            value={searchText}
            onChange={(value) => {
              setSearchText(value);
              debounce(value);
            }}
            handleSubmit={handleGetMedicine}
          />
        </View>
      </View>

      {!isLoading && (
        <View className="flex-1">
          {searchedDrugData.length === 0 && (
            <Text className="font-tmedium text-xl text-secndryText">Recent</Text>
          )}

          {drugList.length > 0 && (
            <View className="my-2 gap-5">
              <View className="flex-row items-center justify-between">
                <Text className="font-tmedium text-2xl text-secndryText">
                  Search pharmacies with :
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    getNearestPharmacy();
                    router.navigate('/');
                  }}
                  className="rounded-md bg-mainText p-2">
                  <Text className="font-tregular text-white">Find pahrmacies</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap items-center gap-3">
                {drugList.map((drug) => {
                  return (
                    <TouchableOpacity
                      key={drug.ID}
                      className="rounded-full bg-mainText px-4 py-2"
                      onPress={() => handleRemove(drug)}>
                      <Text className="text-white">{drug.DrugNameEN}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {searchedDrugData.length > 0 && (
            <FlatList
              data={searchedDrugData}
              keyExtractor={(item) => item.ID}
              renderItem={({ item, index }) => (
                <MedItem
                  item={item}
                  index={index}
                  size={searchedDrugData.length}
                  handleAdd={handleAdd}
                  drugList={drugList}
                />
              )}
            />
          )}
        </View>
      )}

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator animating={isLoading} size={80} color="#227099" />
        </View>
      )}
    </View>
  );
}
