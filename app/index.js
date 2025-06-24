/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { HeaderBar, BottomBar, Loader } from '../components';
import { SearchContext } from '../context/SearchContext';

const { width } = Dimensions.get('window');

function formatDistance(meters) {
  if (meters < 1000) {
    return Math.round(meters) + ' m';
  } else {
    return (meters / 1000).toFixed(1) + ' km';
  }
}

export default function HomeScreen() {
  const { isLoading, location, searchData, setLocation, setPharmacy } = useContext(SearchContext);
  const router = useRouter();

  const mapRef = useRef(null);
  const markerRefs = useRef({});

  const hasLocationSetted = useRef(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    if (location?.latitude && location?.longitude && mapRef.current && !hasLocationSetted.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta || 0.02,
          longitudeDelta: location.longitudeDelta || 0.02,
        },
        500
      );
      hasLocationSetted.current = true;
    }
  }, [location]);

  return (
    <>
      <HeaderBar />
      {!isLoading && (
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location?.latitude || 30.0444,
              longitude: location?.longitude || 31.2357,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation
            showsMyLocationButton
            loadingEnabled
            // onRegionChangeComplete={(region) =>
            //   setLocation({
            //     latitude: region.latitude,
            //     longitude: region.longitude,
            //     latitudeDelta: region.latitudeDelta,
            //     longitudeDelta: region.longitudeDelta,
            //   })
            // }
          >
            {searchData.map((item) => (
              <Marker
                key={`${item.PharmacyID}_${item.Latitude}_${item.Longitude}`}
                ref={(ref) => {
                  if (ref) markerRefs.current[item.PharmacyID] = ref;
                }}
                pinColor={selectedPharmacy?.PharmacyID === item.PharmacyID ? '#288B96' : '#FF6347'}
                coordinate={{
                  latitude: item.Latitude,
                  longitude: item.Longitude,
                }}
                onPress={() => setSelectedPharmacy(item)}
                title={item.PharmacyName}
              />
            ))}
          </MapView>

          <View className="absolute  top-10 z-10 h-[500px]  w-[200px] overflow-auto rounded-br-2xl rounded-tr-2xl bg-white p-3 shadow-lg">
            <Text className="mb-3 text-lg font-bold text-mainText">Pharmacies</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {searchData.map((pharmacy) => (
                <TouchableOpacity
                  key={pharmacy.PharmacyID}
                  className="mb-3 gap-2  rounded-lg p-2"
                  onPress={() => {
                    setSelectedPharmacy(pharmacy);
                    mapRef.current?.animateToRegion({
                      latitude: pharmacy.Latitude,
                      longitude: pharmacy.Longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    });

                    markerRefs.current[pharmacy.PharmacyID]?.showCallout();
                  }}>
                  <Text className="font-tmedium text-sm text-secndryText">
                    {pharmacy.PharmacyName}
                  </Text>

                  <Text className="font-tregular text-xs text-secndryText">{`${pharmacy.Matches} matches`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {selectedPharmacy && (
            <View style={styles.popup}>
              <Text className="font-tbold text-lg">{selectedPharmacy.PharmacyName}</Text>
              <Text className="mt-4 font-tregular text-secndryText">
                {selectedPharmacy.Address || 'No address available'}
              </Text>

              <Text className="mt-2 font-tregular text-secndryText">
                {formatDistance(selectedPharmacy.DistanceFromSearchPoint)}
              </Text>
              <View className="flex-row items-center justify-end gap-3">
                <TouchableOpacity
                  className="rounded-lg bg-[#999] px-4 py-2"
                  onPress={() => setSelectedPharmacy(null)}>
                  <Text className="font-tbold text-white">Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="rounded-lg bg-mainText px-4 py-2"
                  onPress={() => {
                    setPharmacy(selectedPharmacy);
                    setSelectedPharmacy(null);
                    router.navigate('/PharmacyDetails');
                  }}>
                  <Text className="font-tbold text-white">View</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {}
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
  popup: {
    position: 'absolute',
    bottom: 110,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
});
