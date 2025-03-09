import { View, Text, Pressable } from "react-native";
import React from "react";

export default function ScheduleRow({ data, handlePress }) {
	return (
		<Pressable
			onPress={() => {
				handlePress(data.ScheduleID);
			}}
			className="flex flex-row-reverse justify-center  items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]">
			<View className="flex-1">
				<Text className=" text-center font-tmedium text-base">
					{data.AssetName}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" text-center font-tmedium  text-base">
					{data.ScheduleTypeID == 1 ? "مخططة" : "غير مخططة"}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" text-center font-tmedium  text-base">
					{data.ScheduleDate ? data.ScheduleDate?.split("T")[0] : "غير محدد"}
				</Text>
			</View>
		</Pressable>
	);
}
