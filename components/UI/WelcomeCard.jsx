// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// // import Home from "../../assets/images/Home.png";
// import Loader from "./Loader";
// import   from ' rnc'; // Import tailwind-rn
// import { useGlobalContext } from "../../context/GlobalProvider";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Loader from "./Loader";
import { useGlobalContext } from "../../context/GlobalProvider";
const WelcomeCard = () => {
  const [loader, setLoader] = useState(false);
  const { user } = useGlobalContext();

  // Format last active time
  const lastActive = user?.lastActive
    ? `${user.lastActive.split("T")[0]} - ${
        user.lastActive.split("T")[1].split("+")[0]
      }`
    : "غير متوفر";

  return (
    <View className={"bg-gradient-to-r from-[#A5C5D5] to-white "} dir="rtl">
      <View className={"flex flex-col gap-2 mt-[16px] mx-[16px] "}>
        <View className={"text-right flex flex-col gap-2"}>
         
		  <View>
		  <Text className={"text-lg font-tmedium text-[#133A54]"}>
            مرحباً بك
          </Text>
          <Text className={"text-xl font-tbold text-[#133A54] mt-2"}>
            {user?.username || "مستخدم غير معروف"}
          </Text>
		  </View>
          {/* <View className={"flex flex-row-reverse gap-4"}>
            <Text className={"text-sm text-[#133A54] mt-2 flex items-center"}>
              <Text className={"font-tbold"}>آخر ظهور : </Text>
              {lastActive}
            </Text>
            <Text className={"text-sm text-[#133A54] mt-2 flex items-center"}>
              <Text className={"font-tbold"}>الساعه :</Text> {lastActive}
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default WelcomeCard;
// import React from "react";
// import Home from "../../assets/Images/Home.png";
// import { useAuth } from "../../store/Auth";
// import { formatDate } from "../Grid/utilities";
// import Loader from "./Loader";
// import { useState } from "react";
// const WelcomeCard = () => {
// 	const { user, signOut } = useAuth();
// 	const [loader, setLoader] = useState(false);
// 	return (
// 		<View
// 			className="rounded-lg p-4 shadow-md  m-4"
// 			className={{
// 				backgroundImage: "linear-gradient(to right, #A5C5D5, #ffffff)",
// 			}}
// 			dir="rtl">
// 			<View className="flex flex-col md:flex-row items-center md:justify-be een gap-4">
// 				<View className="mb-4 md:mb-0 md:order-last">
// 					<img
// 						src={Home}
// 						alt="Statistics"
// 						className="w-60 max-w-xs mx-auto md:mx-0"
// 					/>
// 				</View>

// 				<View className="text-center md:text-right font-tajawal">
// 					<h3 className="text-lg font-semibold text-[#133A54]">مرحباً بك</h3>
// 					<h4 className="text-xl font-bold text-[#133A54] mt-2">
// 						{" "}
// 						{user?.username}{" "}
// 					</h4>
// 					<p className="text-sm font-tajawal text-[#133A54] mt-2 flex items-center ">
// 						آخر ظهور{" "}
// 						{user.lastActive?.split("T")[0] +
// 							" - " +
// 							user.lastActive?.split("T")[1].split("+")[0]}
// 					</p>
// 					<View className="mt-4 space-x-2 space-x-reverse">
// 						<button
// 							disabled={loader}
// 							onClick={async () => {
// 								setLoader(true);
// 								await signOut();
// 							}}
// 							className="bg-[#227099]  text-white py-2 px-4 rounded-lg hover:bg-[#1a5a73] transition">
// 							{loader ? <Loader parentclassName="min-h-4" /> : "	تسجيل الخروج"}
// 						</button>
// 						<button className="border hidden border-[#227099] text-[#227099] py-2 px-4 rounded-lg hover:bg-blue-100 transition"></button>
// 					</View>
// 				</View>
// 			</View>
// 		</View>
// 	);
// };

// export default WelcomeCard;
