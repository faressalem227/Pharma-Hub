/* eslint-disable prettier/prettier */
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

import ChatArea from '../../components/Model/ChatArea';
import Navbar from '../../components/Model/Navebar';
import Sidebar from '../../components/Model/Sidebar';

export default function ChatPage() {
  const [file, setFile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { id, ItemType } = useLocalSearchParams();
  const [sessionID, setSessionID] = useState(new Date().getTime().toString());
  const router = useRouter();

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission is required to use this feature.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    setFile({
      uri: result.assets[0].uri,
      mimeType: result.assets[0].mimeType,
      name: result.assets[0].fileName,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now().toString(), text: result.assets[0].fileName, isUser: true },
    ]);

    if (!result.canceled) {
      console.log('Image URI:', result.assets[0].uri);
    }
  };

  const openDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if (result.canceled === false) {
      console.log('Picked document URI:');
      setFile(result.assets[0]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: `📄${result.assets[0].name}`, isUser: true },
      ]);
      console.log(result.assets[0]);
    }
  };

  const handleOutsidePress = () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const clearMessages = () => {
    setMessages([]);
    setSessionID(new Date().getTime().toString());
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1 }}>
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} onNewChat={clearMessages} />
        {isSidebarOpen && (
          <Sidebar isVisible={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
        <ChatArea
          messages={messages}
          setMessages={setMessages}
          openCamera={openCamera}
          openDocumentPicker={openDocumentPicker}
          file={file}
          setFile={setFile}
          sessionID={sessionID}
          id={id}
          ItemType={ItemType}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
