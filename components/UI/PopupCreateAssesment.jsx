import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Modal } from "react-native";
import MainButton from "./MainButton";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { icons, toastMessege } from "../../constants";
import FormField from "./FormField";
const PopupCreateAssesment = ({
	setModalVisible,
	modalVisible,
	toast,
	submitData,
	data,
}) => {
	const [submission, setSubmission] = useState(false);
	const [formData, setFormData] = useState({
		ItemCount: "",
		ItemUnit: "",
		ItemName: "",
		ItemCost: "",
	});
	const [localToast, setlocalToast] = useState({
		text1: "",
		text2: "",
		modal: false,
		type: "",
	});
	const submit = async () => {
		setSubmission(true);

		try {
			if (data) {
				await submitData(formData, data.ItemNo);
			} else {
				await submitData(formData);
			}
		} catch (error) {
			//console.log(error);
		} finally {
			setSubmission(false);
			setFormData({ count: "", itemName: "", cost: "" });
		}
	};

	useEffect(() => {
		if (toast?.modal) {
			Toast.show({
				type: toast?.type,
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

	useEffect(() => {
		if (data) {
			setFormData(data);
		} else {
			setFormData({
				ItemCount: "",
				ItemUnit: "",
				ItemName: "",
				ItemCost: "",
			});
		}
	}, [data]);
	return (
		<View
			className="bg-transparent "
			style={{ backdropFilter: "blur(5px)" }}>
			<Modal
				animationType="fade"
				visible={modalVisible}
				transparent={true}>
				<TouchableWithoutFeedback
					onPress={() => {
						setModalVisible(false);
					}}>
					<View className="bg-[#2B2B2B30] w-full h-full flex justify-center items-center">
						<Toast></Toast>
						<TouchableWithoutFeedback onPress={() => {}}>
							<View
								className="p-4 w-[90%] bg-white  flex flex-col rounded-md  "
								style={{ gap: 16 }}>
								<FormField
									title={"بند"}
									value={formData.ItemName?.toString()}
									handleChangeText={(text) => {
										setFormData({ ...formData, ItemName: text });
									}}
									placeholder={"ادخل البند"}
								/>
								<FormField
									title={"الكمية"}
									placeholder={"ادخل الكمية "}
									value={formData.ItemCount?.toString()}
									handleChangeText={(text) => {
										setFormData({ ...formData, ItemCount: text });
									}}
									numeric
								/>
								<FormField
									title={"السعر"}
									placeholder={"ادخل السعر"}
									numeric
									value={formData.ItemCost?.toString()}
									handleChangeText={(text) => {
										setFormData({ ...formData, ItemCost: text });
									}}
								/>
								<FormField
									title={"وحدة القياس"}
									placeholder={"ادخل وحدة القياس"}
									value={formData.ItemUnit}
									handleChangeText={(text) => {
										setFormData({ ...formData, ItemUnit: text });
									}}
								/>
								<View className="p-4">
									<MainButton
										title={"حفظ"}
										icon={icons.ArrowUpRight}
										isLoading={submission}
										handlePress={() => {
											submit();
										}}></MainButton>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

export default PopupCreateAssesment;
