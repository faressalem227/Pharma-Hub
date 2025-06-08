/* eslint-disable prettier/prettier */
// app/index.js
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { HeaderBar, BottomBar } from '../components';
import api from '../utilities/api';
import { Platform } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const { login } = useGlobalContext();

  const getDrugAsync = async () => {
    try {
      const req = await api.get('drug/fillter?query=paramol&fillterType=1');
      const res = req.data;
      setData(res);
      // console.log('data', res);
    } catch (error) {
      // Error retrieving data
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      login('kamr151515@icloud.com', 'PharmaHub@2025');
    }
    getDrugAsync();
  }, []);

  return (
    <>
      <HeaderBar />
      <View className="flex-1">
        {/* Map */}
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 30.0444,
              longitude: 31.2357,
              latitudeDelta: 0.2235,
              longitudeDelta: 0.4567,
            }}>
            <Marker
              coordinate={{ latitude: 30.0444, longitude: 31.2357 }}
              title="El Marouny Pharmacy"
            />
          </MapView>
        </View>

        <TouchableOpacity style={styles.assistantButton}>
          <Text style={styles.assistantText}>Chat Assistant</Text>
        </TouchableOpacity>
      </View>

      <BottomBar />
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
