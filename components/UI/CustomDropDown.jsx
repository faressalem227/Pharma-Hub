import { View, Text, Pressable } from "react-native";
import React from "react";
import FormField from "./FormField";
import { useState } from "react";
import { FlatList } from "react-native";
import { useEffect } from "react";
import icons from "../../constants/icons";
import ErrorMassege from "../layout/ErrorMassege";
import { Image } from "expo-image";
const CustomDropDown = ({
	data,
	placeHolder = "اختر",
	changeValue,
	initailOption,
	title,
}) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [search, setSearch] = useState("");

	const [filterData, setFilterData] = useState(data);
	const [rowdata, setRowData] = useState(data);

	useEffect(() => {
		const data = rowdata.filter((item) => {
			return item.value.toLowerCase().includes(search.toLowerCase());
		});
		setFilterData(data);
	}, [search]);
	const changeDropDown = (key, value) => {
		changeValue(key);
		setSelectedItem(value);
		setShowDropDown(false);
	};

	useEffect(() => {
		setFilterData(data);
		setRowData(data);
	}, [data]);

	useEffect(() => {
		if (initailOption) {
			//console.log(data,99999);

			const option = data?.find((item) => item.key == initailOption);
			changeDropDown(option.key, option.value);

			//console.log("option", option, data, initailOption);
		}
	}, []);
	return (
		<View>
			{title && (
				<View>
					<Text className=" font-tmedium text-base text-[#133E54]">
						{title}
					</Text>
				</View>
			)}
			{showDropDown ? (
				<>
					<FormField
						value={showDropDown ? search : selectedItem || placeHolder}
						inputIcon={icons.ChevronUp}
						inputPress={() => {
							setShowDropDown(!showDropDown);
							setSearch("");
						}}
						editable={showDropDown}
						iconStyle={"bg-transparent"}
						handlePress={() => {
							setShowDropDown(!showDropDown);
							setSearch("");
						}}
						handleChangeText={(text) => setSearch(text)}
					/>
				</>
			) : (
				<>
					<View className="pt-4">
						<Pressable
							onPress={() => {
								setShowDropDown(!showDropDown);
								setSearch("");
							}}
							className="h-[56px] border-[0.5px] border-primary rounded-lg flex items-center flex-row-reverse px-4 py-2 justify-between">
							<Text className="font-tmedium truncate">
								{selectedItem || placeHolder}{" "}
							</Text>
							<Image
								className="w-5 h-5"
								source={icons.CaretDown}></Image>
						</Pressable>
					</View>
				</>
			)}

			<FlatList
				maxToRenderPerBatch={20}
				style={{
					display: showDropDown ? "flex" : "none",
					maxHeight: 200,
					minHeight: 100,
					backgroundColor: "white",
					padding: 8,
					borderWidth: 0.7,
					borderColor: "#227099",
					width: "100%",
					marginTop: 10,
					borderRadius: 10,
				}}
				data={filterData}
				contentContainerStyle={{ paddingBottom: 16 }}
				renderItem={({ item }) => {
					return (
						<Pressable
							className="p-2"
							onPress={() => {
								changeDropDown(item.key, item.value);
							}}>
							<Text className="font-font-tmedium">{item.value}</Text>
						</Pressable>
					);
				}}
				ListEmptyComponent={() => {
					return <ErrorMassege containerStyle={"h-[40px]"} />;
				}}
			/>
		</View>
	);
};

export default CustomDropDown;
