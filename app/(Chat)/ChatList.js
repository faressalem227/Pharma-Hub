/* eslint-disable prettier/prettier */
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { socket } from './_layout';
import { BottomBar, SearchInput } from '../../components';
import ChatList from '../../components/UI/Chat/ChatList';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import api from '../../utilities/api';

function ChatScreen() {
  const [chatData, setChatData] = useState([]);
  const [filterdChats, setFilterdChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
  const {
    user: { id },
  } = useGlobalContext();

  const getChatData = async () => {
    try {
      // Simulate fetching chat data
      const response = await api.get('chat');
      setChatData(response.data.data);
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

  const handleSearch = () => {};

  useEffect(() => {
    if (chatData) {
      setFilterdChats(chatData);
    }
  }, [chatData]);

  console.log('chats', chatData);

  return (
    <>
      <StatusBar backgroundColor="#288B96" barStyle="light-content" />

      <View id="header" className="gap-4 rounded-b-[60px] bg-mainText p-4">
        <View>
          <View className="flex-row items-center gap-1">
            <TouchableOpacity onPress={() => router.back()}>
              <Svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M16.81 3L7.5 12.31L16.81 21.62"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            <Text className="pt-2 font-tbold text-3xl text-white">Ask the Pharmacist</Text>
          </View>
          <Text className="ml-8 font-tregular text-sm text-white">Find Your Cure</Text>
        </View>

        <View className="mx-auto mb-4 w-[80%] rounded-full bg-white">
          <SearchInput />
        </View>
      </View>

      <View className="flex-1 bg-white p-4">
        <ChatList chats={chatData} />
        <BottomBar />
      </View>
    </>
  );
}

export default ChatScreen;
