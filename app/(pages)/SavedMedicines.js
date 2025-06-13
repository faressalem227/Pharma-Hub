/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';

import { Navback } from '../../components';

const SavedMedicines = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row">
        <Navback title="Saved Medicines" />
      </View>
    </View>
  );
};

export default SavedMedicines;
