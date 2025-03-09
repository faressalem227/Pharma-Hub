import { View, Text, TouchableNativeFeedback, Pressable } from "react-native";
import React from "react";
import { Modal } from "react-native";
import MainButton from "./MainButton";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { icons, toastMessege } from "../../constants";
import { Image } from "expo-image";
const PopUpLegend = ({ setModalVisible, modalVisible }) => {
	const legend = [
		{ color: "green", title: "يعمل" },
		{ color: "orange", title: "متوقف" },
		{ color: "blue", title: "بلاغ" },
		{
			color: "red",
			title: "الاعطال",
		},
		{
			color: "brown",
			title: "العمرة",
		},
		{
			color: "black",
			title: "خارج الخدمة",
		},
	];
	return (
		<View className="bg-transparent ">
			<Modal
				animationType="fade"
				visible={modalVisible}
				transparent={true}>
				<TouchableNativeFeedback
					onPress={() => {
						setModalVisible(false);
					}}>
					<View className="bg-[#2B2B2B30] w-full h-full flex justify-center items-center">
						<TouchableNativeFeedback onPress={() => {}}>
							<View className="p-4 w-[90%]  ">
								<View className="flex w-[100%] justify-center items-center gap-y-6 bg-white rounded-lg  ">
									<View className="border-b border-primary flex-row-reverse justify-between  w-[90%] pb-2 ">
										<Text className="text-lg text-primary font-tbold">
											{" "}
											ارشادات الالوان
										</Text>
										<Pressable
											onPress={() => {
												setModalVisible(false);
											}}>
											<Image
												style={{ width: 24, height: 24 }}
												source={icons.x}></Image>
										</Pressable>
									</View>
									<View className=" w-full  px-8 py-6 ">
										<View
											className="flex flex-col "
											style={{ gap: 16 }}>
											{legend.map((item, index) => (
												<View
													key={index}
													style={{ gap: 8 }}
													className="flex flex-row-reverse items-center pr-8     ">
													<View
														className={`rounded-full w-8 h-8 ml-4`}
														style={{
															backgroundColor: item.color,
														}}></View>

													<Text className="font-tmedium text-lg items-center flex">
														{item.title}
													</Text>
												</View>
											))}
										</View>
									</View>
								</View>
							</View>
						</TouchableNativeFeedback>
					</View>
				</TouchableNativeFeedback>
			</Modal>
		</View>
	);
};

export default PopUpLegend;
