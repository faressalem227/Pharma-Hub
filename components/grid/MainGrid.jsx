import React, { useState, useEffect, useRef } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	RefreshControl,
} from "react-native";
import {
	View,
	ScrollView,
	SafeAreaView,
	Alert,
	Dimensions,
	TouchableOpacity,
	Modal,
	Text,
	Image,
	TextInput,
	ActivityIndicator,
	FlatList,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import {
	CustomButton,
	MainButton,
	CheckBox,
	DatePickerInput,
	Dropdown,
} from "../index";
import PencilLine from "../../assets/images/PencilLine.png";
import add_outline from "../../assets/images/add_outline.png";
import trashh from "../../assets/images/trashh.png";
import Warning from "../../assets/images/Warning.png";
import ArrowLineUpRight from "../../assets/images/ArrowLineUpRight.png";
import { useRouter } from "expo-router";
import api from "../../utilities/api";
import { priceFormatter } from "../../utilities/dateFormater";
import { HandleDropdownFormat } from "../../hooks/useDropDownData";
import CustomDropDown from "../UI/CustomDropDown";
import Toast from "react-native-toast-message";

const RenderInput = ({
	inputkey,
	label,
	type,
	value,
	options = [],
	lines = 4,
	onChange,
	setRowData,
	children = [],
	handleDropdownChange,
	dynamicCode,
	code,
}) => {
	const handleInputChange = (key, value, type) => {
		if (type == "dropdown" && handleDropdownChange) {
			handleDropdownChange(inputkey, value);
		}
		setRowData((prevData) => ({ ...prevData, [inputkey]: value }));
	};
	useEffect(() => {
		if (code && dynamicCode && dynamicCode.codeCol == inputkey) {
			handleInputChange(dynamicCode.codeCol, code);
		}
	}, []);

	switch (type) {
		case "sub":
			return (
				<div
					key={inputkey}
					className="flex flex-col w-full gap-3">
					<div className="flex flex-wrap gap-4"></div>
				</div>
			);

		case "number" || "price":
			return (
				<TextInput
					className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
					keyboardType="numeric"
					value={`${
						code && dynamicCode.codeCol == inputkey ? code : value ? value : ""
					}`}
					onChangeText={(text) => handleInputChange(inputkey, text)}
					editable={
						dynamicCode && dynamicCode.codeCol == inputkey ? false : true
					}
				/>
			);

		case "date":
			return (
				<DatePickerInput
					defaultDate={value}
					setDate={(selectedDate) => handleInputChange(inputkey, selectedDate)}
				/>
			);

		case "checkbox":
			return (
				<CheckBox
					value={value}
					isEditable={true}
					onChange={(checked) => handleInputChange(inputkey, checked)}
				/>
			);

		case "text":
			return (
				<TextInput
					className="w-full text-sm font-medium border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
					multiline
					numberOfLines={lines || 4}
					value={`${
						code && dynamicCode.codeCol == inputkey ? code : value ? value : ""
					}`}
					onChangeText={(text) => handleInputChange(inputkey, text)}
					editable={
						dynamicCode && dynamicCode.codeCol == inputkey ? false : true
					}
				/>
			);

		case "dropdown":
			return (
				<Dropdown
					placeholder={"اختر "}
					data={options}
					value={value}
					initailOption={value}
					onChange={(v) => handleInputChange(inputkey, v, type)}
				/>
			);

		default:
			return (
				<TextInput
					className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
					value={`${
						code && dynamicCode.codeCol == inputkey ? code : value ? value : ""
					}`}
					onChangeText={(text) => handleInputChange(inputkey, text)}
					editable={
						dynamicCode && dynamicCode.codeCol == inputkey ? false : true
					}
				/>
			);
	}
};

const MainGrid = ({
	tableHead,
	pk = false,
	spTrx,
	spUpd = null,
	spIns = null,
	spDel = null,
	TrxParam = [],
	UpdParam = [],
	InsParam = [],
	DelParam = [],
	UpdBody = [],
	InsBody = [],
	StaticWidth = false,
	hasCrud = true,
	hasIns = true,
	hasUpd = true,
	hasDel = true,
	hasSpecialButton = false,
	specialButton = [],
	TrxDependency = [],
	routeTo = false,
	mixedWidth = false,
	handleDropDownChange = false,
	highlight = false,
	dynamicCode = false,
}) => {
	const router = useRouter();

	const [refreshing, setRefreshing] = useState(false);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refetch, setRefetch] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [lastClickTime, setLastClickTime] = useState(0);
	const [modelLoader, setModelLoader] = useState(false);
	// Modal states
	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState(""); // "add", "edit", or "delete"
	const [code, setCode] = useState(false);

	const [rowData, setRowData] = useState(
		Object.fromEntries(tableHead.map((col) => [col.key, ""]))
	);

	//(data, "sadojasdhsado");
	const scrollViewRef = useRef(null);

	// Filter the table headers based on the 'visible' property
	const filteredTableHead = tableHead.filter(
		(header) => header.visible === "true"
	);

	// Create state with only visible headers
	const state = {
		tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
	};

	const screenWidth = Dimensions.get("window").width;

	let widthArr = [];

	if (mixedWidth) {
		let widths = 0;
		let count = 0;

		filteredTableHead.map((col) =>
			col.width ? (widths += col.width) : (count += 1)
		);

		widthArr = filteredTableHead.map((col) =>
			col.width ? col.width : (screenWidth - widths) / count
		);
	} else {
		if (StaticWidth) {
			const totalWidth = filteredTableHead.reduce(
				(sum, col) => sum + (col.width || 0),
				0
			);
			if (totalWidth < screenWidth && filteredTableHead.length < 10) {
				widthArr = filteredTableHead.map(
					() => screenWidth / filteredTableHead.length
				);
			} else {
				widthArr = filteredTableHead.map(
					(col) => col.width || screenWidth / filteredTableHead.length
				);
			}
		} else {
			widthArr = filteredTableHead.map(
				() => screenWidth / filteredTableHead.length
			);
		}
	}

	const handleDoubleClick = (row) => {
		if (routeTo) {
			routeTo?.hasParams
				? router.navigate({
						pathname: routeTo.path,
						params: { ...row, ...routeTo.params },
				  })
				: router.navigate({
						pathname: routeTo.path,
				  });
		} else {
			return;
		}
	};

	const handleRowPress = (row, index) => {
		setSelectedRow(row);
	};

	const handleAdd = async () => {
		let Code;
		if (dynamicCode) {
			try {
				const response = await api.get(
					`/table?sp=GetNextCodeForTable&TableName=${dynamicCode.tbName}&CodeFieldName=${dynamicCode.codeCol}`
				);
				Code = response.data.data[0].NextCode;
				setCode(Code);
			} catch (err) {
				Toast.show({
					type: "error",
					text1: "حدث خطأ",
					text2: `حدث خطأ اثناء تنفيذ العمليه حاول مره اخرى ❌`,
					autoHide: true,
					visibilityTime: 3000,
					text1Style: {
						textAlign: "right",
					},
					text2Style: {
						textAlign: "right",
					},
				});
			} finally {
				setLoading(false);
			}
		}
		setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ""])));
		setModalType("add");
		setModalVisible(true);
	};
	const handleEdit = () => {
		if (selectedRow !== null) {
			setRowData(selectedRow);
			setModalType("edit");
			setModalVisible(true);
		} else {
			Toast.show({
				type: "error",
				text1: "حدث خطأ",
				text2: `من فضلك اختر صف لاستكمال العمليه`,
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
		}
	};

	const handleDelete = () => {
		if (selectedRow !== null) {
			setModalType("delete");
			setModalVisible(true);
		} else {
			Toast.show({
				type: "error",
				text1: "حدث خطأ",
				text2: `من فضلك اختر صف لاستكمال العمليه`,
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
		}
	};
	const onRefresh = () => {
		setRefreshing(true);
		setRefetch((prev) => prev + 1);
		setTimeout(() => {
		  setRefreshing(false);
		}, 1000);
	  };

	const confirmAction = async () => {
		try {
			if (modalType === "add") {
				setModelLoader(true);
				let params = ``;
				let url = ``;
				InsParam != [] &&
					InsParam.map((p) =>
						p.rowData
							? (params = params + `&${p.name}=${selectedRow[p.value]}`)
							: (params = params + `&${p.name}=${p.value}`)
					);
				InsParam != []
					? (url = `/table?sp=${spIns}${params}`)
					: `/table?sp=${spIns}`;
				const response = await api.post(url, {
					...rowData,
					...InsBody,
				});
				setModelLoader(false);
				Toast.show({
					type: "success",
					text1: "عملية ناجحه",
					text2: `تمت الاضافة بنجاح ✅`,
					autoHide: true,
					visibilityTime: 3000,
					text1Style: {
						textAlign: "right",
					},
					text2Style: {
						textAlign: "right",
					},
				});
				setRefetch((prev) => prev + 1);
				setData((prevData) => [...prevData, response.data]);
			} else if (modalType === "edit") {
				setModelLoader(true);
				let params = ``;
				let url = ``;
				UpdParam != [] &&
					UpdParam.map((p) =>
						p.rowData
							? (params = params + `&${p.name}=${selectedRow[p.value]}`)
							: (params = params + `&${p.value}=${p.name}`)
					);
				UpdParam != []
					? (url = `/table?sp=${spUpd}${params}`)
					: `/table?sp=${spUpd}`;
				const response = await api.put(url, {
					...rowData,
					...UpdBody,
				});
				setModelLoader(false);
				Toast.show({
					type: "success",
					text1: "عملية ناجحه",
					text2: `تم التعديل بنجاح ✅`,
					autoHide: true,
					visibilityTime: 3000,
					text1Style: {
						textAlign: "right",
					},
					text2Style: {
						textAlign: "right",
					},
				});
				setRefetch((prev) => prev + 1);
				setSelectedRow(null);
			} else if (modalType === "delete") {
				setModelLoader(true);
				let params = ``;
				let url = ``;
				DelParam != [] &&
					DelParam.map((p) =>
						p.rowData
							? (params = params + `&${p.name}=${selectedRow[p.value]}`)
							: (params = params + `&${p.name}=${p.value}`)
					);
				DelParam != []
					? (url = `/table?sp=${spDel}${params}`)
					: `/table?sp=${spDel}`;
				//(url);

				await api.delete(url);
				setModelLoader(false);
				Toast.show({
					type: "success",
					text1: "عملية ناجحه",
					text2: `تم الحذف بنجاح ✅`,
					autoHide: true,
					visibilityTime: 3000,
					text1Style: {
						textAlign: "right",
					},
					text2Style: {
						textAlign: "right",
					},
				});
				setRefetch((prev) => prev + 1);
				setSelectedRow(null);
			}
			setModalVisible(false);
		} catch (error) {
			console.error(error);
			Toast.show({
				type: "error",
				text1: "حدث خطأ",
				text2: `حدث خطأ اثناء تنفيذ العمليه حاول مره اخرى ❌`,
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
			setModalVisible(false);
			setModelLoader(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				let params = ``;
				let url = ``;

				TrxParam != [] &&
					TrxParam.map((p) => (params = params + `&${p.name}=${p.value}`));
				TrxParam != []
					? (url = `/table?sp=${spTrx}${params}`)
					: `/table?sp=${spTrx}`;

				const response = await api.get(url);

				setData(response.data.data);
			} catch (err) {
				console.log(err);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 200);
			}
		};
		fetchData();
	}, [refetch, ...TrxDependency]);

	StaticWidth &&
		useEffect(() => {
			const timeout = setTimeout(() => {
				//("ScrollView Ref:", scrollViewRef.current); // Debugging
				if (scrollViewRef.current) {
					scrollViewRef.current?.scrollToEnd({ animated: false });
				}
			}, 300); // Delay by 100ms to allow rendering

			return () => clearTimeout(timeout); // Cleanup timeout
		}, [scrollViewRef, data]); // Re-run effect when data changes

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<SafeAreaView
					style={{ flex: 1, backgroundColor: "#fff" }}
					keyboardShouldPersistTaps="handled">
					<View
						className="flex flex-col"
						dir="rtl">
						{hasCrud && hasCrud != "false" ? (
							<View style={styles.buttonContainer}>
								{hasIns && (
									<CustomButton
										Icon={add_outline}
										title="إضافه"
										onPress={handleAdd}
									/>
								)}
								{hasUpd && (
									<CustomButton
										Icon={PencilLine}
										title="تعديل"
										onPress={handleEdit}
									/>
								)}
								{hasDel && (
									<CustomButton
										Icon={trashh}
										title="حذف"
										onPress={handleDelete}
									/>
								)}
							</View>
						) : (
							<></>
						)}
						{hasSpecialButton && (
							<View className="justify-end flex-row flex mb-4 w-fit">
								{specialButton &&
									specialButton.map((button, index) => (
										<CustomButton
											key={index}
											Icon={button.icon}
											title={button.title}
											onPress={() => {
												button.action(selectedRow);
											}}
											width={button.width}
											backgroundColor={button.backgroundColor}
											textColor={button.textColor}
										/>
									))}
							</View>
						)}
					</View>

					{loading && refetch == 0 ? (
						<ActivityIndicator
							size="large"
							color="#0000ff"
						/>
					) : error && data == [] ? (
						<Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
					) : (
						<ScrollView
							horizontal={true}
							ref={scrollViewRef}>
							<View className="mb-16">
								{/* Table Header */}
								<Table>
									<Row
										className="flex flex-row-reverse text-base font-tbold font-bold px-1"
										data={state.tableHead} // Visible headers
										widthArr={widthArr} // Dynamic widths
										style={styles.head}
										textStyle={styles.text}
									/>
								</Table>

        {/* Table Body with FlatList */}
        <FlatList
            data={data}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			keyboardShouldPersistTaps="handled"
			scrollEnabled
			nestedScrollEnabled
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: dataRow, index }) => (
                <TouchableOpacity
                    key={index}
					onLongPress={()=>handleDoubleClick(dataRow, index)}
                    onPress={() => handleRowPress(dataRow, index)}>
                    <Row
                        className="flex flex-row-reverse p-2"
                        style={[
                            styles.row,
                            index % 2 === 0 ? { backgroundColor: "#ffffff" } : { backgroundColor: "#f9f9f9" },
                            pk && selectedRow && selectedRow[`${pk}`] === dataRow[`${pk}`] && {
                                backgroundColor: "#227099",
                            },
                            highlight && dataRow[`${highlight.col}`] == highlight.value && {
                                backgroundColor: highlight.bgcolor,
                            },
                        ]}
                        textStyle={styles.text}
                        widthArr={widthArr} // Dynamic widths
                        data={filteredTableHead.map((col, idx) => {
                            const item = dataRow[col.key]; // Get column data

													if (col?.type === "checkbox") {
														return (
															<View
																key={idx}
																style={{
																	width: widthArr[idx],
																	justifyContent: "center",
																	alignItems: "center",
																}}>
																<CheckBox
																	value={item}
																	isEditable={false}
																	onChange={() => {}}
																/>
															</View>
														);
													} else {
														return (
															<Text
																className="line-clamp-3"
																key={idx}
																style={[
																	styles.text,
																	{
																		width: widthArr[idx],
																		textAlign: "center",
																		overflow: "hidden",
																		display: "-webkit-box",
																		WebkitBoxOrient: "vertical",
																		WebkitLineClamp: 3,
																	},
																	pk &&
																		selectedRow &&
																		selectedRow[`${pk}`] ===
																			dataRow[`${pk}`] && {
																			color: "#ffffff",
																		},
																]}
																numberOfLines={3}>
																{col.type === "date" && item
																	? item?.split("T")[0]
																	: col.type === "price"
																	? priceFormatter(item)
																	: item}
															</Text>
														);
													}
												})}
											/>
										</TouchableOpacity>
									)}
								/>
							</View>
						</ScrollView>
					)}

					{/* Modal */}
					<Modal
						animationType="fade"
						visible={modalVisible}
						transparent={true}>
						<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
							<View
								style={styles.modalOverlay}
								dir={"rtl"}>
								<TouchableWithoutFeedback>
									<View style={styles.modalContent}>
										{modalType !== "delete" ? (
											<>
												<FlatList
													keyboardShouldPersistTaps="handled"
													maxToRenderPerBatch={10}
													windowSize={5}
													initialNumToRender={10}
													style={{
														maxHeight: screenWidth,
														width: "100%",
														marginBottom: 5,
													}}
													data={tableHead}
													keyExtractor={(item) => item.key}
													contentContainerStyle={{
														paddingHorizontal: 16,
														paddingVertical: 8,
													}}
													nestedScrollEnabled
													renderItem={({ item }) => {
														return (
															<>
																{item?.input === "true" && (
																	<View style={styles.inputContainer}>
																		<Text className="text-base font-tmedium font-medium my-2">
																			{item.label}
																		</Text>
																		<KeyboardAvoidingView behavior="padding">
																			<RenderInput
																				inputkey={item.key}
																				label={item.label}
																				type={item.type}
																				value={rowData[item.key]}
																				options={item.options}
																				lines={item.lines}
																				setRowData={setRowData}
																				handleDropdownChange={
																					handleDropDownChange
																				}
																				dynamicCode={dynamicCode}
																				code={code}
																			/>
																		</KeyboardAvoidingView>
																	</View>
																)}
															</>
														);
													}}
												/>

												<MainButton
													title={modalType === "add" ? "إضافه" : "حفظ التعديل"}
													icon={ArrowLineUpRight}
													handlePress={confirmAction}
													isLoading={modelLoader}
													containerStyles={"mt-4 flex items-center "}
												/>
											</>
										) : (
											<View className="text-center ">
												<Image
													source={Warning}
													className="mx-auto w-16 h-16"></Image>
												<Text className="font-tbold text-center">
													هل تريد تأكيد عملية الحذف؟
												</Text>
												<Text className="font-tmedium text-center">
													يرجي العلم انه سوف تفقد كافة البيانات الخاصة بهذا
													الادخال{" "}
												</Text>
												<View className="flex flex-row justify-center mt-4 ">
													<TouchableOpacity
														className=" rounded-md px-4 py-2 bg-none  border-[.5px] border-[#133E54] mx-2  w-[69px]  flex flex-row justify-center items-center"
														onPress={() => setModalVisible(false)}>
														<Text className="font-tbold text-[#133E54]">
															إلغاء
														</Text>
													</TouchableOpacity>
													<TouchableOpacity
														className="mx-2 rounded-md  bg-[#F15555] w-[69px] flex flex-row justify-center items-center"
														onPress={confirmAction}>
														<Text className="font-tbold text-white">حذف</Text>
														{modelLoader && (
															<ActivityIndicator
																animating={modelLoader}
																color="#fff"
																size="small"
																className="ml-2"
															/>
														)}
													</TouchableOpacity>
												</View>
											</View>
										)}
									</View>
								</TouchableWithoutFeedback>
							</View>
						</TouchableWithoutFeedback>
					</Modal>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = {
	buttonContainer: {
		flexDirection: "row-reverse",
		marginBottom: 16,
	},
	head: {
		height: 50,
		backgroundColor: "#F6F6F6",
	},
	text: {
		textAlign: "center",
		fontFamily: "Tajawal-Medium",
		fontSize: 16,
	},
	row: {
		// height: "fit-contant",
		justifyContent: "center",
		alignItems: "center",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "80%",
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: 8,
		alignItems: "center",
	},
	inputContainer: {
		marginBottom: 10,
		width: "100%",
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 8,
	},
	warningImage: {
		width: 50,
		height: 50,
		marginBottom: 20,
	},
	warningText: {
		textAlign: "center",
		fontSize: 16,
		marginBottom: 20,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
};

export default MainGrid;
