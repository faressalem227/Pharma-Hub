/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { HeaderBar, BottomBar, Loader } from '../components';
import { SearchContext } from '../context/SearchContext';

export default function HomeScreen() {
  const { isLoading, location, searchData, setLocation } = useContext(SearchContext);

  console.log('location', location);

  useEffect(() => {}, [location]);

  return (
    <>
      <HeaderBar />

      {!isLoading && (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location?.latitude || 30.0444, // Fallback to Cairo if location is not set
              longitude: location?.longitude || 31.2357,
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
            {searchData.map((item) => (
              <Marker
                key={`${item.ID}_${item.Latitude}_${item.Longitude}`}
                pinColor="#FF6347"
                coordinate={{
                  latitude: item.Latitude,
                  longitude: item.Longitude,
                }}
                title={item.PharmacyName}
                description={item.description}
              />
            ))}
          </MapView>

          <TouchableOpacity
            style={styles.assistantButton}
            onPress={() => console.log('Chat Assistant opened')}>
            <Text style={styles.assistantText}>Chat Assistant</Text>
          </TouchableOpacity>
        </View>
      )}

      <Loader isLoading={isLoading} />
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
