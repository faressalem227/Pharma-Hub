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
  isLoading: false,
  getNearestPharmacy: () => {},
  setLocation: () => {},
});

const SearchContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(false);
    }
  };

  const getNearestPharmacy = async () => {
    if (!location) {
      console.error('Location is not available');
      return;
    }

    try {
      setIsLoading(true);
      const req = await api.get(
        `pharmacy/nearest?Longitude=${location.longitude}&Latitude=${location.latitude}`
      );

      const res = req.data.data;
      setSearchData(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      getNearestPharmacy();
    }
  }, [location]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SearchContext.Provider
      value={{ searchData, isLoading, getNearestPharmacy, setLocation, location }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
