import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

const MainButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
	icon,
	iconStyles,
	disabled,
	ActivityIndicatorColor,
	alternative = false,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`${
				alternative ? " border border-primary " : "bg-primary"
			}  rounded-lg min-h-[62px] px-16 text-center flex flex-row justify-center w-full items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading || disabled ? true : false}>
			{icon ? (
				<Image
					source={icon}
					className={`h-6 w-6 mr-6  ${iconStyles}`}
				/>
			) : (
				""
			)}
			<Text
				className={`${
					alternative ? "text-primary" : "text-white"
				}  text-lg text-center font-tmedium  ${textStyles} `}>
				{title}
			</Text>

			{isLoading && (
				<ActivityIndicator
					animating={isLoading}
					color={
						ActivityIndicatorColor
							? ActivityIndicatorColor
							: alternative
							? "#227099"
							: "#fff"
					}
					size="small"
					className="ml-2"
				/>
			)}
		</TouchableOpacity>
	);
};

export default MainButton;
