import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import { Modal } from "react-native";
import MainButton from "./MainButton";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { toastMessege } from "../../constants";
const PopUpConfirmation = ({
	setModalVisible,
	modalVisible,
	confirmFunction,
	warnningText = "هل انت متاكد من الحذف ؟",
	confirmText = "نعم",
	cancelText = "لا",
	toast,
}) => {
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
						<Toast></Toast>
						<TouchableNativeFeedback onPress={() => {}}>
							<View className="p-4 w-[90%]  ">
								<View className="flex w-[100%] py-4 justify-center items-center gap-y-6 bg-white rounded-lg ">
									<View>
										<Text className=" font-tbold"> {warnningText}</Text>
									</View>
									<View className="flex flex-row-reverse items-center justify-center">
										<View className=" w-[30%] max-h-[40px] ml-3 ">
											<MainButton
												containerStyles={"min-h-[33px]"}
												title={confirmText}
												handlePress={confirmFunction}></MainButton>
										</View>
										<View className=" w-[30%] ">
											<MainButton
												containerStyles={"min-h-[33px]"}
												title={cancelText}
												handlePress={() => {
													setModalVisible(false);
												}}></MainButton>
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

export default PopUpConfirmation;
