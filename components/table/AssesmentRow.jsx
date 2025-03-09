import { View, Text, Pressable } from "react-native";
import React from "react";

const AssesmentRow = ({ handelpress, data, LongPress }) => {
	return (
		<Pressable
			className="flex flex-row-reverse justify-center items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]"
			onPress={() => {
				handelpress(data);
			}}
			onLongPress={() => {
				LongPress(data.ScheduleItemID);
			}}>
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center text-black">
					{data.ItemName}
				</Text>
			</View>

			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center  text-black">
					{data.ItemCost}
				</Text>
			</View>
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center  text-black">
					{data.ItemCount}
				</Text>
			</View>
		</Pressable>
	);
};

export default AssesmentRow;
