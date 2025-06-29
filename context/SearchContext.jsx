/* eslint-disable prettier/prettier */
import * as Location from 'expo-location';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import api from '../utilities/api';

export const SearchContext = createContext({
  location: {
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
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
  pharmacy: {},
  setPharmacy: () => {},
  savedMeds: [],
  getSavedMeds: () => {},
  savedPharmacies: [],
  getsavedPharmacies: () => {},
  notifications: [],
});

const SearchContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [savedMeds, setSavedMeds] = useState([]);
  const [searchedDrugData, setSearchedDrugData] = useState([]);
  const [DrugListIds, setDrugListIds] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialFetch, setInitialFetch] = useState(true);
  const [pharmacy, setPharmacy] = useState(null);
  const [savedPharmacies, setSavedPharmacies] = useState([]);
  const [notifications, setNotifications] = useState([]);

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
        `pharmacy/nearest?Longitude=${location?.longitude}&Latitude=${location?.latitude}&DrugID=${DrugListIds.join(';')}`
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

  const getSavedMeds = async () => {
    try {
      const response = await api.get('saved-medicines');
      setSavedMeds(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getsavedPharmacies = async () => {
    try {
      const response = await api.get('saved-pharmacies');
      setSavedPharmacies(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetNots = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('notifications');

      setNotifications(response.data.data.notifications);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetNots();
  }, []);

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
    getSavedMeds();
    getsavedPharmacies();
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
        pharmacy,
        setPharmacy,
        savedMeds,
        getSavedMeds,
        savedPharmacies,
        getsavedPharmacies,
        setDrugList,
        notifications,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
