/* eslint-disable prettier/prettier */
import * as Location from 'expo-location';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import api from '../utilities/api';

export const SearchContext = createContext({
  location: {
    longitude: 0,
    latitude: 0,
  },

  searchData: [],
  setSearchData: () => {},
  searchedDrugData: [],
  setSearchedDrugData: () => {},
  drugList: [],
  setDrugList: () => {},
  handleAdd: () => {},
  handleRemove: () => {},
  isLoading: false,
  getNearestPharmacy: () => {},
  setLocation: () => {},
  pharmacyID: 0,
  setPharmacyID: () => {},
});

const SearchContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [searchedDrugData, setSearchedDrugData] = useState([]);
  const [DrugListIds, setDrugListIds] = useState([]);
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialFetch, setInitialFetch] = useState(true);
  const [pharmacyID, setPharmacyID] = useState(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
        setIsLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});

      setLocation({
        longitude: loc.coords.longitude,
        latitude: loc.coords.latitude,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to get location.');
      console.error(error);
    } finally {
      if (isInitialFetch) setIsLoading(false);
    }
  };

  const getNearestPharmacy = async () => {
    if (!location) {
      console.error('Location is not available');
      return;
    }

    try {
      if (isInitialFetch) setIsLoading(true);
      const req = await api.get(
        `pharmacy/nearest?Longitude=${location.longitude}&Latitude=${location.latitude}&DrugID=${DrugListIds.join(';')}&SearchRadiusMeters=1000`
      );

      const res = req.data.data;
      setSearchData(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addDrug = (id) => {
    if (!id) return; // prevent adding undefined/null

    setDrugListIds((prev) => {
      if (prev.includes(id)) return prev; // already exists
      return [...prev, id]; // add new
    });
  };

  const removeDrug = (id) => {
    if (!id) return;

    setDrugListIds((prev) => prev.filter((drugId) => drugId !== id));
  };

  const handleAdd = (item) => {
    setDrugList((prev) => [...prev, item]);
    addDrug(item.ID);
  };

  const handleRemove = (item) => {
    setDrugList((prev) => prev.filter((drug) => drug.ID !== item.ID));
    removeDrug(item.ID);
  };

  useEffect(() => {
    if (location) {
      getNearestPharmacy();
    }

    if (isInitialFetch) {
      setInitialFetch(false);
    }
  }, [location]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        drugList,
        searchData,
        setSearchData,
        searchedDrugData,
        setSearchedDrugData,
        handleAdd,
        handleRemove,
        isLoading,
        getNearestPharmacy,
        setLocation,
        location,
        pharmacyID,
        setPharmacyID,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
