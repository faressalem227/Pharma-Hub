import { View, Text, Pressable } from "react-native";
import React from "react";

export default function DailyOperationAssetRow({ data, handlePress, hourID }) {
	return (
		<Pressable
			onPress={() => {
				handlePress(hourID);
			}}
			className="flex flex-row-reverse justify-center items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]">
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center text-black">
					{hourID.toString()}
				</Text>
			</View>
			{data.map((item, index) => (
				<View
					key={index}
					className="flex-1">
					<Text className="  font-tmedium text-base  text-center text-black">
						{item?.toString()}
					</Text>
				</View>
			))}
		</Pressable>
	);
}
