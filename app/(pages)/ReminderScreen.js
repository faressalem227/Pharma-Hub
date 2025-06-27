/* eslint-disable prettier/prettier */
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';

import { Navback, Loader } from '../../components';
import api from '../../utilities/api';

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

export default function ReminderScreen() {
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('');
  const [newMed, setNewMed] = useState({
    DrugName: '',
    IsRepeated: true,
    hours: [],
  });

  const [id, setID] = useState(0);
  const [notificationId, setNotificationId] = useState(null); // NEW

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const getReminders = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('drugSchedule');
      setReminders(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission denied', 'You must enable notifications to receive reminders.');
    }
  };

  const scheduleAlarm = async () => {
    const [hour, minute] = newMed.hours;

    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(hour);
    targetTime.setMinutes(minute);
    targetTime.setSeconds(0);

    // If the time has already passed today, schedule for tomorrow
    if (targetTime <= now) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: '💊 Medicine Reminder',
        body: `Time to take your medicine: ${newMed.DrugName}`,
        sound: true,
        android: {
          channelId: 'default',
          icon: 'notification-icon',
        },
      },
      trigger: targetTime, // <-- use Date object
    });

    setNotificationId(id);
  };

  const resetForm = () => {
    setStep('');
    setNewMed({ DrugName: '', IsRepeated: true, hours: [] });
    setTime(new Date());
    setID(0);
    setNotificationId(null);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await api.post('drugSchedule', newMed);

      await scheduleAlarm();

      resetForm();
      await getReminders();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);

      // Cancel old notification if needed
      if (notificationId) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
      }

      await api.put('drugSchedule', {
        ...newMed,
        ScheduleDrugID: id,
      });

      await scheduleAlarm();

      resetForm();
      await getReminders();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await api.delete(`drugSchedule?ScheduleDrugID=${id}`);
      resetForm();
      await getReminders();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestNotificationPermissions();
    getReminders();
  }, []);

  console.log(newMed);

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row">
        <Navback>
          <View className="flex-row">
            <Text className="text-2xl font-bold text-secndryText">Med</Text>
            <Text className="text-2xl font-bold text-mainText">Reminder</Text>
          </View>
        </Navback>
      </View>

      {!isLoading && (
        <>
          {!step && (
            <View className="relative mt-4 flex-1 ">
              <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 ">
                {reminders?.map((reminder, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => {
                      setID(reminder.ScheduleDrugID);
                      setNewMed({
                        DrugName: reminder.DrugName,
                        IsRepeated: reminder.IsRepeated,
                        hours: [
                          new Date(reminder.ScheduleTime).getHours(),
                          new Date(reminder.ScheduleTime).getMinutes(),
                        ],
                      });
                      setTime(new Date(reminder.ScheduleTime));
                      setStep('new');
                    }}>
                    <Text className="font-tbold text-lg text-white">
                      {formatTime(new Date(reminder.ScheduleTime))}
                    </Text>

                    <View style={[styles.row, { marginTop: 10 }]}>
                      <MaterialCommunityIcons
                        name="pill"
                        size={40}
                        color="#fff"
                        style={{ marginRight: 6 }}
                      />
                      <Text className="font-tbold text-lg text-white">{reminder.DrugName}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.fab} onPress={() => setStep('new')}>
                <Ionicons name="add" size={28} color="#3C9D8D" />
              </TouchableOpacity>
            </View>
          )}

          {step === 'new' && (
            <View className="flex-1">
              <Text style={styles.title}>What medicine do you want to add?</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter medicine name"
                placeholderTextColor="#aaa"
                value={newMed?.DrugName}
                onChangeText={(val) =>
                  setNewMed((prev) => ({
                    ...prev,
                    DrugName: val,
                  }))
                }
              />

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: newMed?.DrugName?.trim() === '' ? '#aaa' : '#3C9D8D',
                  },
                ]}
                onPress={() => setStep('time')}
                disabled={newMed?.DrugName?.trim() === ''}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>

              {id > 0 && (
                <TouchableOpacity
                  className="mt-3 w-[30%] self-center rounded-[20px] bg-red-500 p-3"
                  onPress={handleDelete}>
                  <Text className="text-center text-white">Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {step === 'time' && (
            <View className="flex-1">
              <Text style={styles.timeTitle}>Set Time</Text>

              <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeDisplay}>
                <Text style={styles.timeText}>{formatTime(time)}</Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={false}
                  display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
                  onChange={(event, selectedDate) => {
                    if (event.type === 'set' && selectedDate) {
                      setTime(selectedDate);
                      setNewMed((prev) => ({
                        ...prev,
                        hours: [selectedDate.getHours(), selectedDate.getMinutes()],
                      }));
                    }
                    setShowPicker(false);
                  }}
                />
              )}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#3C9D8D' }]}
                className="mt-5"
                onPress={id > 0 ? handleEdit : handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <Loader isLoading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... same as before
  card: {
    marginHorizontal: 'auto',
    backgroundColor: '#3C9D8D',
    borderRadius: 25,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    width: '80%',
    height: 150,
    marginBottom: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#3C9D8D',
    borderRadius: 18,
    padding: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 30,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 30,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#F2F2F2',
  },
  button: {
    backgroundColor: '#3C9D8D',
    padding: 12,
    borderRadius: 20,
    width: '30%',
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  timeTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 30,
    color: '#333',
  },
  timeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3C9D8D',
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
});
