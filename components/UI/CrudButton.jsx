import React from "react";
import { View } from "react-native";
import {
	TouchableOpacity,
	Text,
	Image,
	StyleSheet,
	ActivityIndicator,
} from "react-native";

const CrudButton = ({
	title,
	onPress,
	width,
	Icon,
	Loading,
	backgroundColor,
	textColor,
}) => {
	// Define styles based on the title prop if custom colors are not provided
	let buttonBackgroundColor = backgroundColor;
	let buttonTextColor = textColor;

	if (!backgroundColor || !textColor) {
		switch (title) {
			case "إضافه":
				buttonBackgroundColor = "#E8F0EE";
				buttonTextColor = "#428C71";
				break;
			case "تعديل":
				buttonBackgroundColor = "#E8F0EE";
				buttonTextColor = "#227099";
				break;
			case "حذف":
				buttonBackgroundColor = "#F9EAEB";
				buttonTextColor = "#F15555";
				break;
			case "جدول زمني":
				buttonBackgroundColor = "#E4EDF2";
				buttonTextColor = "#227099";
				break;
			default:
				buttonBackgroundColor = "#E4EDF2"; // Default background
				buttonTextColor = "#428C71"; // Default text color
		}
	}

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: buttonBackgroundColor, width: width || "auto" },
			]}
			onPress={onPress}>
			{Loading ? (
				<ActivityIndicator
					size="small"
					color="#0000ff"
				/>
			) : (
				<>
					<Text style={[styles.text, { color: buttonTextColor }]}>{title}</Text>
					{Icon && (
						<Image
							source={Icon}
							style={styles.icon}
						/>
					)}
				</>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 8,
		marginHorizontal: 5,
		flexDirection: "row-reverse",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	text: {
		fontFamily: "Tajawal-Regular",
		fontSize: 14, // Adjust font size as needed
	},
	icon: {
		width: 15,
		height: 15,
		marginLeft: 5,
	},
});

export default CrudButton;

// import React from "react";
// import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
// import { ActivityIndicator } from "react-native";
// const CrudButton = ({ title, onPress, width, Icon, Loading }) => {
// 	// Define styles based on the title prop
// 	let backgroundColor;
// 	let textColor;

// 	switch (title) {
// 		case "إضافه":
// 			backgroundColor = "#E8F0EE";
// 			textColor = "#428C71";
// 			break;
// 		case "تعديل":
// 			backgroundColor = "#E8F0EE";
// 			textColor = "#227099";
// 			break;
// 		case "حذف":
// 			backgroundColor = "#F9EAEB";
// 			textColor = "#F15555";
// 			break;
// 		case "جدول زمني":
// 			backgroundColor= "#E4EDF2";
// 			textColor = "#227099";
// 			break;
// 		default:
// 			backgroundColor = backgroundColor? backgroundColor: "#E4EDF2" ; // Default style
// 			textColor = textColor?textColor:"#428C71";
// 	}

// 	return (
// 		<TouchableOpacity
// 			style={[styles.button, { backgroundColor, width: width || "auto" }]}
// 			onPress={onPress}>
// 			{Loading ? (
// 				<ActivityIndicator
// 					size="small"
// 					color="#0000ff"
// 				/>
// 			) : (
// 				<>
// 					<Text
// 						className="font-tmedium text-sm font-medium"
// 						style={[{ color: textColor }]}>
// 						{title}
// 					</Text>
// 					{Icon && (
// 						<Image
// 							source={Icon}
// 							style={[styles.icon]}
// 						/>
// 					)}
// 				</>
// 			)}
// 		</TouchableOpacity>
// 	);
// };

// const styles = StyleSheet.create({
// 	button: {
// 		padding: 10,
// 		borderRadius: 8,
// 		marginHorizontal: 5,
// 		flexDirection: "row",
// 		alignItems: "center",
// 		fontFamily: "Tajawal-Regular",
// 	},

// 	icon: {
// 		width: 15,
// 		height: 15,
// 		margin: 5,
// 	},
// });

// export default CrudButton;
