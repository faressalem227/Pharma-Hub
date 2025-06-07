/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { icons } from '../../constants';

const LogoBar = () => {
  return (
    <View className="bg-white">
      <View style={styles.header}>
        <View style={styles.headerRightContainer}>
          <Image source={icons.pharmaLogo} style={styles.RightImage} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  RightImage: {
    width: 35,
    height: 35,
  },
});

export default LogoBar;
