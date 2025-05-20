// app/index.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import api from '../../utilities/api';
const { width } = Dimensions.get('window');

const categories = [
  { id: '1', title: 'Baby Products', image: require('../../assets/images/baby.png') },
  { id: '2', title: 'Personal Care', image: require('../../assets/images/baby.png') },
  { id: '3', title: 'Popular Medications', image: require('../../assets/images/baby.png') },
  { id: '4', title: 'Personal Care', image: require('../../assets/images/baby.png') },
];

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const getDrugAsync = async () => {
    try {
      const req = await api.get('drug/fillter?query=paramol&fillterType=1');
      const res = req.data;
      setData(res);
      console.log('data', res);
    } catch (error) {
      // Error retrieving data
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getDrugAsync();
  }, []);

  const renderCategory = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi Ali 👋</Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 30.0444, // Cairo coordinates as an example
            longitude: 31.2357,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{ latitude: 30.0444, longitude: 31.2357 }}
            title="El Marouny Pharmacy"
          />
        </MapView>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity>
          <Text style={styles.moreText}>more +</Text>
        </TouchableOpacity>
      </View>

      {/* Assistant Button */}
      <TouchableOpacity style={styles.assistantButton}>
        <Text style={styles.assistantText}>Chat Assistant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  map: {
    width: '100%',
    height: 200,
  },
  categoriesContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  moreText: {
    color: '#00c4cc',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  assistantButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00c4cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
  },
  assistantText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
