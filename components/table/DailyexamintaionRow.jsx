import { View, Text, Pressable } from "react-native";
import React from "react";

export default function DailyexamintaionRow({ data, routingFunction }) {
	return (
		<Pressable
			onPress={() => {
				routingFunction(data.CheckID);
			}}
			className="flex flex-row-reverse justify-center items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]">
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center text-black">
					{data.AssetName}
				</Text>
			</View>

			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center  text-black">
					{data.CheckDate.split("T")[0]}
				</Text>
			</View>
		</Pressable>
	);
}
