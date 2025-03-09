/* eslint-disable prettier/prettier */
import AntDesign from '@expo/vector-icons/AntDesign';
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
  style,
  onChange,
}) => {
  const [Value, setValue] = useState(value || null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if ((Value || isFocus) && label) {
      return <Text style={[styles.label, isFocus && { color: 'blue' }]}>{label}</Text>;
    }
    return null;
  };
  useEffect(() => {
    if (initailOption || defaultOption) {
      console.log(value, initailOption, defaultOption);

      setValue(defaultOption?.key || initailOption);
      onChange(defaultOption?.key || initailOption);
    }
  }, [data, initailOption]);

  useEffect(() => {
    if (defaultOption) {
      console.log(defaultOption);

      setValue(defaultOption?.key);
      onChange(defaultOption?.key);
    } else if (initailOption) {
      setValue(initailOption);
      onChange(initailOption);
    }
  }, [data]);

  return (
    <View className={` ${style}`}>
      {label && (
        <View className="w-full flex-row justify-end">
          <Text className="text-mainText font-tmedium text-base">{label}</Text>
        </View>
      )}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        fontFamily="Tajawal-Medium"
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="value"
        valueField="key"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="بحث..."
        value={Value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.key);
          setIsFocus(false);
          onChange(item.key, item.Value);
        }}
        //   renderLeftIcon={() => (
        //     <AntDesign
        //       style={styles.icon}
        //       color={isFocus ? 'blue' : 'black'}
        //       name="Safety"
        //       size={20}
        //     />
        //   )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 56,
    marginTop: 10,
    borderColor: '#288B96',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontFamily: 'Tajawal-Medium',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Tajawal-Medium',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Tajawal-Medium',
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
