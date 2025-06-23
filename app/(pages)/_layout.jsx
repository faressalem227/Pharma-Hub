/* eslint-disable prettier/prettier */
import { Slot, usePathname } from 'expo-router';
import { View } from 'react-native';

import { BottomBar } from '../../components';

export default function Layout() {
  const pathname = usePathname();

  const hideBottomBar = pathname === '/SplashRScreen';
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {!hideBottomBar && <BottomBar />}
    </View>
  );
}
