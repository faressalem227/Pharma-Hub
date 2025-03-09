import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { icons } from "../../constants";
import { Image } from "expo-image";
const ItemControrlList = ({ incrment, decrement, data, removeItem }) => {
	let { ItemName, ItemID, counter } = data;
	useEffect(() => {
		ItemName = data.ItemName;
		ItemID = data.ItemID;
		counter = data.counter;
	}, [data]);

	return (
		<View
			className="flex rounded-md flex-row-reverse  items-center bg-[#E4E7EC]  "
			style={{ gap: 16, alignItems: "center", margin: 16, padding: 16 }}>
			<View className=" basis-1/2  ">
				<Text className="font-tregular text-base">{ItemName}</Text>
			</View>
			<View
				className="flex justify-between flex-row-reverse items-center  basis-1/2 px-4 "
				style={{ gap: 12 }}>
				<View
					className="flex flex-row items-center  "
					style={{ gap: 8 }}>
					<Pressable
						className="border-[0.5px]  rounded-full border-black p-1"
						onPress={() => {
							incrment(ItemID);
						}}>
						<Image
							source={icons.plus}
							className="h-4 w-4"
						/>
					</Pressable>
					<Text className="font-tbold text-base">{counter}</Text>
					<Pressable
						className="border-[0.5px]  rounded-full border-black p-1"
						onPress={() => {
							decrement(ItemID);
						}}>
						<Image
							source={icons.Minus}
							className="h-4 w-4"
						/>
					</Pressable>
				</View>
				<Pressable
					onPress={() => {
						removeItem(ItemID);
					}}>
					<Image
						source={icons.RedTrash}
						className="h-5 w-5"
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default ItemControrlList;
