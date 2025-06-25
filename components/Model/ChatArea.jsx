/* eslint-disable prettier/prettier */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect, use } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
  Animated,
  Clipboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import EventSource from 'react-native-event-source';
import Markdown from 'react-native-markdown-display';

import { useGlobalContext } from '../../context/GlobalProvider';
import api, { transcripeUrl, streamBaseUrl, sqlUrl } from '../../utilities/api';
import styles from '../Styles';

const ChatArea = ({
  messages,
  setMessages,
  file,
  setFile,
  openCamera,
  openDocumentPicker,
  id,
  ItemType,
}) => {
  const [input, setInput] = useState('');
  //   const [recording, setRecording] = useState(null);
  //   const [isRecording, setIsRecording] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(false); // State for loader visibility
  const [data, setData] = useState(false);
  const [sql, setSql] = useState(false);
  const [imgUrl, setImgUrl] = useState(false);
  const eventSourceRef = useRef(null);
  let type = 0;
  const flatListRef = useRef();
  const { user } = useGlobalContext();

  const closeConnection = (eventSource) => {
    eventSource.close();
    console.log('Connection closed.');
    setLoading(false);
  };

  const sendMessage = async () => {
    if (input === '') return;

    let img = '';
    if (file) {
      const formData = new FormData();
      formData.append('Prescription', {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });

      const response = await fetch(`${transcripeUrl}/pharmacy/prescription`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const result = await response.json();
      console.log(result, 'result');
      setImgUrl(result.prescriptionUrl);
      img = result.prescriptionUrl;
      type = 1;
      console.log(result);

      setFile(false);
      setLoading(false);
    }

    console.log(input, 'input');

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const userMessage = { id: Date.now().toString(), text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);
    console.log(userMessage, 'userMessage');

    const botMessageId = Date.now().toString() + '2';
    let fullResponse = '';

    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: botMessageId, text: '', isUser: false },
      ]);

      const url = `${streamBaseUrl}/chat`;
      console.log(url, 'url');

      console.log(img, 'imgUrl');

      eventSourceRef.current = new EventSource(url, {
        method: 'POST',
        body: JSON.stringify({
          question: input,
          user_id: 1,
          session_id: 3,
          type,
          url: img,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      eventSourceRef.current.addEventListener('message', ({ data }) => {
        console.log('Received data:', data);

        const msgObj = JSON.parse(data);
        console.log(msgObj, 'msgObj');

        fullResponse += msgObj;

        setMessages((prevMessages) => {
          const existingBotMessage = prevMessages.find((message) => message.id === botMessageId);

          if (existingBotMessage) {
            return prevMessages.map((message) =>
              message.id === botMessageId
                ? { ...message, text: (message.text || '') + msgObj }
                : message
            );
          } else {
            return [...prevMessages, { id: botMessageId, text: msgObj, isUser: false }];
          }
        });

        closeConnection(eventSourceRef.current);

        flatListRef.current?.scrollToEnd();
      });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => {
        const existingBotMessage = prevMessages.find((message) => message.id === botMessageId);
        return existingBotMessage
          ? prevMessages.map((message) =>
              message.id === botMessageId
                ? { ...message, text: (message.text || '') + 'An Error Occurred. Try again.' }
                : message
            )
          : [
              ...prevMessages,
              { id: botMessageId, text: 'An Error Occurred. Try again.', isUser: false },
            ];
      });
      setLoading(false);
    }
  };

  useEffect(
    () => {
      return () => {
        if (eventSourceRef.current) eventSourceRef.current.close();
        console.log('Component unmounted, closing connection.');
      };
    },
    [
      /* dependencies */
    ]
  );

  const handleTextCopy = (text) => {
    Clipboard.setString(text);
    alert('Text copied to clipboard!');
  };

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const response = await api.get(`/document/${id}`);
  //         console.log(response.data.data);
  //         setData(response.data.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getData()
  //   }, [])

  const renderMessage = ({ item }) => {
    return (
      <View>
        {item.isUser ? (
          <View
            style={[
              styles.messageContainer,
              { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
            ]}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-circle-outline" size={24} color="#3C9D8D" />
            </View>
            <Text style={[styles.messageText, { color: '#FFFFFF', backgroundColor: '#3C9D8D' }]}>
              <Markdown style={{ body: { fontSize: 16, color: '#FFFFFF' } }}>{item.text}</Markdown>
            </Text>
            <TouchableOpacity onPress={() => handleTextCopy(item.text)}>
              <Ionicons name="copy" size={20} color="#3C9D8D" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        ) : item.text === 'Loading...' ? (
          <View
            style={[styles.messageContainer, { alignSelf: 'flex-start', flexDirection: 'row' }]}>
            <MaterialIcons name="smart-toy" size={24} color="#3C9D8D" />
            <ActivityIndicator size="small" color="#3C9D8D" />
          </View>
        ) : item.role === 'doc' ? (
          <View style={styles.iconContainer}>
            <Ionicons name="document-text" size={24} color="#3C9D8D" />
          </View>
        ) : (
          <View
            style={[styles.messageContainer, { alignSelf: 'flex-start', flexDirection: 'row' }]}>
            <MaterialIcons name="smart-toy" size={24} color="#3C9D8D" />
            <Text style={[styles.messageText, { color: '#FFFFFF' }]}>
              <Markdown style={{ body: { fontSize: 16, color: '#000' } }}>{item.text}</Markdown>
            </Text>
            <TouchableOpacity onPress={() => handleTextCopy(item.text)}>
              <Ionicons name="copy" size={20} color="#3C9D8D" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.chatArea}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputWithMic}>
          <TouchableOpacity onPress={openCamera} style={styles.iconContainer}>
            <MaterialIcons name="photo-camera" size={24} color="#3C9D8D" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openDocumentPicker} style={styles.iconContainer}>
            <MaterialIcons name="attach-file" size={24} color="#3C9D8D" />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { textAlignVertical: 'center', paddingVertical: 8 }]}
            placeholder="Type a message..."
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
            multiline
            numberOfLines={4}
          />
        </View>

        <Pressable
          onPressIn={() => {
            if (loading) {
            }
          }}
          //   onPressOut={handleMicPressOut}
          onPress={sendMessage}
          disabled={loading}
          style={({ pressed }) => [styles.sendButton, pressed && { opacity: 0.8, scale: 1.5 }]}
          className="mr-2 items-center justify-center rounded-full bg-[#3C9D8D] p-3">
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons name="send" size={18} color="#fff" />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};
export default ChatArea;
