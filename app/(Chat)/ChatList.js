/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity } from 'react-native';
import api from '../../utilities/api';
import { useState, useEffect } from 'react';
import { socket } from './_layout';
import ChatList from '../../components/UI/Chat/ChatList';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import { BottomBar } from '../../components';
function ChatScreen() {
  const [chatData, setChatData] = useState([]);
  const router = useRouter();
  const {
    user: { id },
  } = useGlobalContext();
  const getChatData = async () => {
    try {
      // Simulate fetching chat data
      const response = await api.get('chat');
      const data = setChatData(response.data.data);
      console.log('Chat data:', chatData);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };
  console.log(chatData);

  useEffect(() => {
    socket.emit('joinChatList', { id }, (response) => {
      console.log('Joined chat list:', response);
    });

    socket.on('newMessage', (message) => {
      console.log('New message received:', message);
      getChatData();
    });
    getChatData();
    return () => {
      socket.emit('leaveChatList', { id }, (response) => {
        console.log('Left chat list:', response);
      });
      console.log('Socket listener removed');
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-row-reverse  justify-between bg-white "
        style={{
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icons.pharmaLogo} style={{ width: 24, height: 24, alignSelf: 'center' }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}>
            <Image
              source={icons.leftArrow}
              className=""
              style={{ width: 24, height: 24, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ChatList chats={chatData} />
      <BottomBar />
    </View>
  );
}

export default ChatScreen;
