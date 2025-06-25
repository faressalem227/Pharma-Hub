/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useGlobalContext } from '../../context/GlobalProvider';
import styles from '../Styles';

//import { useGlobalContext } from "../../context/GlobalProvider";

const Sidebar = ({ isVisible, onClose }) => {
  const router = useRouter();
  const { user, isLogged } = useGlobalContext();

  // Function to handle logout
  const handleLogout = async () => {
    onClose();
    //setIsLogged(false)
    //setUser(null)
    console.log('User logged out');
    router.replace('/');
  };

  return (
    <View style={[styles.sidebar, { left: isVisible ? 0 : -250 }]}>
      <View style={styles.sidebarHeader}>
        <View style={styles.usernameContainer}>
          <Ionicons name="person-circle-outline" size={40} color="#3C9D8D" />
          <Text style={styles.username}>{isLogged ? user?.username : 'Guest'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#3C9D8D" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;
