import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

const DailyOperation = ({ data, handlePress }) => {
	const filteredAsset = Object.fromEntries(
		Object.entries(data).filter(
			([key, value]) => !isNaN(Number(key)) && value != null
		)
	);
	let values = Object.keys(filteredAsset);
	let size = values.length;
	let lastKey = values[size - 1];

	return (
		<TouchableOpacity
			onPress={() => handlePress(data.AssetID, data.OperationItemID)}
			className="border-b-[0.5px] border-[#00000055] p">
			<View
				className=" font-tmedium flex flex-row items-center px-4 justify-center"
				style={[
					tw`   flex-1 flex justify-between items-center  flex-row-reverse  items-center py-[16px]   `,
					{ width: "100%" },
				]}>
				<Text className="font-tmedium text-center flex-1 text-base">
					{data.AssetName}
				</Text>

				<Text className={`font-tmedium text-center leading-6 flex-1 text-base`}>
					{data.OperationItemName}
				</Text>

				<Text className={`font-tmedium text-center flex-1 text-base`}>
					{values[size - 1]}
				</Text>
				<Text className={`font-tmedium text-center flex-1 text-base`}>
					{filteredAsset[lastKey]}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default DailyOperation;
