import { View, Text, Pressable } from "react-native";
import React from "react";

export default function DailyOperationAssetsRow({ data, routingFunction }) {
	return (
		<Pressable
			onPress={() => {
				routingFunction(data?.AssetID);
			}}
			className="flex flex-row-reverse justify-center items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]">
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center text-black">
					{data?.AssetName}
				</Text>
			</View>
			<View className="flex-1">
				<Text className="font-tmedium text-base  text-center  text-black">
					{data?.lastHour}
				</Text>
			</View>
		</Pressable>
	);
}
