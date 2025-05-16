import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const items = [
  { label: 'Profile', path: './ProfileScreen' },
  { label: 'Order History', path: '/orders' },
  { label: 'Health Tips & Articles', path: '/articles' },
  { label: 'Support', path: '/support' },
  { label: 'Rate App', path: '/rate' },
  { label: 'About', path: '/about' },
];
export default function MoreScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#017B74" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>More</Text>
      </View>

      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item} onPress={() => router.push(item.path)}>
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4EFEF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#017B74',
  },
  item: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});
