import { View, ActivityIndicator, Dimensions } from "react-native";

const Loader = ({ isLoading, minus, height, width }) => {
	const screenHeight = Dimensions.get("screen").height;

	if (!isLoading) return null;

	return (
		<View
			className="absolute flex justify-center items-center  bg-white z-10"
			style={{
				height: height ? height : screenHeight - (minus ? minus : 0),
				width: width ? width : "100%",
			}}>
			<ActivityIndicator
				size={80}
				animating={isLoading}
				color="#227099"
			/>
		</View>
	);
};

export default Loader;
