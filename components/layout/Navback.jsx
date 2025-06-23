/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Navback = ({ title, onNavigate }) => {
  const router = useRouter();
  return (
    <View className="flex-1 flex-row items-center gap-1">
      <TouchableOpacity
        onPress={() => {
          if (onNavigate) onNavigate();
          router.back();
        }}>
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
      <Text className="text-2xl font-bold text-secndryText">{title}</Text>
    </View>
  );
};

export default Navback;
