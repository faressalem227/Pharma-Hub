import { Text, Pressable } from "react-native";
import React from "react";

export default function OperationalFailureRow({ data, routingfunction }) {
	console.log(data);
	const { AssetName, FailureDate, StatusID, OpStatusID, NotifyID } = data;

	const status = {
		1: {
			StatusID: 1,
			StatusName: "يعمل",
		},
		2: {
			StatusID: 2,
			StatusName: "متوقف",
		},
		3: {
			StatusID: 3,
			StatusName: "بلاغ",
		},
		4: {
			StatusID: 4,
			StatusName: "عاطل",
		},
		5: {
			StatusID: 5,
			StatusName: "عمرة",
		},
		6: {
			StatusID: 6,
			StatusName: "لا يوجد",
		},
	};
	console.log(data);

	return (
		<Pressable
			onPress={() => routingfunction(NotifyID)}
			className={`flex flex-row-reverse items-center p-4 border-b border-[1px] border-[#E4E7EC] ${
				OpStatusID == 1 ? "bg-[#E8F0EE]" : "bg-[#F9EAEB]"
			}`}>
			<Text className="flex-1 font-tmedium text-base text-center leading-6">
				{AssetName}
			</Text>
			<Text className="flex-1 font-tmedium text-center text-base ">
				{FailureDate.split("T")[0]}
			</Text>

			<Text
				className={`flex-1 font-tmedium text-center text-base  ${
					OpStatusID == 1 ? "text-[#019444]" : "text-[#F15555]"
				} `}>
				{status[OpStatusID].StatusName}
			</Text>
		</Pressable>
	);
}
