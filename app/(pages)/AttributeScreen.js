/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { Navback, CheckBox } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';
import api from '../../utilities/api';

const AttributeItem = ({ item, index, size, handleCheck }) => {
  return (
    <View
      className={`flex-row items-center justify-between py-4 ${index !== size - 1 ? 'border-b border-b-borderGray' : ''}`}
      key={item.ID}>
      <CheckBox />
      <Text className="font-tregular text-lg text-secndryText">{item.SubstanceName}</Text>
    </View>
  );
};

const AttributeScreen = () => {
  const { user } = useGlobalContext();

  const handleGetAttirbuteList = async () => {
    try {
      const response = await api.get();
    } catch (error) {}
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row">
        <Navback title="Attributes of Health" />
      </View>

      <View>
        <FlatList />
      </View>
    </View>
  );
};

export default AttributeScreen;
