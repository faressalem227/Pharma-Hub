import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BottomBar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconWrapper} onPress={() => router.navigate('/HomeScreen')}>
        <Ionicons name="home" size={24} color="#24828D" />
        <Text style={styles.label}></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconWrapper} onPress={() => router.navigate('/categories')}>
        <FontAwesome5 name="pills" size={20} color="#24828D" />
        <Text style={styles.label}></Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.searchIconWrapper}
        onPress={() => router.navigate('/SearchScreen')}>
        <Ionicons name="search" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => router.navigate('/notifications')}>
        <Ionicons name="notifications" size={22} color="#24828D" />
        <Text style={styles.label}></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconWrapper} onPress={() => router.navigate('/MoreScreen')}>
        <Ionicons name="menu" size={26} color="#24828D" />
        <Text style={styles.label}></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 5,
    position: 'absolute',
    bottom: 11,
    left: 11,
    right: 11,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 6,
  },
  label: {
    fontSize: 11,
    color: '#017B74',
    marginTop: 2,
  },
  searchIconWrapper: {
    backgroundColor: '#017B74',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
});
