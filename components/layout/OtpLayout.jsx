/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

import Loader from '../UI/Loader';
import MainButton from '../UI/MainButton';

const OtpLayout = ({ onChange = () => {}, onSubmit = () => {}, isLoading, email }) => {
  return (
    <View>
      <View className="my-14 items-center gap-2 p-4">
        <Text className="font-tbold text-4xl font-bold text-secndryText">Verify code</Text>
        <Text className="text-center text-lg font-semibold text-secndryText">{`A confirmation code has been sent to  ${email} `}</Text>
        <Text className="font-semibold  text-secndryText">check your email</Text>
      </View>
      <OtpInput
        numberOfDigits={5}
        autoFocus
        blurOnFilled
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onTextChange={(val) => onChange(val)}
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
          placeholderTextStyle: styles.placeholderText,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
        }}
      />

      <View className="mt-4">
        <MainButton title="Confirm" isLoading={isLoading} handlePress={onSubmit} />
      </View>
    </View>
  );
};

export default OtpLayout;

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  pinCodeContainer: {
    width: 50,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#595959',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  focusedPinCodeContainer: {
    borderColor: '#288B96', // Highlight color
    borderWidth: 2,
  },

  filledPinCodeContainer: {
    borderColor: '#24838D',
    backgroundColor: '#e6f6f8',
  },

  disabledPinCodeContainer: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },

  pinCodeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  placeholderText: {
    fontSize: 24,
    color: '#aaa',
  },

  focusStick: {
    width: 2,
    height: 20,
    backgroundColor: '#595959',
    marginTop: 8,
  },
});
