/* eslint-disable prettier/prettier */
import moment from 'moment-timezone';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Calender from '../../assets/images/calender.png';

const DatePickerInput = ({ onChange, setDate, title, defaultDate, birthday = false, style }) => {
  const [selectedDate, setSelectedDate] = useState(
    defaultDate ? new Date(defaultDate) : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (date) => {
    setShowPicker(false);
    const cairoTime = moment(date).tz('Africa/Cairo').format('YYYY-MM-DD HH:mm:s');
    setSelectedDate(date);
    setDate && setDate(cairoTime);
    onChange && onChange(cairoTime);
  };

  useEffect(() => {
    const date = defaultDate ? new Date(defaultDate) : new Date();
    handleConfirm(date);
  }, []);

  return (
    <View className={`gap-2.5 ${style}`}>
      {title && (
        <Text className="text-secndryText font-tmedium text-base font-medium ">{title}</Text>
      )}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className="flex-row-reverse items-center justify-between"
        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={moment(selectedDate).format('YYYY-MM-DD')}
          editable={false}
          placeholder="Enter date"
          placeholderTextColor="#aaa"
        />
        <Image
          source={Calender}
          style={{ width: 20, height: 20, marginLeft: 8 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
        maximumDate={birthday ? new Date() : undefined}
        minimumDate={new Date(1960, 0, 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#595959',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    fontFamily: 'Tajawal-Medium',
    color: 'black',
  },
});

export default DatePickerInput;
