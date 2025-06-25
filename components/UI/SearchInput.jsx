/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SearchInput = ({ handleSubmit, onChange, value }) => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);

  const activateSearchInput = () => {
    inputRef.current.focus();
  };

  return (
    <View className="flex-row items-center gap-2 rounded-full border border-secndryText px-5">
      <TouchableOpacity onPress={activateSearchInput}>
        <Svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z"
            stroke="#313144"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M10.9622 10.9624L13.9997 13.9999"
            stroke="#313144"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
      <TextInput
        style={{
          flex: 1,
        }}
        ref={inputRef}
        placeholder="Search"
        value={value || searchText || ''}
        onChangeText={(value) => {
          setSearchText(value);
          if (onChange) onChange(value);
        }}
        placeholderTextColor="#C8C8C8"
        underlineColorAndroid="transparent"
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

export default SearchInput;
