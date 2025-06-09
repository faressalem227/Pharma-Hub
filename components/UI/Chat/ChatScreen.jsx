import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from 'react-native';
import { FlatList } from 'react-native';
export default function ChatScreen({ messages, onSendMessage, UserID }) {
  const [newMessage, setNewMessage] = useState('');
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    onSendMessage(newMessage);
    setNewMessage('');
  };
  const flatListRef = useRef(null);
  console.log(Platform.OS);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined} // Adjust based on your platform
      enabled
      style={{ flex: 1 }}
      keyboardVerticalOffset={50}>
      <FlatList
        data={messages} // Reverse to show the latest message at the bottom
        scrollEnabled={true}
        snapToEnd={true}
        ref={flatListRef}
        style={styles.chatContainer}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item: msg }) => (
          <View
            style={[
              styles.messageContainer,
              msg.Sender == UserID ? styles.sentMessage : styles.receivedMessage,
            ]}>
            {/* <Text style={styles.sender}>{msg.SenderName}</Text> */}
            <Text style={styles.text}>{msg.Message}</Text>
            <View style={styles.metadata}>
              <Text style={styles.timestamp}>
                {' '}
                {new Date(msg.TimeStamp)
                  ?.toLocaleTimeString({
                    hour12: true,
                    region: 'en-US',
                  })
                  .slice(0, 4) +
                  new Date(msg.TimeStamp)
                    ?.toLocaleTimeString({
                      hour12: true,
                      region: 'en-US',
                    })
                    .slice(7)}
              </Text>
              {msg.Sender === UserID && (
                <Text style={styles.readStatus}>{msg.IsRead ? '✓✓' : '✓'}</Text>
              )}
            </View>
          </View>
        )}
        // contentContainerStyle={styles.chatContainer}

        maxToRenderPerBatch={10}
        initialNumToRender={10}
        inverted

        // onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
        // onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    minWidth: '40%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 10,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
  readStatus: {
    fontSize: 12,
    color: 'blue',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#075E54',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
