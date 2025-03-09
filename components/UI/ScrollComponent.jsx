import { View, Text } from "react-native";
import React from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { RefreshControl } from "react-native";

const ScrollComponent = ({
	children,
	contentContainerStyle,
	parentContainerStyle,
	isLoading,
	refreshingFunction,
}) => {
	return (
		<View className={`min-h-[73vh] ${parentContainerStyle} `}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 64}>
				<ScrollView
					refreshControl={
						refreshingFunction ? (
							<RefreshControl
								refreshing={isLoading}
								onRefresh={refreshingFunction}
							/>
						) : null
					}
					contentContainerStyle={contentContainerStyle}
					keyboardShouldPersistTaps="handled">
					{children}
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ScrollComponent;
