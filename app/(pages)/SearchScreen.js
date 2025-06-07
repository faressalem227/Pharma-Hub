/* eslint-disable prettier/prettier */
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.arrow}>
        <Ionicons name="arrow-back" size={21} color="#24828D" style={{ marginHorizontal: 5 }} />
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={{ marginHorizontal: 5 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for medications or pharmacies..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="mic" size={20} color="#24828D" style={{ marginHorizontal: 10 }} />
        <Ionicons name="camera" size={20} color="#24828D" style={{ marginRight: 10 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <Text style={styles.sectionTitle}>Search by categories</Text>
        <View style={styles.rowWrap}>
          {[
            '💊 Pain Relievers',
            '🤧 Cold & Allergy Medications',
            '🦠 Antibiotics',
            'Blood Pressure & Heart Medications',
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.categoryBtn}>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Search by Active Ingredient</Text>
        <View style={styles.rowWrap}>
          {['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Metformin', 'Cetirizine', 'Omeprazole'].map(
            (item, index) => (
              <TouchableOpacity key={index} style={styles.ingredientBtn}>
                <Text style={styles.ingredientText}>{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <Text style={styles.sectionTitle3}>Search by Manufacturer</Text>
        <View style={styles.rowWrap3}>
          {[
            {
              name: 'Popular Medications',
              description: 'Painkillers, cold medicine, allergy medicine',
              img: require('../../assets/images/baby.png'),
            },
            {
              name: 'Baby Products',
              description: 'Diapers, wipes, baby lotion',
              img: require('../../assets/images/baby.png'),
            },
            {
              name: 'Personal Care',
              description: 'Shampoo, soap, toothpaste',
              img: require('../../assets/images/default.jpg'),
            },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.manufacturerCardNew}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.description}</Text>
              </View>
              <Image source={item.img} style={styles.cardImageNew} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4EFEF',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  arrow: {
    marginBottom: -40,
    marginLeft: 1,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: -10,
    marginBottom: 20,
    marginLeft: 30,
  },
  searchInput: {
    flex: 1,
    fontSize: 14.5,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    top: -15,
    color: '#24828D',
  },
  sectionTitle3: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#24828D',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: -13,
  },
  rowWrap3: {
    flexWrap: 'wrap',
  },
  categoryBtn: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 11,
    borderRadius: 10,
    marginBottom: 11,
    width: '48%',
  },
  categoryText: {
    fontSize: 14.3,
    color: '#24828D',
    top: 3,
    textAlign: 'center',
    fontWeight: '500',
  },
  ingredientBtn: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '30%',
  },
  ingredientText: {
    fontSize: 14.3,
    textAlign: 'center',
    color: '#24828D',
    fontWeight: '500',
  },
  manufacturerCardNew: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#24828D',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7B8C',
    marginTop: 4,
  },
  cardImageNew: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 75,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    paddingHorizontal: 15,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  searchButton: {
    position: 'absolute',
    top: -30,
    backgroundColor: '#24828D',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: 12,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
