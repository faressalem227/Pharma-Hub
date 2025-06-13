/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import { View, Text, Image, Switch, TouchableOpacity } from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

import { Navback } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';

export default function ProfileScreen() {
  const { logOut, user } = useGlobalContext();

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await logOut();
      if (response) {
        router.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row">
        <Navback title="Profile" />

        <TouchableOpacity>
          <Svg
            width="22"
            height="22"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Defs>
              <ClipPath id="clip0">
                <Path d="M0 0.5H23V23.5H0V0.5Z" fill="white" />
              </ClipPath>
            </Defs>
            <G clipPath="url(#clip0)">
              <Path
                d="M19.8105 3.14634L20.3541 3.68989C20.7764 4.11216 20.7764 4.79497 20.3541 5.21274L19.0469 6.52446L16.976 4.45356L18.2832 3.14634C18.7055 2.72407 19.3883 2.72407 19.8061 3.14634H19.8105ZM9.42461 12.0094L15.4531 5.97642L17.524 8.04731L11.491 14.0758C11.3607 14.2061 11.199 14.3004 11.0238 14.3499L8.3959 15.1L9.14609 12.4721C9.19551 12.2969 9.28984 12.1352 9.42012 12.0049L9.42461 12.0094ZM16.7604 1.62349L7.89727 10.4821C7.50645 10.8729 7.22344 11.3536 7.0752 11.8792L5.79043 16.3713C5.68262 16.7487 5.78594 17.153 6.06445 17.4315C6.34297 17.71 6.74727 17.8133 7.12461 17.7055L11.6168 16.4208C12.1469 16.268 12.6275 15.985 13.0139 15.5987L21.877 6.74009C23.1393 5.47778 23.1393 3.42935 21.877 2.16704L21.3334 1.62349C20.0711 0.361182 18.0227 0.361182 16.7604 1.62349ZM3.95312 3.37544C1.76992 3.37544 0 5.14536 0 7.32856V19.5473C0 21.7305 1.76992 23.5004 3.95312 23.5004H16.1719C18.3551 23.5004 20.125 21.7305 20.125 19.5473V14.5161C20.125 13.9186 19.6443 13.4379 19.0469 13.4379C18.4494 13.4379 17.9688 13.9186 17.9688 14.5161V19.5473C17.9688 20.5401 17.1646 21.3442 16.1719 21.3442H3.95312C2.96035 21.3442 2.15625 20.5401 2.15625 19.5473V7.32856C2.15625 6.33579 2.96035 5.53169 3.95312 5.53169H8.98438C9.58184 5.53169 10.0625 5.05103 10.0625 4.45356C10.0625 3.8561 9.58184 3.37544 8.98438 3.37544H3.95312Z"
                fill="#313144"
              />
            </G>
          </Svg>
        </TouchableOpacity>
      </View>

      <View className="mt-3 items-center">
        <Image
          source={require('../../assets/images/default.jpg')}
          className="mb-2 h-[5.5rem] w-[5.5rem] rounded-full"
        />
        <Text className="font-tbold text-3xl">{user?.username}</Text>
        <Text className="font-tregular text-infoText">{user?.email}</Text>
      </View>

      <View className="mt-10 gap-5">
        <Text className="font-tmedium text-xl text-infoText">HEALTH & PREFERENCES</Text>

        <View className="gap-5">
          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-b-borderGray pb-3"
            onPress={() => router.navigate('/SavedPahrmaciesScreen')}>
            <View className="flex-row items-center gap-2">
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Defs>
                  <ClipPath id="clip0">
                    <Rect width="16" height="16" fill="white" />
                  </ClipPath>
                  <ClipPath id="clip1">
                    <Path d="M0 0H12V16H0V0Z" fill="white" />
                  </ClipPath>
                </Defs>
                <G clipPath="url(#clip0)">
                  <G clipPath="url(#clip1)">
                    <Path
                      d="M6.74062 15.6C8.34375 13.5938 12 8.73125 12 6C12 2.6875 9.3125 0 6 0C2.6875 0 0 2.6875 0 6C0 8.73125 3.65625 13.5938 5.25938 15.6C5.64375 16.0781 6.35625 16.0781 6.74062 15.6ZM6 4C6.53043 4 7.03914 4.21071 7.41421 4.58579C7.78929 4.96086 8 5.46957 8 6C8 6.53043 7.78929 7.03914 7.41421 7.41421C7.03914 7.78929 6.53043 8 6 8C5.46957 8 4.96086 7.78929 4.58579 7.41421C4.21071 7.03914 4 6.53043 4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4Z"
                      fill="black"
                      fillOpacity={0.6}
                    />
                  </G>
                </G>
              </Svg>
              <Text className="pt-2 font-tregular text-xl text-secndryText">Saved Pharmacies</Text>
            </View>

            <Text className="pt-2 font-tregular text-xl text-secondryInfoText">{`${3} Pharmacies`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between pb-3"
            onPress={() => router.navigate('/SavedMedicines')}>
            <View className="flex-row items-center gap-2">
              <Svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                <Path d="M18 16H0V0H18V16Z" />
                <Path
                  d="M3.5 3C2.67188 3 2 3.67188 2 4.5V8H5V4.5C5 3.67188 4.32812 3 3.5 3ZM0 4.5C0 2.56562 1.56562 1 3.5 1C5.43437 1 7 2.56562 7 4.5V11.5C7 13.4344 5.43437 15 3.5 15C1.56562 15 0 13.4344 0 11.5V4.5ZM17.3406 12.4812C17.1188 12.8656 16.6 12.8906 16.2844 12.5781L10.4219 6.71562C10.1094 6.40312 10.1313 5.88125 10.5188 5.65938C11.25 5.24063 12.0969 5 13 5C15.7625 5 18 7.2375 18 10C18 10.9031 17.7594 11.75 17.3406 12.4812ZM15.4812 14.3406C14.75 14.7594 13.9031 15 13 15C10.2375 15 8 12.7625 8 10C8 9.09688 8.24063 8.25 8.65938 7.51875C8.88125 7.13438 9.4 7.10938 9.71562 7.42188L15.5781 13.2844C15.8906 13.5969 15.8687 14.1187 15.4812 14.3406Z"
                  fill="black"
                  fillOpacity={0.6}
                />
              </Svg>
              <Text className="pt-2 font-tregular text-xl text-secndryText">Saved Medicines</Text>
            </View>

            <Text className="pt-2 font-tregular text-xl text-secondryInfoText">{`${8} Medicines`}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-7 gap-5">
        <Text className="font-tmedium text-xl text-infoText">QUICK ACTIONS</Text>

        <View className="gap-5">
          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-b-borderGray pb-3"
            onPress={() => router.navigate('/NotificationScreen')}>
            <View className="flex-row items-center gap-2">
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Defs>
                  <ClipPath id="clip0">
                    <Rect width="14" height="16" fill="white" />
                  </ClipPath>
                  <ClipPath id="clip1">
                    <Path d="M0 0H14V16H0V0Z" fill="white" />
                  </ClipPath>
                </Defs>
                <G clipPath="url(#clip0)">
                  <G clipPath="url(#clip1)">
                    <Path
                      d="M7 0C6.44688 0 6 0.446875 6 1V1.6C3.71875 2.0625 2 4.08125 2 6.5V7.0875C2 8.55625 1.45938 9.975 0.484376 11.075L0.253126 11.3344C-0.00937426 11.6281 -0.0718743 12.05 0.0875007 12.4094C0.246876 12.7688 0.606251 13 1 13H13C13.3938 13 13.75 12.7688 13.9125 12.4094C14.075 12.05 14.0094 11.6281 13.7469 11.3344L13.5156 11.075C12.5406 9.975 12 8.55937 12 7.0875V6.5C12 4.08125 10.2812 2.0625 8 1.6V1C8 0.446875 7.55313 0 7 0ZM8.41563 15.4156C8.79063 15.0406 9 14.5312 9 14H7H5C5 14.5312 5.20938 15.0406 5.58438 15.4156C5.95938 15.7906 6.46875 16 7 16C7.53125 16 8.04063 15.7906 8.41563 15.4156Z"
                      fill="black"
                      fillOpacity={0.6}
                    />
                  </G>
                </G>
              </Svg>
              <Text className="pt-2 font-tregular text-xl text-secndryText">Notifications</Text>
            </View>

            <Text className="pt-2 font-tregular text-xl text-secondryInfoText">{`${11} Notifications`}</Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-between border-b border-b-borderGray pb-1">
            <View className="flex-row items-center gap-2">
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Defs>
                  <ClipPath id="clip0">
                    <Path d="M0 0H12V16H0V0Z" fill="white" />
                  </ClipPath>
                </Defs>
                <G clipPath="url(#clip0)">
                  <Path
                    d="M6.98438 1C3.125 1 0 4.13438 0 8C0 11.8656 3.125 15 6.98438 15C8.87813 15 10.5938 14.2438 11.8531 13.0188C12.0094 12.8656 12.05 12.6281 11.95 12.4344C11.85 12.2406 11.6344 12.1312 11.4187 12.1687C11.1125 12.2219 10.8 12.25 10.4781 12.25C7.45 12.25 4.99375 9.7875 4.99375 6.75C4.99375 4.69375 6.11875 2.90313 7.78438 1.95938C7.975 1.85 8.07187 1.63125 8.025 1.41875C7.97812 1.20625 7.79688 1.04688 7.57812 1.02813C7.38125 1.0125 7.18437 1.00312 6.98438 1.00312V1Z"
                    fill="black"
                    fillOpacity={0.6}
                  />
                </G>
              </Svg>
              <Text className="pt-2 font-tregular text-xl text-secndryText">Dark Mode</Text>
            </View>

            <Switch />
          </View>

          <View className="flex-row items-center justify-between pb-3">
            <View className="flex-row items-center gap-2">
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Defs>
                  <ClipPath id="clip0">
                    <Rect width="16" height="16" fill="white" />
                  </ClipPath>
                  <ClipPath id="clip1">
                    <Path d="M0 0H16V16H0V0Z" fill="white" />
                  </ClipPath>
                </Defs>
                <G clipPath="url(#clip0)">
                  <G clipPath="url(#clip1)">
                    <Path
                      d="M11 8C11 8.69375 10.9625 9.3625 10.8969 10H5.10313C5.03438 9.3625 5 8.69375 5 8C5 7.30625 5.0375 6.6375 5.10313 6H10.8969C10.9656 6.6375 11 7.30625 11 8ZM11.9 6H15.7469C15.9125 6.64062 16 7.30937 16 8C16 8.69063 15.9125 9.35938 15.7469 10H11.9C11.9656 9.35625 12 8.6875 12 8C12 7.3125 11.9656 6.64375 11.9 6ZM15.4187 5H11.7719C11.4594 3.00312 10.8406 1.33125 10.0437 0.2625C12.4906 0.909375 14.4812 2.68438 15.4156 5H15.4187ZM10.7594 5H5.24062C5.43125 3.8625 5.725 2.85625 6.08437 2.04063C6.4125 1.30313 6.77812 0.76875 7.13125 0.43125C7.48125 0.1 7.77187 0 8 0C8.22812 0 8.51875 0.1 8.86875 0.43125C9.22187 0.76875 9.5875 1.30313 9.91562 2.04063C10.2781 2.85313 10.5687 3.85938 10.7594 5ZM4.22813 5H0.58125C1.51875 2.68438 3.50625 0.909375 5.95625 0.2625C5.15938 1.33125 4.54063 3.00312 4.22813 5ZM0.253125 6H4.1C4.03437 6.64375 4 7.3125 4 8C4 8.6875 4.03437 9.35625 4.1 10H0.253125C0.0875 9.35938 0 8.69063 0 8C0 7.30937 0.0875 6.64062 0.253125 6ZM6.08437 13.9563C5.72187 13.1438 5.43125 12.1375 5.24062 11H10.7594C10.5687 12.1375 10.275 13.1438 9.91562 13.9563C9.5875 14.6938 9.22187 15.2281 8.86875 15.5656C8.51875 15.9 8.22812 16 8 16C7.77187 16 7.48125 15.9 7.13125 15.5688C6.77812 15.2313 6.4125 14.6969 6.08437 13.9594V13.9563ZM4.22813 11C4.54063 12.9969 5.15938 14.6687 5.95625 15.7375C3.50625 15.0906 1.51875 13.3156 0.58125 11H4.22813ZM15.4187 11C14.4812 13.3156 12.4937 15.0906 10.0469 15.7375C10.8438 14.6687 11.4594 12.9969 11.775 11H15.4187Z"
                      fill="black"
                      fillOpacity={0.6}
                    />
                  </G>
                </G>
              </Svg>
              <Text className="pt-2 font-tregular text-xl text-secndryText">Language</Text>
            </View>

            <Text className="pt-2 font-tregular text-xl text-secondryInfoText">English</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="mt-7 flex-row items-center justify-center gap-1 rounded-md bg-[#EFD1D1] p-3"
        onPress={() => handleLogOut()}>
        <Text className="text-center font-tmedium text-[#CF4D4D]">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
