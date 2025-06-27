/* eslint-disable prettier/prettier */
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { io } from 'socket.io-client';

import { useGlobalContext } from '../../context/GlobalProvider';
import { WebSocketServer } from '../../utilities/api';

export const socket = io(WebSocketServer, {
  transports: ['websocket'],
  autoConnect: true,
});

export default function Layout() {
  console.log(WebSocketServer);
  const router = useRouter();
  const {
    user: { id },
  } = useGlobalContext();

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
