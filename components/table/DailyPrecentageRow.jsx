import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";

export default function DailyPrecentageRow({ data, onpress }) {
	return (
		<TouchableNativeFeedback
			className="min-w-full"
			onPress={() => {
				onpress(data);
			}}>
			<View className="flex flex-row-reverse border-b border-[#E4E7EC] mb-[2px] min-h-[35px] px-4 py-4 ">
				<View className="flex flex-1">
					<Text className={`font-tmedium text-dark text-center text-base `}>
						{data.time}
					</Text>
				</View>
				<View className="flex flex-1">
					<Text className="font-tmedium text-dark text-center text-base">
						{data.suck}
					</Text>
				</View>
				<View className="flex flex-1">
					<Text className=" font-tmedium text-dark text-center text-base">
						{data.direct}
					</Text>
				</View>
				<View className="flex flex-1">
					<Text className="font-tmedium text-dark text-center text-base">
						{data.kiloWaat}
					</Text>
				</View>
				<View className="flex flex-1">
					<Text className="font-tmedium text-dark text-center text-base">
						{data.airPressure}
					</Text>
				</View>
				<View className="flex flex-1">
					<Text className="font-tmedium text-dark text-center text-base">
						{data.bMerge}
					</Text>
				</View>
				<View className="flex flex-1">
					<Text className="font-tmedium text-dark text-center text-base">
						{data.aMerge}
					</Text>
				</View>
			</View>
		</TouchableNativeFeedback>
	);
}
