import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "../../constants";

const ProgressBar = ({ ShedulePeriodHours, hours }) => {
	const widthAnim = useRef(new Animated.Value(0)).current;
	const [text, setText] = useState(null);
	const value =
		(hours / (ShedulePeriodHours == null ? 10000 : ShedulePeriodHours)) * 100;
	useEffect(() => {
		Animated.timing(widthAnim, {
			toValue: value,
			duration: 500,
			useNativeDriver: false,
		}).start();

		if (value >= 99) {
			setText("تحتاج الي عمره");
		} else {
			setText(Math.round(hours).toString());
		}
	}, [value]);

	const getColor = () => {
		if (value < 20) {
			return ["#00cc00", "#019444"];
		} else if (value < 50) {
			return ["#00ff00", "#00cc00"];
		} else if (value < 75) {
			return ["#ffbf00", "#ff8000"];
		} else {
			return ["#ff0000", "#ff4000"];
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.batteryShell}>
				<Animated.View
					style={[
						styles.progress,
						{
							width: widthAnim.interpolate({
								inputRange: [0, 100],
								outputRange: ["0%", "100%"],
							}),
						},
					]}>
					<LinearGradient
						colors={getColor()}
						style={styles.gradient}
					/>
				</Animated.View>
			</View>
			{text == "تحتاج الي عمره" ? (
				<Text className=" font-tbold text-[8px] text-[#F15555] mt-1">
					<Image
						className="h-3 w-3"
						source={icons.warning}
						resizeMode="contain"
					/>
					&nbsp;
					{text}
				</Text>
			) : (
				<Text className=" font-tbold text-[10px] mt-1">
					{text} /{" "}
					{ShedulePeriodHours == null ? 10000 : ShedulePeriodHours.toString()}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginTop: 5,
	},
	batteryShell: {
		width: 60,
		height: 8,
		borderWidth: 0.8,
		borderColor: "#333",
		borderRadius: 2,
		overflow: "hidden",
		justifyContent: "center",
		position: "relative",
	},
	progress: {
		height: "100%",
	},
	gradient: {
		flex: 1,
	},
});

export default ProgressBar;
