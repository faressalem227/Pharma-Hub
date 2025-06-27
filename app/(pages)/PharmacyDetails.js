/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Linking, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Navback } from '../../components';
import { SearchContext } from '../../context/SearchContext';
import api from '../../utilities/api';
import { useGlobalContext } from '../../context/GlobalProvider';
import Toast from 'react-native-toast-message';

const PharmacyDetails = () => {
  const { pharmacy, setPharmacy, savedPharmacies, getsavedPharmacies } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const { isLogged } = useGlobalContext();
  const router = useRouter();

  const isSaved = savedPharmacies?.some((item) => item.ID === pharmacy?.PharmacyID);

  const handleSavePh = async () => {
    try {
      setIsLoading(true);
      const response = await api.post('saved-pharmacies', {
        PharmacyID: pharmacy?.PharmacyID,
      });

      console.log('saving', response);

      getsavedPharmacies();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePh = async () => {
    try {
      setIsLoading(true);
      const response = await api.delete(`saved-pharmacies/${pharmacy?.PharmacyID}`);
      await getsavedPharmacies();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(pharmacy);

  console.log(savedPharmacies);

  return (
    <>
      <View className="flex-1 bg-white p-4">
        <View className="flex-row">
          <Navback title="Pharmacy Details" onNavigate={() => setPharmacy(null)} />
        </View>

        <View className="items-center">
          <Image
            source={
              pharmacy?.Logo ? { uri: pharmacy?.Logo } : require('../../assets/images/ph.jpg')
            }
            className="mb-2 mt-8 h-52 w-52 rounded-full"
          />
        </View>

        <View className="mt-8 flex-row items-center justify-between">
          <Text className="font-tbold text-lg text-secndryText">{pharmacy?.PharmacyName}</Text>

          {!isLoading && (
            <TouchableOpacity onPress={isSaved ? handleDeletePh : handleSavePh}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M10.4688 3.45166C12.5522 1.28685 14.7619 1.07678 16.417 1.8335C18.1132 2.60915 19.3496 4.45037 19.3496 6.63818C19.3495 8.86618 18.4368 10.5825 17.1367 12.0464C15.8144 13.5353 14.1456 14.7097 12.6357 15.8989L12.6348 15.8999C12.1102 16.3143 11.6358 16.6834 11.1768 16.9517C10.7175 17.22 10.335 17.3501 10 17.3501C9.66507 17.3501 9.28275 17.2192 8.82324 16.9507C8.36398 16.6823 7.88927 16.3136 7.36426 15.8999H7.36328C5.85389 14.7097 4.18563 13.5343 2.86328 12.0454C1.56325 10.5815 0.650476 8.86541 0.650391 6.63721C0.650391 4.44887 1.88692 2.60779 3.58301 1.83252C5.23801 1.07622 7.44779 1.28683 9.53125 3.45166L10 3.93799L10.4688 3.45166Z"
                  stroke={isSaved ? 'none' : '#3C9D8D'}
                  fill={isSaved ? '#3C9D8D' : 'none'}
                  strokeWidth="1.3"
                />
              </Svg>
            </TouchableOpacity>
          )}

          {isLoading && <ActivityIndicator size={30} animating={isLoading} color="#227099" />}
        </View>

        <View className="mt-8 flex-row items-center justify-between">
          <Text className="font-tmedium text-lg text-secndryText">{pharmacy?.Address}</Text>

          <Text className="font-tmedium text-lg text-[#3C9D8D]">
            {pharmacy?.IsOpen ? 'Open' : 'Closed'}
          </Text>
        </View>

        <View>
          <Text className="mt-3 font-tregular text-secndryText">{pharmacy?.Description}</Text>
        </View>

        <View className="mt-5 gap-3">
          <Text className="font-tbold text-xl text-secndryText">Matches:</Text>

          <View>
            {pharmacy?.Matched?.map((match, index) => (
              <Text key={index} className="rounded-full bg-mainText px-4 py-2">
                {match.name}
              </Text>
            ))}
          </View>
        </View>

        <View className="mt-8 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="rounded-md bg-[#CAE6E2] p-2">
              <Svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.8472 12.8556L13.4306 10.8766L13.4184 10.8709C12.9526 10.6717 12.4177 10.7211 11.9963 11.0022C11.9718 11.0183 11.9483 11.0359 11.9259 11.0547L9.64406 13C8.19844 12.2978 6.70594 10.8166 6.00375 9.38969L7.95187 7.07312C7.97062 7.04969 7.98844 7.02625 8.00531 7.00094C8.28032 6.5807 8.32677 6.05073 8.12906 5.58906V5.57781L6.14437 1.15375C5.88009 0.543904 5.246 0.180692 4.58625 0.26125C1.95833 0.607054 -0.00475144 2.84943 0 5.5C0 12.9438 6.05625 19 13.5 19C16.1506 19.0048 18.3929 17.0417 18.7388 14.4137C18.8195 13.7542 18.4567 13.1202 17.8472 12.8556ZM13.5 17.5C6.87558 17.4928 1.50723 12.1244 1.5 5.5C1.4927 3.60618 2.89195 2.00108 4.76906 1.75C4.76869 1.75374 4.76869 1.75751 4.76906 1.76125L6.73781 6.1675L4.8 8.48687C4.78033 8.50951 4.76246 8.53364 4.74656 8.55906C4.45961 8.99938 4.42405 9.55777 4.65281 10.0309C5.50219 11.7681 7.2525 13.5053 9.00844 14.3538C9.48515 14.5804 10.0459 14.5398 10.485 14.2469C10.5091 14.2307 10.5322 14.2131 10.5544 14.1944L12.8334 12.25L17.2397 14.2234C17.2397 14.2234 17.2472 14.2234 17.25 14.2234C17.002 16.1033 15.3962 17.5064 13.5 17.5Z"
                  fill="#313144"
                />
              </Svg>
            </View>

            <Text className="font-tregular text-lg text-secndryText">{pharmacy?.Phone}</Text>
          </View>

          <TouchableOpacity
            className="w-20 items-center rounded-lg bg-[#CAE6E2] px-4 py-2"
            onPress={() => Linking.openURL(`tel:${pharmacy?.Phone}`)}>
            <Text className="font-tmedium text-lg text-secndryText">Call</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 items-center">
          <TouchableOpacity
            className="rounded-xl bg-mainText p-4"
            onPress={() => {
              if (!isLogged) {
                Toast.show({
                  type: 'error',
                  text1: 'You need to login first',
                  autoHide: true,
                  onPress: () => router.push('/Signin'),
                  visibilityTime: 2000,
                });

                return;
              }
              router.navigate({
                pathname: '/(Chat)/Chat',
                params: {
                  ReceiverID: pharmacy?.UserID,
                  UserPhoto: pharmacy?.Logo,
                  ChatTitle: pharmacy?.PharmacyName,
                },
              });
            }}>
            <Text className="font-medium text-white">Chat with pahrmacy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast></Toast>
    </>
  );
};

export default PharmacyDetails;
