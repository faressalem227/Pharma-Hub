/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';

import { Navback } from '../../components';

const SavedPahrmaciesScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row">
        <Navback title="Saved Pahrmacies" />
      </View>
    </View>
  );
};

export default SavedPahrmaciesScreen;
