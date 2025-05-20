/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({
  data = [],
  initailOption,
  defaultOption,
  value,
  label,
  placeholder,
  style = {},
  onChange,
  haveSearch = true,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || null);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (option) => {
    setSelectedValue(option?.value);
    onChange?.(option?.value);
  };

  // useEffect(() => {
  //   const fallback = defaultOption?.value ?? initailOption;
  //   if (fallback !== undefined) {
  //     setSelectedValue(fallback);
  //     onChange?.(fallback);
  //   }
  // }, [data, defaultOption, initailOption]);

  console.log(data);

  return (
    <View style={[{ gap: 10 }]} className={`${style}`}>
      {label && (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={haveSearch}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="بحث..."
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setIsFocus(false);
          handleChange(item);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 56,
    borderColor: '#288B96',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontFamily: 'Tajawal-Medium',
  },
  label: {
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Tajawal-Medium',
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Tajawal-Medium',
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Tajawal-Medium',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Tajawal-Medium',
  },
});
