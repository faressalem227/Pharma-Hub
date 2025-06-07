/* eslint-disable prettier/prettier */
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';
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

export default function NotificationsScreen() {
  const notifications = [
    "Medical Tip: If you're taking Creator 400mg, make sure to follow the recommended instructions from your doctor.",
    'Still looking for Volcanex 500mg? Tap here to see the nearest available pharmacies.',
    'Stock updated Zyrtec 10mg in now available in nearby pharmacies.',
    'The medicine you searched for, Revised Extra, is unavailable. But we have alternative options new you!',
    "Reminder: It's time for your dose of discerbage 500mg. Don't forget to take it on time!",
    'Did you know? You can check cheaper alternatives for Creator 10mg with the same active ingredient!',
    'Still looking for (Cortava 400)? Tap here to see the nearest available pharmacies.',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {notifications.map((notification, index) => (
        <TouchableOpacity key={index} style={styles.notificationCard}>
          <Text style={styles.notificationText}>{notification}</Text>
        </TouchableOpacity>
      ))}

      <Link href="/" style={styles.backLink}>
        <Text style={styles.backLinkText}>Back to Home</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  notificationText: {
    fontSize: 16,
  },
  backLink: {
    marginTop: 20,
    padding: 10,
  },
  backLinkText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
