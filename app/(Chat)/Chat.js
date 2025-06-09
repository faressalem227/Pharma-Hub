/* eslint-disable prettier/prettier */
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { socket } from './_layout';
import ChatScreen from '../../components/UI/Chat/ChatScreen';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import api from '../../utilities/api';
export default function Chat() {
  const { ChatID, UserPhoto, ChatTitle, ReceiverID } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const {
    user: { id: UserID },
  } = useGlobalContext();
  console.log(UserID);
  const router = useRouter();
  const getMessage = async () => {
    try {
      // Simulate fetching messages for the chat
      const response = await api.get(`chat/${ChatID}`);
      setMessages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  console.log(ReceiverID);

  const sendMessage = async (message) => {
    socket.emit(
      'sendMessage',
      { senderID: UserID, receiverID: ReceiverID, message, ChatID },
      (response) => {
        if (!ChatID) {
          ChatID = response.ChatID;
        }
        console.log(response.sentMessage);
        setMessages((prevMessages) => [response.sentMessage, ...prevMessages]);
      }
    );
  };

  useEffect(() => {
    socket.emit('joinChatRoom', { ChatID }, (response) => {
      console.log('Joined chat:', response);
    });
    socket.on('receiveMessage', (message) => {
      console.log('New message received:', message);
      console.log(messages);
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.emit('leaveChatRoom', { ChatID }, (response) => {
        console.log('Left chat:', response);
      });
      socket.off('receiveMessage');
      console.log('Socket listener removed');
    };
  }, [ChatID]);
  useEffect(() => {
    getMessage();
  }, []);
  return (
    <View className="flex-1 bg-white">
      <View className="border-gray-200   gap- flex-row items-center   border-b-[0.4px] border-[#00000004]  px-4 py-6">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}>
          <Image source={icons.leftArrow} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <View className="flex-row items-center">
          {UserPhoto ? (
            <Image
              source={{ uri: UserPhoto }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
          ) : (
            <>
              <Svg
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                  stroke="#595959"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <Path
                  d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493"
                  stroke="#595959"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </>
          )}
          <Text className="">{ChatTitle || 'Chat'}</Text>
        </View>
      </View>

      <ChatScreen messages={messages} UserID={UserID} onSendMessage={sendMessage} />
    </View>
  );
}
