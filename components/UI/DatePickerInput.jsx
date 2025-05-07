/* eslint-disable prettier/prettier */
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';

import Calender from '../../assets/images/calender.png';

const DatePickerInput = ({ setDate, title, defaultDate, birthday = false, style }) => {
  const [selectedDate, setSelectedDate] = useState(
    defaultDate ? new Date(defaultDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const _selectDate = async () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const date1 = new Date(date);

      setSelectedDate(date);

      const cairoTime = moment(date).tz('Africa/Cairo').format('YYYY-MM-DD HH:mm:ss');

      setDate && setDate(cairoTime);
    }
  };

  useEffect(() => {
    const date = defaultDate ? new Date(defaultDate) : new Date();
    const date1 = new Date(date);

    setSelectedDate(date);

    const cairoTime = moment(date).tz('Africa/Cairo').format('YYYY-MM-DD HH:mm:ss');
    const cairoDate = moment(date).tz('Africa/Cairo').format('YYYY-MM-DD');

    setDate && setDate(cairoTime);
    setSelectedDate(new Date(cairoDate));
  }, []);

  return (
    <View className={`gap-2.5 ${style}`}>
      {title && (
        <Text className=" text-right font-tmedium text-base font-medium text-mainText">
          {title}
        </Text>
      )}

      <TouchableOpacity
        onPress={_selectDate}
        className="flex-row-reverse items-center justify-between"
        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={selectedDate.toISOString().substring(0, 10)}
          editable={false}
          placeholder="أدخل التاريخ"
          placeholderTextColor="#aaa"
        />
        {/* <TouchableOpacity onPress={_selectDate}> */}
        <Image
          source={Calender}
          style={{ width: 20, height: 20, marginLeft: 8 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* </TouchableOpacity> */}
      {showDatePicker && (
        <DatePicker
          date={selectedDate}
          mode="date"
          timeZoneName="Africa/Cairo"
          display="default"
          minimumDate={new Date(1960, 0, 1)}
          {...(birthday && { maximumDate: new Date() })}
          onDateChange={onDateChange}
          customStyles={{
            placeholderText: {
              color: 'green', // Changse the placeholder text color
            },
          }}
        />
      )}
    </View>
  );
};

const Padding = ({ children }) => <View style={styles.padding}>{children}</View>;

const SizedBox = ({ height }) => <View style={{ height }} />;

const Icon = ({ name, size, color }) => <Text style={{ fontSize: size, color }}>{name}</Text>;

const styles = StyleSheet.create({
  padding: {},
  label: {
    fontSize: 14,
    fontFamily: 'Tajawal-Bold',
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: '#288B96',
    paddingVertical: 8,
  },
  input: {
    padding: 8,
    border: '4px solid',
    fontSize: 14,
    fontFamily: 'Tajawal-Medium',
    color: 'black',
  },
});

export default DatePickerInput;
