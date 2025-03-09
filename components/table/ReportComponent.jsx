import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

export default function ReportComponent({ data, routing }) {
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

	return (
		<View
			className={`${data.OpStatusID == 1 ? "bg-[#E8F0EE]" : "bg-[#F9EAEB]"}`}>
			<TouchableOpacity
				onPress={() => {
					routing(data.NotifyID);
				}}
				className=" font-tmedium  flex flex-row items-center px-4 justify-center border-[1px] border-[#E4E7EC]"
				style={[
					tw`   flex-1 flex justify-between items-center  flex-row-reverse  items-center py-[16px]   `,
					{ width: "100%" },
				]}>
				<Text className="font-tmedium text-base text-center flex-1">
					{data.FailureDescription}
				</Text>

				<Text
					className={`ffont-tmedium text-base text-center leading-6 flex-1`}>
					{data.AssetName}
				</Text>

				<Text className={`font-tmedium text-base text-center flex-1`}>
					{data.NotifyDate.split("T")[0] || 0}
				</Text>

				<Text
					className={` font-tmedium text-base text-center flex-1 ${
						data.OpStatusID == 1 ? "text-[#019444] " : "text-[#F15555]"
					}`}>
					{status[data.OpStatusID].StatusName}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
