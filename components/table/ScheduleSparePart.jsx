import { View, Text } from "react-native";
import React from "react";

export default function ScheduleSparePart({ data }) {
	return (
		<View className="flex flex-row-reverse justify-center items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]">
			<View className="flex-1">
				<Text className=" text-center font-tmedium text-base">
					{data.ItemName}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" text-center font-tmedium  text-base">
					{data.spcount}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" text-center font-tmedium  text-base">
					{data.cost || 0}
				</Text>
			</View>
			{data.sp_actual_type ? (
				<View className="flex-1">
					<Text className=" text-center font-tmedium  text-base">
						{data.sp_actual_type}
					</Text>
				</View>
			) : (
				<></>
			)}
		</View>
	);
}
