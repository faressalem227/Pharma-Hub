/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import styles from '../Styles';
const Navbar = ({ onOpenSidebar, showChatIcon = true, onNewChat }) => {
  const [isOnDropdownPage, setIsOnDropdownPage] = useState(false);
  const router = useRouter();

  const handleBackAndLogin = () => {
    router.back();
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onOpenSidebar}>
        <Ionicons name="menu-outline" size={28} color="#3C9D8D" />
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
        {showChatIcon && (
          <TouchableOpacity onPress={onNewChat}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={28}
              color="#3C9D8D"
              style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleBackAndLogin} style={customStyles.roundedIcon}>
          <Ionicons name="arrow-forward-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const customStyles = StyleSheet.create({
  roundedIcon: {
    backgroundColor: '#3C9D8D',
    borderRadius: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navbar;
