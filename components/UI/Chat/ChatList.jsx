/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useGlobalContext } from '../../../context/GlobalProvider';
const ChatList = ({ chats, onChatPress }) => {
  const router = useRouter();

  const {
    user: { id },
  } = useGlobalContext();
  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        router.navigate({
          pathname: '/Chat',
          params: {
            ChatID: item.ChatID,
            ChatTitle: item.ChatTitle,
            UserPhoto: item.UserPhoto,
            ReceiverID: item.ReceiverID,
          },
        })
      }>
      {item.UserPhoto ? (
        <Image source={{ uri: item.UserPhoto }} style={styles.avatar} />
      ) : (
        <>
          <Svg
            style={styles.avatar}
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
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.ChatTitle}</Text>
          <Text style={styles.timestamp}>
            {new Date(item.LastMessageDate)
              ?.toLocaleTimeString({
                hour12: true,
                region: 'en-US',
              })
              .slice(0, 4) +
              new Date(item.LastMessageDate)
                ?.toLocaleTimeString({
                  hour12: true,
                  region: 'en-US',
                })
                .slice(7)}
          </Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.SenderName}: {item.Message}
        </Text>
      </View>
      {item.IsRead == 0 && item.LastReciverID == id ? <View style={styles.unreadBadge} /> : <></>}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.ChatID.toString()}
      contentContainerStyle={styles.chatList}
    />
  );
};

const styles = StyleSheet.create({
  chatList: {
    backgroundColor: 'white',
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 8,
    marginTop: 8,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ChatList;
