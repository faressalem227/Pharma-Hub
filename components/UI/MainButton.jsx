/* eslint-disable prettier/prettier */
import { ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native';

const MainButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
  iconStyles,
  disabled,
  ActivityIndicatorColor,
  alternative = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${
        alternative ? ' border border-primary ' : 'bg-mainText'
      }  flex min-h-[62px] w-full flex-row items-center justify-center rounded-lg px-16 text-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={!!(isLoading || disabled)}>
      {icon ? <Image source={icon} className={`mr-6 h-6 w-6  ${iconStyles}`} /> : ''}
      <Text
        className={`${
          alternative ? 'text-primary' : 'text-white'
        }  text-center font-tmedium text-lg  ${textStyles} `}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={ActivityIndicatorColor ? ActivityIndicatorColor : alternative ? '#227099' : '#fff'}
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default MainButton;
