import { View, Text } from "react-native";
import React from "react";

const ErrorMassege = ({ err, containerStyle }) => {
	return (
		<View className={`flex  items-center mt-4 h-[70vh] ${containerStyle}`}>
			<Text className="font-tbold text-center text-lg">
				{err ? err : "لا توجد بيانات"}
			</Text>
		</View>
	);
};

export default ErrorMassege;
