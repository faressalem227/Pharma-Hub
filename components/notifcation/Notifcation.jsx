import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "../../constants";
import { formatDate } from "../../utilities/dateFormater";
const Notify = ({ data }) => {
	const { MessageHead, MessageBody, MessageDateTime, Priority, DepartmentID } =
		data;
	const flagIcon =
		Priority === 1
			? icons.RedFlag
			: Priority === 2
			? icons.yellowFlag
			: Priority == 3
			? icons.blueFlag
			: icons.grayFlag;

	const date = formatDate(new Date(MessageDateTime), true);
	return (
		<View className={`w-full bg-[#F6F6F6] p-2 mb-4 rounded-lg`}>
			<View className="flex flex-row-reverse justify-between mb-2  w-full">
				<Text className="font-tbold  text-base">{MessageHead}</Text>
				<Image
					source={flagIcon}
					resizeMode="contain"
					className="w-4 h-4"
				/>
			</View>
			<View className="w-full ">
				<Text className=" font-tlight text-xs">
					{DepartmentID == 0 ? "النظام" : data?.DepartmentName}
				</Text>
			</View>
			<View className>
				<Text className=" font-tregular text-base">{MessageBody}</Text>
			</View>

			<View>
				<Text className=" font-light mt-2 text-xs mb-2">{`${date[1]}       ${date[0]} `}</Text>
			</View>
		</View>
	);
};

export default Notify;
