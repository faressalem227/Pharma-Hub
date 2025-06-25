/* eslint-disable prettier/prettier */
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { io } from 'socket.io-client';

import { useGlobalContext } from '../../context/GlobalProvider';
import { API_BASE_URL } from '../../utilities/api';
export const socket = io(API_BASE_URL?.split('/api')?.[0], {
  transports: ['websocket'],
  autoConnect: true,
});

export default function Layout() {
  const router = useRouter();
  const {
    user: { id },
  } = useGlobalContext();

  console.log(id);
  useEffect(() => {
    socket.emit(
      'register',
      {
        UserID: id,
      },
      (response) => {
        console.log('Registration response:', response);
      }
    );

    return () => {
      console.log('Disconnecting from socket server...');
      socket.emit('diconnect', { UserID: id }, (response) => {
        console.log('Disconnection response:', response);
      });
    };
  }, [id]);
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}
