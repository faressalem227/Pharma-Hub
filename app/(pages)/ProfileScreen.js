import React from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/default.jpg')} style={styles.avatar} />
      <Text style={styles.name}>Manar Mahmoud</Text>
      <Text style={styles.email}>Manar.mahmoud@gmail.com</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Saved Locations</Text>
        <Text style={styles.value}>3 Pharmacies</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Preferred Medications</Text>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Notifications</Text>
        <Switch value={true} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Language</Text>
        <Text style={styles.value}>English</Text>
      </View>

      <TouchableOpacity style={styles.logout}>
        <Text style={{ color: '#C62828' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { color: '#888', marginBottom: 20 },
  section: {
    width: '90%',
    backgroundColor: '#F3F3F3',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  label: { fontSize: 16 },
  value: { color: '#666', marginTop: 5 },
  switchRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
  },
  logout: {
    marginTop: 30,
    padding: 10,
  },
});
