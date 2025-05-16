/* eslint-disable prettier/prettier */
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
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

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Categories</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Baby Products</Text>
        <Text style={styles.sectionContent}>Baby Product Management</Text>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Personal Care</Text>
          <Text style={styles.subsectionContent}>Personal Care Services</Text>
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Popular Medications</Text>
          <Text style={styles.subsectionContent}>Personal Care Services</Text>
        </View>
      </View>

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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  subsection: {
    marginLeft: 15,
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  subsectionContent: {
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
