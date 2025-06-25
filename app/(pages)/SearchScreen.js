/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDebouncedCallback } from 'use-debounce';

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { SearchInput, FormField, Loader } from '../../components';
import { SearchContext } from '../../context/SearchContext';
import api, { streamBaseUrl, transcripeUrl } from '../../utilities/api';
import styles from '../../components/Styles';

const MedItem = ({ item, index, size, handleAdd, handleSave, drugList = [], savedMeds = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isIncluded = drugList.some((drug) => drug.ID === item.ID);
  
  const isSaved = savedMeds.some((drug) => drug.DrugID === item.ID);

  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);

  const handleSaveMed = async () => {
    try {
      setIsLoading(true);
      await handleSave(item.ID, note);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      className={`gap-3 py-4 ${index !== size - 1 ? 'border-b border-b-borderGray' : ''}`}
      key={item.ID}>
      <View className="flex-row items-center justify-between ">
        <Text className="font-tregular text-lg text-secndryText">{item.DrugNameEN}</Text>
        {!isLoading && (
          <View className="flex-row items-center gap-3">
            {!isIncluded && (
              <TouchableOpacity
                onPress={() => handleAdd(item)}
                className="rounded-md bg-mainText p-2">
                <Text className="font-tregular text-white">Add</Text>
              </TouchableOpacity>
            )}

            {isSaved && (
              <TouchableOpacity
                onPress={() => {
                  if (showNote) {
                    handleSave(item.ID, note);
                    setShowNote(false);
                    setNote('');
                  } else {
                    setShowNote(true);
                  }
                }}
                className="rounded-md bg-mainText p-2">
                <Text className="font-tregular text-white">{showNote ? 'Save' : 'Notes'}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleSaveMed}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M10.4688 3.45166C12.5522 1.28685 14.7619 1.07678 16.417 1.8335C18.1132 2.60915 19.3496 4.45037 19.3496 6.63818C19.3495 8.86618 18.4368 10.5825 17.1367 12.0464C15.8144 13.5353 14.1456 14.7097 12.6357 15.8989L12.6348 15.8999C12.1102 16.3143 11.6358 16.6834 11.1768 16.9517C10.7175 17.22 10.335 17.3501 10 17.3501C9.66507 17.3501 9.28275 17.2192 8.82324 16.9507C8.36398 16.6823 7.88927 16.3136 7.36426 15.8999H7.36328C5.85389 14.7097 4.18563 13.5343 2.86328 12.0454C1.56325 10.5815 0.650476 8.86541 0.650391 6.63721C0.650391 4.44887 1.88692 2.60779 3.58301 1.83252C5.23801 1.07622 7.44779 1.28683 9.53125 3.45166L10 3.93799L10.4688 3.45166Z"
                  stroke={isSaved ? 'none' : '#3C9D8D'}
                  fill={isSaved ? '#3C9D8D' : 'none'}
                  strokeWidth="1.3"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        )}
        {isLoading && <ActivityIndicator size={30} animating={isLoading} color="#227099" />}
      </View>

      {showNote && isSaved && (
        <FormField
          value={note}
          handleChangeText={(val) => setNote(val)}
          placeholder="write your notes..."
        />
      )}
    </View>
  );
};

export default function SearchScreen() {
  const [debounceSearch, setDebounceSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(false)
  const [imgUrl, setImgUrl] = useState('');

  const router = useRouter();
  const {
    searchedDrugData,
    setSearchedDrugData,
    handleAdd,
    handleRemove,
    getNearestPharmacy,
    drugList,
    savedMeds,
    getSavedMeds,
  } = useContext(SearchContext);

  const debounce = useDebouncedCallback((val) => {
    setDebounceSearch(val);
  }, 300);

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

  const openCamera = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Camera permission is required to use this feature.");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      setFile({"uri":result.assets[0].uri, "mimeType":result.assets[0].mimeType, "name":result.assets[0].fileName})

      if (!result.canceled) {
        console.log("Image URI:", result.assets[0].uri);
      }
    };
  
    const openDocumentPicker = async () => {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log(result)
      if (result.canceled === false) {
        console.log("Picked document URI:");
        setFile(result.assets[0])
        console.log(result.assets[0])
      }
    };

    const sendPrescription = async () => {
      if (!file) {
        alert("Please select a file first.");
        return;
      }

      let img = '';
      let type = 0;

      let formData = new FormData();
      formData.append("Prescription", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });
      
      try {
        setIsLoading(true);
        let response = await fetch(`${transcripeUrl}/pharmacy/prescription`, {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        let result = await response.json();
        console.log(result, "result");
        setImgUrl(result.prescriptionUrl);
        img= result.prescriptionUrl;
        type = 2

        response = await fetch(`${streamBaseUrl}/prescription`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url: img,
            type: type
          })
        });

        result = await response.json();
        console.log(result, "result");
        
        let matchedDrugs = result.Matched_Drugs;
        console.log(matchedDrugs?.join(";"), "matchedDrugs");
        
        const mainReq = await api.post('/drug/neareast/prescription', {
            PrescriptionInfo: matchedDrugs,
            Latitude: 30.0444,
            Longitude: 31.2357
          });
        const nearestPharmacies = mainReq.data;
        console.log(nearestPharmacies, "nearestPharmacies");
        setFile(false); // Reset file after sending
        // alert("Prescription sent successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to send prescription.");
      } finally {
        setIsLoading(false);
      }
    }
  const handleSaveMed = async (id, note) => {
    try {
      const response = await api.post('saved-medicines', {
        DrugID: id,
        Notes: note,
      });

      await getSavedMeds();
    } catch (error) {
      console.error('Failed to save medicine:', error?.response?.data || error.message);
      // Optionally show error toast/message
    }
  };

  useEffect(() => {
    if (debounceSearch) {
      handleGetMedicine();
    }
  }, [debounceSearch]);

  useEffect(() => {
    if (file) {
      sendPrescription()
    }
  }, [file]);

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
            onChange={(value) => {
              debounce(value);
            }}
            handleSubmit={handleGetMedicine}
          />
        </View>
        <TouchableOpacity onPress={openCamera} style={styles.iconContainer}>
          <MaterialIcons name="photo-camera" size={24} color="#3C9D8D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openDocumentPicker} style={styles.iconContainer}>
          <MaterialIcons name="attach-file" size={24} color="#3C9D8D" />
        </TouchableOpacity>
      </View>

      {!isLoading && (
        <View className="flex-1">
          {/* {searchedDrugData.length === 0 && (
            <Text className="font-tmedium text-xl text-secndryText">Recent</Text>
          )} */}

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
                  handleSave={handleSaveMed}
                  savedMeds={savedMeds}
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
