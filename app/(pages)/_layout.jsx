/* eslint-disable prettier/prettier */
import { Slot } from 'expo-router';
import { View } from 'react-native';

import { BottomBar } from '../../components';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <BottomBar />
    </View>
  );
}
