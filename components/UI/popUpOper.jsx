import React, { useState, useEffect } from "react";
import { Modal, View, TouchableWithoutFeedback } from "react-native";
import { icons, colors } from "../../constants";
import Toast from "react-native-toast-message";
import FormField from "./FormField";

import MainButton from "./MainButton";
import { toastMessege } from "../../constants";
import ScrollComponent from "./ScrollComponent";

const PopUpOper = ({
	setModalVisible,
	modalVisible,
	handleSubmit,
	isLoading,
	toast,
	data,
	AssetID,
	hourID,
}) => {
	const [formData, setFormData] = useState({
		ATvalue: data ? (data[2]?.toString() == 0 ? "" : data[2]?.toString()) : "",
		ASvalue: data ? (data[1]?.toString() == 0 ? "" : data[1]?.toString()) : "",
		ARvalue: data ? (data[0]?.toString() == 0 ? "" : data[0]?.toString()) : "",
		AssetID: AssetID,
		H: hourID.toString(),
	});
	useEffect(() => {
		//console.log(data);
		setFormData({
			ATvalue: data
				? data[2]?.toString() == 0
					? ""
					: data[2]?.toString()
				: "",
			ASvalue: data
				? data[1]?.toString() == 0
					? ""
					: data[1]?.toString()
				: "",
			ARvalue: data
				? data[0]?.toString() == 0
					? ""
					: data[0]?.toString()
				: "",
			AssetID: AssetID,
			H: hourID.toString(),
		});
	}, [data, hourID]);

	useEffect(() => {
		if (toast?.modal) {
			Toast.show({
				text1:
					toast.type == "error" ? toastMessege.failure : toastMessege.success,
				text2: !toast.text2
					? toast.type === "error"
						? toastMessege.serverError
						: toastMessege.serverSuccess
					: toast.text2,
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
		}
	}, [toast]);

	return (
		<View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}>
				<TouchableWithoutFeedback
					onPress={() => {
						setModalVisible(false);
					}}>
					<View className="flex justify-center items-center bg-[#2B2B2B30] h-[103vh]  blur ">
						<Toast></Toast>
						<TouchableWithoutFeedback onPress={() => {}}>
							<View className="bg-white  w-[80%] h-[60%] p-4 rounded-md ">
								<ScrollComponent
									contentContainerStyle={{ gap: 16 }}
									parentContainerStyle={"min-h-0 h-full"}
									className="flex justify-center items-center flex-col   p-4  ">
									<FormField
										value={formData.ARvalue}
										handleChangeText={(text) => {
											setFormData({ ...formData, ARvalue: text });
										}}
										numeric
										title={"الامبير R"}
										placeholder={"ادخل الامبير R"}
									/>

									<FormField
										value={formData.ASvalue}
										numeric
										handleChangeText={(text) => {
											setFormData({ ...formData, ASvalue: text });
										}}
										title={"الامبير S"}
										placeholder={"ادخل الامبير S"}
									/>
									<FormField
										value={formData.ATvalue}
										handleChangeText={(text) => {
											setFormData({ ...formData, ATvalue: text });
										}}
										numeric
										title={"الامبير T"}
										placeholder={"ادخل الامبير T"}
									/>
									<MainButton
										title={"حفظ"}
										containerStyles={"mt-4"}
										isLoading={isLoading}
										icon={icons.ArrowUpRight}
										handlePress={() => {
											handleSubmit(formData);
										}}></MainButton>
								</ScrollComponent>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

export default PopUpOper;
