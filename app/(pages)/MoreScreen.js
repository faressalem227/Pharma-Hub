/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const items = [
  { label: 'Profile', path: './ProfileScreen' },
  { label: 'Allergies', path: '/AllergiesScreen' },
  { label: 'Attribute of health', path: '/AttributeScreen' },
  // { label: 'Support', path: '/support' },
  // { label: 'Rate App', path: '/rate' },
  // { label: 'About', path: '/about' },
];
export default function MoreScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-3 font-tbold text-2xl text-secndryText">More</Text>

      <ScrollView className="flex gap-3">
        {items.map((item, index) => (
          <TouchableOpacity
            className={`py-4 ${index !== items.length - 1 ? 'border-b border-b-borderGray' : ''}`}
            key={index}
            onPress={() => router.push(item.path)}>
            <Text className="font-tregular text-lg text-secndryText">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
