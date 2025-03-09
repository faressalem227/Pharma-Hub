import { View, Text } from "react-native";
import React from "react";

export default function ItemDetailsComponent({ data }) {
	const { DepartmentName, phone, BalanceQty } = data;
	return (
		<View className="flex flex-row-reverse items-center p-4 border-b border-[0.5px] border-[#E4E7EC]">
			<Text className="flex-1 font-tmedium text-center leading-6 text-base">
				{DepartmentName}
			</Text>

			<Text className="flex-1 font-tmedium text-center text-base">
				{BalanceQty}
			</Text>

			<Text className="flex-1 font-tmedium text-center text-base">{phone}</Text>
		</View>
	);
}
