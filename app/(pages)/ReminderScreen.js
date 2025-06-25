/* eslint-disable prettier/prettier */
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
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
    isRepeated: true,
    houres: [],
  });

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

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await api.post('drugSchedule', newMed);
      setNewMed({
        DrugName: '',
        isRepeated: true,
        houres: [],
      });

      setStep('');
      setNewMed({
        DrugName: '',
        isRepeated: true,
        houres: [],
      });

      console.log(response.data);

      await getReminders();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.put('drugSchedule', {
        ...newMed,
        ScheduleDrugID: id,
      });

      setStep('');
      setNewMed({
        DrugName: '',
        isRepeated: true,
        houres: [],
      });

      await getReminders();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.delete(`drugSchedule?ScheduleDrugID=${id}`);

      await getReminders();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReminders();
  }, []);

  // console.log(newMed);

  console.log(reminders);

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
            <View className="relative flex-1">
              <ScrollView>
                {reminders?.map((reminder, index) => (
                  <View key={index} style={styles.card}>
                    <View style={styles.row}>
                      <Text style={styles.time}>{reminder.time}</Text>
                    </View>
                    <View style={[styles.row, { marginTop: 10 }]}>
                      <MaterialCommunityIcons
                        name="pill"
                        size={25}
                        color="#fff"
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.medName}>{reminder.name}</Text>
                    </View>
                    <Text style={styles.details}>{reminder.details}</Text>
                  </View>
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

              <TouchableOpacity style={styles.button} onPress={() => setStep('time')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
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
                  onChange={(_e, val) => {
                    setTime(val);
                    setNewMed((prev) => ({
                      ...[prev],
                      hours: [val.getHours(), val.getMinutes()],
                    }));
                    setShowPicker(false);
                  }}
                />
              )}

              <TouchableOpacity style={styles.button} className="mt-5" onPress={handleSave}>
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
  iconWrapper: { marginRight: 8 },
  logoText: { fontSize: 18, fontWeight: '600', color: '#222', paddingLeft: 95 },
  logoHighlight: { color: '#00A896' },
  greeting: { fontSize: 16, color: '#555' },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#3C9D8D',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    width: '100%',
    marginBottom: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  time: { fontSize: 14, color: '#fff', fontWeight: '700' },
  medName: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  details: { fontSize: 13, color: '#E6F5F2', marginTop: 8, marginLeft: 26 },
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
