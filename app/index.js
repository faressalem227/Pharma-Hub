import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderBar, BottomBar } from '../components';
import api from '../utilities/api';
import { Platform } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useGlobalContext } from '../context/GlobalProvider';
import * as Location from 'expo-location';

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

        // Get current location
        const loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
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

  const getNereastPharmacy = async () => {
    if (!location) {
      console.error('Location is not available');
      return;
    }
    try {
      const req = await api.get(
        `pharmacy/nearest?Longitude=${location?.longitude}&Latitude=${location?.latitude}`
      );

      const res = req.data.data;
      setData(res);
    } catch (error) {
      // Error retrieving data
      console.error('Error fetching data:', error);
    }
  };

  console.log(data);
  useEffect(() => {
    getNereastPharmacy();
  }, [location]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <HeaderBar />
          <View className="flex-1">
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: location?.latitude || 37.78825,
                longitude: location?.longitude || -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              // showsCompass={true}
              // showsScale={true}
              // showsTraffic={true}
              // showsIndoors={true}
              // showsBuildings={true}
              loadingEnabled={true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              onRegionChangeComplete={(region) => setLocation(region)}>
              {data.map((item) => (
                <Marker
                  onPress={() => {}}
                  key={item.ID}
                  pinColor="#FF6347" // Tomato color for the marker
                  coordinate={{
                    latitude: item.Longitude,
                    longitude: item.Latitude,
                  }}
                  title={item.PharmacyName}
                  description={item.description}
                />
              ))}
            </MapView>

            <View></View>

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
});
