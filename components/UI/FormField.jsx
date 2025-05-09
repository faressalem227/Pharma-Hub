/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import { icons } from '../../constants';

const FormField = ({
  haveTitle = true,
  title,
  value,
  handlePress,
  placeholder,
  handleChangeText,
  inputName,
  otherStyles,
  icon,
  inputIcon,
  blurFunction,
  disableChat,
  FocusFunction,
  inputIconUser,
  numeric = false,
  editable = true,
  inputPress = () => {},
  inputStyle,
  iconStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleDecimalInput = (text, setValue) => {
    const validatedText = text.replace(/[^0-9.]/g, ''); // Allow only numbers and decimal points
    setValue(validatedText, inputName);
  };
  return (
    <View className={` ${otherStyles}`}>
      {haveTitle && (
        <View className="mb-4 flex flex-row justify-end">
          <Text className=" text-mainText text-right font-tmedium text-base shadow-md">
            {title}
          </Text>

          {icon ? <Image source={icon} resizeMode="contain" className="ml-1 h-6 w-6" /> : ''}
        </View>
      )}
      <View className="bg-#FEFEFE border-mainText focus:border-mainText flex h-14 w-full flex-row items-center rounded-lg border-[0.5px] px-4">
        {title === 'كلمة المرور' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eyeIcon : icons.eyeSlash}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {inputIcon && (
          <TouchableOpacity
            className={`h-8 w-8 items-center justify-center rounded-md bg-[#227099] ${iconStyle}`}
            onPress={() => handlePress()}
            disabled={disableChat}>
            <Image source={inputIcon} className="h-6 w-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
        {inputIconUser && (
          <TouchableOpacity
            className="items-center justify-center rounded-md "
            onPress={() => handlePress()}
            disabled={disableChat}>
            <Image source={inputIconUser} className="h-6 w-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
        <TextInput
          autoCapitalize="none"
          editable={!!editable}
          multiline={title !== 'كلمة المرور'}
          className={`flex-1 text-right font-tregular text-base leading-5 text-dark
						 ${inputStyle ? inputStyle : ''}
						`}
          value={value}
          keyboardType={numeric ? 'numeric' : ''}
          placeholder={placeholder}
          placeholderTextColor="#2B2B2B80"
          onChangeText={(e) => {
            if (numeric) handleDecimalInput(e, handleChangeText);
            else handleChangeText(e, inputName);
          }}
          secureTextEntry={!showPassword}
        />
      </View>
    </View>
  );
};

export default FormField;
