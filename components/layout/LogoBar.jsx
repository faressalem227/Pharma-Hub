/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { icons } from '../../constants';

const LogoBar = () => {
  return (
    <View className="bg-mainBg flex-1">
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <Image
            source={icons.hwwc}
            style={styles.LeftImage}
            resizeMode="contain"
            className="h-6 w-6"
          />
        </View>
        <View style={styles.headerRightContainer}>
          <Image source={icons.pharmaLogo} style={styles.RightImage} resizeMode="contain" />
        </View>
      </View>
      {/* Rest of the component content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    height: 58,
  },
  headerLeftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  LeftImage: {
    width: 60,
    height: 60,
  },
  RightImage: {
    width: 48,
    height: 48,
  },
});

export default LogoBar;
