import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Modal } from "react-native";
import MainButton from "./MainButton";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { icons, toastMessege } from "../../constants";
import FormField from "./FormField";
import { useGlobalContext } from "../../context/GlobalProvider";
const PopUpEditInv = ({
	setModalVisible,
	modalVisible,
	toast,
	updateItem,
	data,
}) => {
	const { user } = useGlobalContext();
	const [submission, setSubmission] = useState(false);
	const [formData, setFormData] = useState({
		ItemCode: "",
		ItemName: "",
		Balance: "",
		DepartmentID: user.DepartmentID,
	});

	const submit = async () => {
		setSubmission(true);

		try {
			await updateItem(formData, data.ItemID);
		} catch (error) {
			//console.log(error);
		} finally {
			setSubmission(false);
			setFormData({
				ItemCode: "",
				ItemName: "",
				Balance: "",
				DepartmentID: user.DepartmentID,
			});
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
			setFormData({ ...data, DepartmentID: user.DepartmentID });
		} else {
			setFormData({
				ItemCode: "",
				ItemName: "",
				Balance: "",
				DepartmentID: user.DepartmentID,
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
									title={"الصنف "}
									placeholder={" اسم الصنف"}
									editable={false}
									value={formData.ItemName?.toString()}
									handleChangeText={(text) => {
										// setFormData({ ...formData, ItemName: text });
									}}
								/>
								<FormField
									title={"كود الصنف"}
									placeholder={"كود الصنف "}
									numeric
									editable={false}
									value={formData.ItemCode?.toString()}
									handleChangeText={(text) => {}}
								/>
								<FormField
									title={"الكمية"}
									placeholder={"ادخل الكمية"}
									value={formData.Balance?.toString()}
									handleChangeText={(text) => {
										setFormData({ ...formData, Balance: text });
									}}
									numeric
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

export default PopUpEditInv;
