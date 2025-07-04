/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useGlobalContext } from '../../context/GlobalProvider';

const HeaderBar = () => {
  const { user, isLogged } = useGlobalContext();

  const router = useRouter();

  console.log(user);

  return (
    <View className="box-border bg-white px-5" style={{ paddingVertical: isLogged ? 12 : 20 }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className=" bg-white">
            {(!isLogged || !user?.userImage) && (
              <TouchableOpacity
                id="userIcon"
                onPress={() => {
                  if (isLogged) {
                    router.navigate('/ProfileScreen');
                  } else {
                    router.navigate('/Signin');
                  }
                }}>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <Path
                    d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            )}

            {isLogged && user?.userImage && (
              <TouchableOpacity onPress={() => router.navigate('/ProfileScreen')}>
                <Image source={{ uri: user?.userImage }} className="h-10 w-10 rounded-full" />
              </TouchableOpacity>
            )}
          </View>

          <Text className="text-2xl font-bold text-secndryText">
            {isLogged ? user?.username : 'Guest'}
          </Text>
        </View>

        <View
          className="flex-row  items-center gap-2"
          style={{
            display: isLogged ? 'flex' : 'none',
          }}>
          <TouchableOpacity
            className="pt-4"
            onPress={() => {
              // router.navigate('/Signin');
              router.navigate('/NotificationScreen');
            }}>
            <Svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M13.0021 6.30085C13.0021 5.02759 12.4963 3.80647 11.596 2.90614C10.6957 2.0058 9.47454 1.5 8.20128 1.5C6.92801 1.5 5.7069 2.0058 4.80656 2.90614C3.90623 3.80647 3.40043 5.02759 3.40043 6.30085C3.40043 11.9018 1 13.5021 1 13.5021H15.4026C15.4026 13.5021 13.0021 11.9018 13.0021 6.30085Z"
                stroke="black"
                strokeOpacity="0.6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M9.58563 16.7031C9.44496 16.9456 9.24304 17.1469 9.00011 17.2869C8.75717 17.4268 8.48174 17.5004 8.20138 17.5004C7.92103 17.5004 7.6456 17.4268 7.40266 17.2869C7.15972 17.1469 6.95781 16.9456 6.81714 16.7031"
                stroke="black"
                strokeOpacity="0.6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            className="pt-1"
            onPress={() => router.navigate(user?.id ? '/ChatList' : '/Signin')}>
            <Svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M12.252 19.0055C12.8849 18.9623 13.5125 18.8612 14.127 18.7035C14.886 18.9317 15.687 18.9833 16.469 18.8545C16.5002 18.8507 16.5316 18.8484 16.563 18.8475C16.842 18.8475 17.208 19.0075 17.742 19.3445V18.7905C17.7422 18.694 17.7683 18.5993 17.8176 18.5163C17.8668 18.4333 17.9374 18.365 18.022 18.3185C18.2547 18.1872 18.4697 18.0395 18.667 17.8755C19.445 17.2255 19.884 16.3575 19.884 15.4395C19.884 15.1365 19.836 14.8345 19.741 14.5465C19.977 14.1125 20.165 13.6595 20.305 13.1875C20.755 13.8525 20.997 14.6375 21 15.4395C21 16.6875 20.412 17.8515 19.393 18.7025C19.2223 18.8445 19.044 18.9752 18.858 19.0945V20.3925C18.858 20.8385 18.336 21.0955 17.968 20.8295C17.6193 20.573 17.2589 20.3327 16.888 20.1095C16.7808 20.0477 16.67 19.9926 16.556 19.9445C16.2464 19.9904 15.9339 20.0134 15.621 20.0135C14.351 20.0135 13.177 19.6365 12.252 19.0055ZM5.531 16.4105C3.927 15.0675 3 13.2365 3 11.2745C3 7.26652 6.832 4.06152 11.511 4.06152C16.191 4.06152 20.024 7.26552 20.024 11.2745C20.024 15.2825 16.191 18.4865 11.511 18.4865C10.985 18.4865 10.4667 18.4465 9.956 18.3665C9.736 18.4175 8.854 18.9345 7.584 19.8495C7.124 20.1815 6.472 19.8615 6.472 19.3025V17.0895C6.14262 16.8859 5.82846 16.6586 5.532 16.4095M9.987 17.0015C10.0257 17.0015 10.0647 17.0045 10.104 17.0105C10.564 17.0865 11.033 17.1249 11.511 17.1255C15.464 17.1255 18.627 14.4805 18.627 11.2735C18.627 8.06752 15.464 5.42252 11.512 5.42252C7.56 5.42252 4.395 8.06952 4.395 11.2745C4.395 12.8245 5.135 14.2845 6.441 15.3775C6.77033 15.6522 7.129 15.8989 7.517 16.1175C7.62225 16.1759 7.71011 16.2612 7.7716 16.3647C7.83309 16.4682 7.86601 16.5862 7.867 16.7065V17.9825C8.872 17.3175 9.533 17.0015 9.987 17.0015Z"
                fill="black"
                fillOpacity="0.6"
              />
              <Path
                d="M8.06201 12.5C8.36038 12.5 8.64653 12.3815 8.85751 12.1705C9.06849 11.9595 9.18701 11.6734 9.18701 11.375C9.18701 11.0766 9.06849 10.7905 8.85751 10.5795C8.64653 10.3685 8.36038 10.25 8.06201 10.25C7.76364 10.25 7.4775 10.3685 7.26652 10.5795C7.05554 10.7905 6.93701 11.0766 6.93701 11.375C6.93701 11.6734 7.05554 11.9595 7.26652 12.1705C7.4775 12.3815 7.76364 12.5 8.06201 12.5ZM11.719 12.5C12.0174 12.5 12.3035 12.3815 12.5145 12.1705C12.7255 11.9595 12.844 11.6734 12.844 11.375C12.844 11.0766 12.7255 10.7905 12.5145 10.5795C12.3035 10.3685 12.0174 10.25 11.719 10.25C11.4206 10.25 11.1345 10.3685 10.9235 10.5795C10.7125 10.7905 10.594 11.0766 10.594 11.375C10.594 11.6734 10.7125 11.9595 10.9235 12.1705C11.1345 12.3815 11.4206 12.5 11.719 12.5ZM15.375 12.5C15.6734 12.5 15.9595 12.3815 16.1705 12.1705C16.3815 11.9595 16.5 11.6734 16.5 11.375C16.5 11.0766 16.3815 10.7905 16.1705 10.5795C15.9595 10.3685 15.6734 10.25 15.375 10.25C15.0766 10.25 14.7905 10.3685 14.5795 10.5795C14.3685 10.7905 14.25 11.0766 14.25 11.375C14.25 11.6734 14.3685 11.9595 14.5795 12.1705C14.7905 12.3815 15.0766 12.5 15.375 12.5Z"
                fill="black"
                fillOpacity="0.6"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderBar;
