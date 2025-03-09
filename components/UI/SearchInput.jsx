import React, { useState, useRef } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";

const DarkBlue = "#0047ab"; // Assuming this is the color you want to use

const SearchInput = ({ setQuery }) => {
	const [searchText, setSearchText] = useState("");
	const inputRef = useRef(null);

	const handleSearch = () => {
		// Add your search logic here
		setQuery(searchText);
	};

	const activateSearchInput = () => {
		inputRef.current.focus();
	};

	return (
		<View
			style={styles.container}
			className="mx-auto my-4">
			<TextInput
				ref={inputRef}
				style={styles.input}
				placeholder="بحث عن الاصناف المخزنيه"
				value={searchText}
				onChangeText={setSearchText}
				placeholderTextColor="#999"
				underlineColorAndroid="transparent"
				returnKeyType="search"
				onSubmitEditing={handleSearch}
			/>
			<TouchableOpacity
				style={styles.iconButton}
				onPress={activateSearchInput}>
				<Image
					className="my-6 w-4 h-4"
					resizeMethod="cover"
					source={require("../../assets/images/MagnifyingGlass.png")}
					style={styles.searchIcon}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 0.5,
		borderColor: "#1C5B7D",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		height: 56,
		direction: "rtl",
		width: "90%",
	},
	input: {
		flex: 1,
		fontSize: 14,
		height: 56,
	},
	iconButton: {},
	searchIcon: {
		marginLeft: 10,

		// position:"absolute",
		width: 22,
		height: 22,
		// right:"7%",
		// padding:4,
	},
});

export default SearchInput;
