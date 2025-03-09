import { View, Text, Pressable } from "react-native";
import React from "react";

export default function ElectricityCutOutRow({ data, routingFunction }) {
	let x = {
		ID: 6,
		DepartmentID: 4015299,
		Date: "2024-08-13T00:00:00.000Z",
		cuttime: "1",
		backtime: "7",
		cut_duration: 6,
		suction_cut: 6,
		discharge_cut: 6,
		suction_back: 7,
		discharge_back: 7,
		no_circle: 1,
		cut_reason: "------",
		StatusID: 0,
		StatusDate: "2024-08-13T14:32:42.323Z",
		StatusUserName: null,
		StatusName: "ادخال",
	};
	return (
		<Pressable
			onPress={() => {
				routingFunction(data.ID);
			}}
			className="flex flex-row-reverse justify-center items-center border-[0.5px] px-4 py-4 border-b border-[#E4E7EC]">
			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center text-black">
					{data.Date.split("T")[0]}
				</Text>
			</View>

			<View className="flex-1">
				<Text className="  font-tmedium text-base  text-center  text-black">
					{data.cuttime}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" font-tmedium text-base  text-center text-black">
					{data.cut_duration}
				</Text>
			</View>
		</Pressable>
	);
}
