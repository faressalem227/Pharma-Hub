/* eslint-disable prettier/prettier */
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { HeaderBar, BottomBar } from '../components';
import { useGlobalContext } from '../context/GlobalProvider';
import api from '../utilities/api';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (error) {
        Alert.alert('Error', 'Failed to get location.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const getNearestPharmacy = async () => {
    if (!location) {
      console.error('Location is not available');
      return;
    }

    try {
      const req = await api.get(
        `pharmacy/nearest?Longitude=${location.longitude}&Latitude=${location.latitude}`
      );

      const res = req.data.data;
      setData(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (location) {
      getNearestPharmacy();
    }
  }, [location]);

  return (
    <>
      {loading || !location ? (
        <></>
      ) : (
        <>
          <HeaderBar />
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
              showsMyLocationButton
              loadingEnabled
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              onRegionChangeComplete={(region) =>
                setLocation({
                  latitude: region.latitude,
                  longitude: region.longitude,
                })
              }>
              {data.map((item) => (
                <Marker
                  key={item.ID}
                  pinColor="#FF6347"
                  coordinate={{
                    latitude: item.Longitude,
                    longitude: item.Latitude,
                  }}
                  title={item.PharmacyName}
                  description={item.description}
                />
              ))}
            </MapView>

            <TouchableOpacity style={styles.assistantButton}>
              <Text style={styles.assistantText}>Chat Assistant</Text>
            </TouchableOpacity>
          </View>
          <BottomBar />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  assistantButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 4,
  },
  assistantText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
