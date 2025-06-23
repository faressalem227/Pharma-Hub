/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export default function SetTimeScreen() {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  const selectedDays = params.days ? JSON.parse(params.days) : [];

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker(false);
    setTime(currentTime);
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleDone = async () => {
    const formattedTime = formatTime(time);

    const newReminder = {
      time: formattedTime,
      name: 'Paracetamol',
      details: '1 Pill   Before Food',
      days: selectedDays,
    };

    try {
      const existing = await AsyncStorage.getItem('reminders');
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [...parsed, newReminder];
      await AsyncStorage.setItem('reminders', JSON.stringify(updated));
      router.push('/ReminderScreen');
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.logoText}>
          Med<Text style={styles.logoHighlight}>Reminder</Text>
        </Text>
      </View>
      <View style={styles.divider} />

      <Text style={styles.title}>Set Time</Text>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeDisplay}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <Ionicons name="home-outline" size={24} color="#777" />
        <Ionicons name="search-outline" size={24} color="#777" />
        <Ionicons name="ellipsis-horizontal-circle-outline" size={28} color="#3C9D8D" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  divider: { height: 3, backgroundColor: '#E0E0E0', marginBottom: 10 },
  logoText: { fontSize: 18, fontWeight: '600', color: '#222', paddingLeft: 80 },
  logoHighlight: { color: '#3C9D8D' },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 30,
    color: '#333',
  },
  timeDisplay: {
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: '#3C9D8D',
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3C9D8D',
  },
  button: {
    backgroundColor: '#3C9D8D',
    padding: 12,
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  bottomBar: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
