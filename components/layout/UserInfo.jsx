import { View, Text, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { formatDate } from "../../utilities/dateFormater";
import { icons } from "../../constants";
export default function UserInfo() {
	const { user } = useGlobalContext();
	const lastSeen = formatDate(new Date(user?.lastActive), true);

	return (
		<View className="p-4">
			<Text className="text-right font-tregular text-xl text-[#133E54]">
				مرحبا بك
			</Text>
			<View className="flex flex-col  mb-2">
				<Text className="text-right  font-tbold mt-1 text-xl text-[#133E54]">
					{user ? user?.username : ""}
				</Text>
				<View className="flex items-center flex-row-reverse gap-1 mt-1 ">
					<Image
						className="w-4 h-4"
						source={icons.mapPin}></Image>
					<Text className="font-tregular text-[#133E54]">
						{user?.UserDepartmentName}
					</Text>
				</View>
			</View>
		</View>
	);
}
