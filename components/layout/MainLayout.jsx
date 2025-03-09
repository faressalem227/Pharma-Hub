import Header from "./header";
import { View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Loader from "../UI/Loader";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { toastMessege } from "../../constants";
import CustomMenu from "./CustomMenu";
import { useState } from "react";
import LogoBar from "./LogoBar";
const MainLayout = ({
	children,
	title,
	loading = false,
	hasLeftComponent = false,
	toast,
}) => {
	const [menu, setMenu] = useState(false);

	useEffect(() => {
		if (toast?.type && !toast?.modal) {
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

	const onDrawerPress = () => {
		setMenu(true);
	};

	return (
		<View className="bg-white h-full relative ">
			<Toast />

			<CustomMenu
				modalVisible={menu}
				setModalVisible={() => {
					setMenu(false);
				}}
			/>
			<LogoBar/>
			<Header
				onDrawerPress={() => onDrawerPress()}
				hasLeftComponent={hasLeftComponent}
				title={title}
			/>

			<View style={{ zIndex: 0 }}>
				{loading ? (
					<Loader
						minus={140}
						isLoading={loading}
					/>
				) : (
					<>{children}</>
				)}
			</View>
		</View>
	);
};
export default MainLayout;
