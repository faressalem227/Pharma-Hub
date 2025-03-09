import React, { useState } from "react";
import {
	Modal,
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	TouchableWithoutFeedback,
} from "react-native";

import { icons, colors } from "../../constants";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import api from "../../utilities/api";
import { toastMessege } from "../../constants";
const PopUp = ({ updateParent, item, show, closeModel }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({});

	useEffect(() => {
		setFormData(item);
	}, [item]);
	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			const res = await api.put("/operation/department", {
				H: formData.time,
				suck: formData.suck,
				direct: formData.direct,
				kilo: formData.kiloWaat,
				air: formData.airPressure,
				bMerge: formData.bMerge,
				aMerge: formData.aMerge,
			});

			Toast.show({
				type: "success",
				text1: toastMessege.success,
				text2: "تم تسجيل الساعه بنجاح",
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

			setTimeout(() => {
				setIsLoading(false);
				closeModel();
				updateParent(formData);
			}, 1500);
		} catch (error) {
			Toast.show({
				type: "error",
				text1: toastMessege.failure,
				text2: error.response.data.message
					? error.response.data.message
					: toastMessege.serverError,
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
			setIsLoading(false);
			return; // Prevent form submission if fields are empty
		}
	};

	return (
		<View className="">
			<Modal
				animationType="fade"
				transparent={true}
				visible={show}
				onRequestClose={() => {
					closeModel();
				}}>
				<TouchableWithoutFeedback onPress={closeModel}>
					<View style={styles.centeredView}>
						<Toast></Toast>
						<TouchableWithoutFeedback onPress={() => {}}>
							<View style={styles.modalView}>
								<View style={styles.container}>
									<TextInput
										style={styles.input}
										placeholder="أدخل الساعه "
										value={formData?.time}
										keyboardType="numeric"
										className="px-4"
										editable={false}
									/>
									<Text style={styles.textStyle}>س(الساعه)</Text>
								</View>

								<View style={styles.container}>
									<TextInput
										style={styles.input}
										placeholder=" منسوب المص "
										keyboardType="numeric"
										value={formData?.suck?.toString()}
										className="px-4"
										onChangeText={(value) => {
											setFormData({ ...formData, suck: value });
										}}
									/>
									<Text style={styles.textStyle}>منسوب المص</Text>
								</View>

								<View style={styles.container}>
									<TextInput
										style={styles.input}
										placeholder="منسوب الطرد "
										keyboardType="numeric"
										value={formData?.direct?.toString()}
										className="px-4"
										onChangeText={(value) => {
											setFormData({ ...formData, direct: value });
										}}
									/>
									<Text style={styles.textStyle}>منسوب الطرد</Text>
								</View>
								<View style={styles.container}>
									<TextInput
										style={styles.input}
										placeholder="الكيلو وات "
										keyboardType="numeric"
										className="px-4"
										value={formData?.kiloWaat?.toString()}
										onChangeText={(value) => {
											setFormData({ ...formData, kiloWaat: value });
										}}
									/>
									<Text style={styles.textStyle}>الكيلو وات</Text>
								</View>

								<View style={styles.container}>
									<TextInput
										style={styles.input}
										placeholder="ضغط الهواء "
										keyboardType="numeric"
										className="px-4"
										value={formData?.airPressure?.toString()}
										onChangeText={(value) => {
											setFormData({ ...formData, airPressure: value });
										}}
									/>

									<Text style={styles.textStyle}>ضغط الهواء</Text>
								</View>
								<View style={styles.container}>
									<TextInput
										style={styles.input}
										placeholder="المنسوب قبل الشبك"
										keyboardType="numeric"
										className="px-4"
										value={formData?.bMerge?.toString()}
										onChangeText={(value) => {
											setFormData({ ...formData, bMerge: value });
										}}
									/>

									<Text style={styles.textStyle}>المنسوب قبل الشبك</Text>
								</View>
								<View style={styles.container}>
									<TextInput
										style={styles.input}
										placeholder="المنسوب بعد الشبك"
										keyboardType="numeric"
										className="px-4"
										value={formData?.aMerge?.toString()}
										onChangeText={(value) => {
											setFormData({ ...formData, aMerge: value });
										}}
									/>

									<Text style={styles.textStyle}>المنسوب بعد الشبك</Text>
								</View>

								<TouchableOpacity
									onPress={handleSubmit}
									activeOpacity={0.7}
									className={`bg-primary rounded-lg min-h-[33px] flex flex-row justify-center w-[250px] m-3 mt-5 items-center py-3`}>
									<Image
										source={icons.ArrowUpRight}
										className={`h-5 w-5 mr-1`}
									/>
									<Text className={`text-white font-tbold text-md`}>حفظ</Text>

									{isLoading && (
										<ActivityIndicator
											animating={isLoading}
											color="#fff"
											size="small"
											className="ml-2"
										/>
									)}
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		textAlign: "center",
		textAlignVertical: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		backgroundColor: "#2B2B2B3D",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 5,
		padding: 16,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 5,
		padding: 10,
		elevation: 2,
		marginTop: 10,
		width: 250,
	},
	buttonOpen: {
		backgroundColor: colors.primary,
		color: "white",
	},
	buttonClose: {
		backgroundColor: colors.primary,
	},
	textStyle: {
		color: "black",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 14,
	},
	modalText: {
		marginBottom: 10,
		textAlign: "center",
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 4,
		width: "70%",
		borderRadius: 5,
	},
});

export default PopUp;
