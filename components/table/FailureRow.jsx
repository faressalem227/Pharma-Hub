import { View, Text, Pressable } from "react-native";
import React from "react";

export default function FailureRow({ data, routingFunction }) {
	console.log(data);
	return (
		<Pressable
			onPress={() => {
				routingFunction(data.FailureID);
			}}
			className="flex flex-row justify-center items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]">
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center  text-black">
					{data.AssetName}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" font-tmedium text-base  text-center text-black">
					{data.FailureDate.split("T")[0]}
				</Text>
			</View>
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center text-black">
					{data.FailureDescription}
				</Text>
			</View>
		</Pressable>
	);
}
