import { View, Text, Pressable } from "react-native";
import React from "react";

export default function ElecticityBillsRow({ data, routingFunction }) {
	const monthsInArabic = {
		1: "يناير",
		2: "فبراير",
		3: "مارس",
		4: "أبريل",
		5: "مايو",
		6: "يونيو",
		7: "يوليو",
		8: "أغسطس",
		9: "سبتمبر",
		10: "أكتوبر",
		11: "نوفمبر",
		12: "ديسمبر",
	};
	return (
		<Pressable
			onPress={() => {
				routingFunction(data.ID);
			}}
			className="flex flex-row-reverse justify-center items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]">
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center text-black">
					{monthsInArabic[data.MonthID]}
				</Text>
			</View>

			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center  text-black">
					{data.TotalBill}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" font-tmedium text-base  text-center text-black">
					{data.Consumption}
				</Text>
			</View>
		</Pressable>
	);
}
