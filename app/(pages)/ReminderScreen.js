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
import Svg, { Path } from 'react-native-svg';

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
  });

  const [hours, setHours] = useState([]);

  const [id, setID] = useState(0);
  const [notificationId, setNotificationId] = useState(null); // NEW

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

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
    const now = new Date();

    const notificationIds = [];

    for (const [hour, minute] of hours) {
      const targetTime = new Date();
      targetTime.setHours(hour);
      targetTime.setMinutes(minute);
      targetTime.setSeconds(0);
      targetTime.setMilliseconds(0);

      // If the time has already passed today, schedule for tomorrow
      if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Medicine Reminder',
          body: `Time to take your medicine: ${newMed.DrugName}`,
          sound: true,
        },
        trigger: targetTime, // Schedule for specific future time
      });

      notificationIds.push(id);
    }

    setNotificationId(notificationIds); // Save all IDs for potential canceling
  };

  const resetForm = () => {
    setStep('');
    setNewMed({ DrugName: '', IsRepeated: true });
    setHours([]);
    setTime(new Date());
    setID(0);
    setNotificationId(null);
  };

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

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await api.post('drugSchedule', { ...newMed, hours });

      await scheduleAlarm();

      console.log(response.data);

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
        ScheduleDrugID: id,
        ...newMed,
        hours,
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

  // console.log(newMed);

  console.log(hours);

  // console.log(reminders);

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
                      });
                      setHours(reminder.hours);
                      setTime(new Date(reminder.ScheduleTime));
                      setStep('new');
                    }}>
                    <View className="flex-row items-center gap-2">
                      {reminder.hours.map((item, index) => {
                        const hour = item[0];
                        const minute = item[1].toString().padStart(2, '0');
                        const ampm = hour >= 12 ? 'PM' : 'AM';
                        const formattedHour = hour % 12 || 12;

                        return (
                          <Text key={index} className="font-tbold text-lg text-white">
                            {`${formattedHour}:${minute} ${ampm}`}
                          </Text>
                        );
                      })}
                    </View>

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
              <Text style={styles.timeTitle}>Set Reminder Times</Text>

              {/* + Add Time Button */}
              <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeDisplay}>
                <Text style={styles.timeText}>+ Add Time</Text>
              </TouchableOpacity>

              {/* Show all selected times */}

              <View className="items-center gap-2">
                {hours.map(([hour, minute], index) => {
                  const formattedHour = hour % 12 || 12;
                  const paddedMinute = minute.toString().padStart(2, '0');
                  const ampm = hour >= 12 ? 'PM' : 'AM';

                  return (
                    <View key={index} className="flex-row items-center gap-3">
                      <Text className="font-tregular text-lg  text-mainText">{`${formattedHour}:${paddedMinute} ${ampm}`}</Text>

                      {/* Remove button */}
                      <TouchableOpacity
                        onPress={() => {
                          setHours((prev) => prev.filter((_, i) => i !== index));
                        }}
                        style={styles.removeTimeButton}>
                        <Svg
                          width="15"
                          height="15"
                          viewBox="0 0 20 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <Path
                            d="M3.75 23.25C3.0625 23.25 2.47417 23.0054 1.985 22.5163C1.49584 22.0271 1.25084 21.4383 1.25 20.75V4.5C0.895838 4.5 0.599171 4.38 0.360004 4.14C0.120838 3.9 0.000837644 3.60333 4.31034e-06 3.25C-0.000829023 2.89667 0.119171 2.6 0.360004 2.36C0.600838 2.12 0.897504 2 1.25 2H6.25C6.25 1.64583 6.37001 1.34917 6.61 1.11C6.85001 0.870833 7.14667 0.750833 7.5 0.75H12.5C12.8542 0.75 13.1513 0.87 13.3913 1.11C13.6313 1.35 13.7508 1.64667 13.75 2H18.75C19.1042 2 19.4013 2.12 19.6413 2.36C19.8813 2.6 20.0008 2.89667 20 3.25C19.9992 3.60333 19.8792 3.90042 19.64 4.14125C19.4008 4.38208 19.1042 4.50167 18.75 4.5V20.75C18.75 21.4375 18.5054 22.0263 18.0163 22.5163C17.5271 23.0063 16.9383 23.2508 16.25 23.25H3.75ZM7.5 18.25C7.85417 18.25 8.15126 18.13 8.39126 17.89C8.63126 17.65 8.75084 17.3533 8.75 17V8.25C8.75 7.89583 8.63 7.59917 8.39001 7.36C8.15 7.12083 7.85334 7.00083 7.5 7C7.14667 6.99917 6.85001 7.11917 6.61 7.36C6.37001 7.60083 6.25 7.8975 6.25 8.25V17C6.25 17.3542 6.37001 17.6512 6.61 17.8912C6.85001 18.1312 7.14667 18.2508 7.5 18.25ZM12.5 18.25C12.8542 18.25 13.1513 18.13 13.3913 17.89C13.6313 17.65 13.7508 17.3533 13.75 17V8.25C13.75 7.89583 13.63 7.59917 13.39 7.36C13.15 7.12083 12.8533 7.00083 12.5 7C12.1467 6.99917 11.85 7.11917 11.61 7.36C11.37 7.60083 11.25 7.8975 11.25 8.25V17C11.25 17.3542 11.37 17.6512 11.61 17.8912C11.85 18.1312 12.1467 18.2508 12.5 18.25Z"
                            fill="#CF4A4A"
                          />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>

              {/* Time Picker */}
              {showPicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={false}
                  display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
                  onChange={(event, selectedDate) => {
                    if (event.type === 'set' && selectedDate) {
                      const newTime = [selectedDate.getHours(), selectedDate.getMinutes()];
                      setTime(selectedDate);

                      // Optional: prevent duplicates
                      setHours((prev) => {
                        const exists = prev.some(([h, m]) => h === newTime[0] && m === newTime[1]);
                        if (!exists) {
                          return [...prev, newTime].sort(
                            (a, b) => a[0] * 60 + a[1] - (b[0] * 60 + b[1])
                          );
                        }
                        return prev;
                      });
                    }
                    setShowPicker(false);
                  }}
                />
              )}

              {/* Save Button */}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#3C9D8D' }]}
                className="mt-5"
                onPress={id > 0 ? handleEdit : handleSave}
                disabled={hours.length === 0}>
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
