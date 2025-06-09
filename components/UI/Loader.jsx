/* eslint-disable prettier/prettier */
import { View, ActivityIndicator, Dimensions } from 'react-native';

const Loader = ({ isLoading, minus, height, width }) => {
  const screenHeight = Dimensions.get('screen').height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute z-10 flex items-center  justify-center bg-white"
      style={{
        height: height ? height : screenHeight - (minus ? minus : 0),
        width: width ? width : '100%',
      }}>
      <ActivityIndicator size={80} animating={isLoading} color="#227099" />
    </View>
  );
};

export default Loader;
