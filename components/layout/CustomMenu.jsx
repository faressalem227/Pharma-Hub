import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Modal,
	TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import MainButton from "../UI/MainButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { TouchableNativeFeedback } from "react-native";

const CustomMenu = ({ modalVisible, setModalVisible }) => {
	const { logOut, user } = useGlobalContext();
	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (e) {
			//console.log(e);
		}
	};
	return (
		<View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<TouchableWithoutFeedback
					onPress={() => {
						setModalVisible(false);
					}}>
					<View className="w-[100%]  bg-[#2b2b2b70] z-10 h-full items-end  ">
						<TouchableWithoutFeedback onPress={() => {}}>
							<View className="bg-white h-full z-40 w-[80%] pt-[80px] rounded-l-[30px] ">
								<View
									className="border-b-[#E4E7EC] border-b  p-4 "
									style={styles.itemContainer}>
									<View className="flex-row-reverse justify-between items-center">
										<View className=" flex-row-reverse items-center gap-2   ">
											<Image
												className="w-4 h-4"
												resizeMode="contain"
												source={icons.User}
											/>
											<Text
												className="font-tregular"
												style={styles.paragraph}>
												{user ? user.username : ""}
											</Text>
										</View>
									</View>
								</View>

								<TouchableOpacity
									onPress={() => {
										setModalVisible(false);
									}}
									className="border-b-[#E4E7EC] border-b  p-4 "
									style={styles.itemContainer}>
									<View className="flex-row-reverse justify-between items-center">
										<View className=" flex-row-reverse items-center gap-2   ">
											<Image
												className="w-4 h-4"
												resizeMode="contain"
												source={icons.House}
											/>
											<Text
												className="font-tregular"
												style={styles.paragraph}>
												الصفحة الرئيسيه
											</Text>
										</View>
										<Image
											source={icons.CaretLeft}
											className="w-4 h-4"
										/>
									</View>
								</TouchableOpacity>
								<View
									className="border-b-[#E4E7EC] border-b  p-4 "
									style={styles.itemContainer}>
									<View className="flex-row-reverse justify-between items-center">
										<View className=" flex-row-reverse items-center gap-2   ">
											<Image
												className="w-4 h-4"
												resizeMode="contain"
												source={icons.Globe}
											/>
											<Text
												className="font-tregular"
												style={styles.paragraph}>
												الدولة
											</Text>
										</View>
										<Image
											source={icons.egyptFlag}
											className="w-4 h-4"
										/>
									</View>
								</View>
								<View
									className="border-b-[#E4E7EC] border-b  p-4 "
									style={styles.itemContainer}>
									<View className="flex-row-reverse justify-between items-center">
										<View className=" flex-row-reverse items-center gap-2   ">
											<Image
												className="w-4 h-4"
												resizeMode="contain"
												source={icons.flag}
											/>
											<Text
												className="font-tregular"
												style={styles.paragraph}>
												اللغة
											</Text>
										</View>
										<Text style={styles.paragraph}>العربية</Text>
									</View>
								</View>
								<View
									className="border-b-[#E4E7EC] border-b  p-4 "
									style={styles.itemContainer}>
									<View className="flex-row-reverse justify-between items-center">
										<View className=" flex-row-reverse items-center gap-2   ">
											<Image
												className="w-4 h-4"
												resizeMode="contain"
												source={icons.notifcationBell}
											/>
											<Text
												className="font-tregular"
												style={styles.paragraph}>
												التنبيهات
											</Text>
										</View>
										<Image
											source={icons.CaretLeft}
											className="w-4 h-4"
										/>
									</View>
								</View>

								<View className="mt-[40px]">
									<MainButton
										icon={icons.SignOut}
										iconStyles={""}
										containerStyles={
											"m-auto mt-[100px] w-[250px] min-h-[50px]    "
										}
										handlePress={handleLogOut}
										title={"تسجيل الخروج"}></MainButton>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

export default CustomMenu;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
