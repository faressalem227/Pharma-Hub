/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useGlobalContext } from '../../context/GlobalProvider';

export default function ProfileScreen() {
  const { isLogged, logOut, user } = useGlobalContext();

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await logOut();
      if (response) {
        router.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 items-center bg-white p-4">
      <View className="flex-row">
        <View className="flex-1 flex-row items-center gap-1">
          <TouchableOpacity onPress={() => router.back()}>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M16.81 3L7.5 12.31L16.81 21.62"
                stroke="#595959"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          <Text className="text-secndryText text-2xl font-bold">Profile</Text>
        </View>
      </View>

      <View className="mt-5 items-center">
        <Image source={require('../../assets/images/default.jpg')} style={styles.avatar} />
        <Text style={styles.name}>{isLogged ? user?.username : 'Manar Mahmoud'}</Text>
        <Text style={styles.email}>{isLogged ? user?.email : 'Manar.mahmoud@gmail.com'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Saved Locations</Text>
        <Text style={styles.value}>3 Pharmacies</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Preferred Medications</Text>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Notifications</Text>
        <Switch value />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Language</Text>
        <Text style={styles.value}>English</Text>
      </View>

      <TouchableOpacity style={styles.logout} onPress={() => handleLogOut()}>
        <Text style={{ color: '#C62828' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
