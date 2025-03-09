import React, { useState, useEffect, useRef } from "react";
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
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  FlatList,
  Linking,
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
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const RenderInput = ({ inputkey, label, type, value, options = [], lines = 4, onChange, setRowData, children = [], handleDropdownChange }) => {
  const handleInputChange = (key, value, type) => {
    console.log(type);

    if (type == "dropdown" && handleDropdownChange) {
      handleDropdownChange(inputkey, value)
    }
    setRowData((prevData) => ({ ...prevData, [inputkey]: value }));
  };
  switch (type) {
    case "sub":
      return (
        <div key={inputkey} className="flex flex-col w-full gap-3">
          <div className="flex flex-wrap gap-4">
            {/* {children?.map((child) => (
              <div key={child.key} className="w-full">
                <RenderInput key={keychild.key} label={child.label} type={child.type} value={child.value} options={child.options} onChange={onChange} children={child.children}/>}
              </div>
            ))} */}
          </div>
        </div>
      );

    case "number" || "price":
      return (
        <TextInput
          className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
          keyboardType="numeric"
          value={`${value ? value : ""}`}
          onChangeText={(text) => handleInputChange(inputkey, text)}
        />
      );

    case "text":
      return (
        <TextInput
          className="w-full text-sm font-medium border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
          multiline
          numberOfLines={lines || 4}
          value={value}
          onChangeText={(text) => handleInputChange(inputkey, text)}
        />
      );

    case "dropdown":
      console.log("4444444444444444444444444444444444");

      return (
        <Dropdown
          placeholder={"اختر "}
          data={options}
          value={value}
          initailOption={value}
          onChange={(v) => handleInputChange(inputkey, v, type)}
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

    default:
      return (
        <TextInput
          className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
          value={value}
          onChangeText={(text) => handleInputChange(inputkey, text)}
        />
      );
  }
};

const ImageGrid = ({
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
  handleDropDownChange = false
}) => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [modelLoader, setModelLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "add", "edit", or "delete"
  const [rowData, setRowData] = useState(
    Object.fromEntries(tableHead.map((col) => [col.key, ""]))
  );
  const [image, setImage] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const scrollViewRef = useRef(null);

  const filteredTableHead = tableHead.filter(
    (header) => header.visible === "true"
  );

  const state = {
    tableHead: filteredTableHead.map((col) => col.label),
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
    const imageKey = tableHead.find((col) => col.type === "image")?.key;
    if (imageKey && row[imageKey]) {
      setFullScreenImage(row[imageKey]);
    }
  };

  const handleRowPress = (row, index) => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastClickTime;

    if (timeDifference < 2000 && routeTo) {
      setLastClickTime(0);
      handleDoubleClick(row);
    } else {
      setSelectedRow(row);
      setLastClickTime(currentTime);
    }
  };

  const handleAdd = () => {
    setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ""])));
    setModalType("add");
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      console.log(selectedRow, "55555555555");

      setRowData(selectedRow);
      setModalType("edit");
      setModalVisible(true);
    } else {
      Alert.alert("Please select a row to edit.");
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      setModalType("delete");
      setModalVisible(true);
    } else {
      Alert.alert("Please select a row to delete.");
    }
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
        console.log(url);

        await api.delete(url);
        setModelLoader(false);
        setRefetch((prev) => prev + 1);
        setSelectedRow(null);
      }
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      setModelLoader(false);
    }
  };
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  // Function to handle image click
  const handleImageClick = () => {
    setImageModalVisible(true); // Show the modal
  };

  // Function to close the modal
  const closeImageModal = () => {
    setImageModalVisible(false); // Hide the modal
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
            assetType: ['photo', 'video'], //
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
    }
    catch(err)
    {
        console.log(err)
    }
  };


  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'قم بإختيار صورة ',
      '',
      [
        {
          text: 'تصوير',
          onPress: takePhoto,
        },
        {
          text: 'أختيار من صور الموبايل',
          onPress: pickImage,
        },
        {
          text: 'إلغاء',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let params = ``;
        let url = ``;

        console.log(TrxParam);

        TrxParam != [] &&
          TrxParam.map((p) => (params = params + `&${p.name}=${p.value}`));
        TrxParam != []
          ? (url = `/table?sp=${spTrx}${params}`)
          : `/table?sp=${spTrx}`;
        console.log(url);

        const response = await api.get(url);
        console.log(response);

        setData(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
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
        console.log("ScrollView Ref:", scrollViewRef.current); // Debugging
        if (scrollViewRef.current) {
          scrollViewRef.current?.scrollToEnd({ animated: false });
        }
      }, 300); // Delay by 100ms to allow rendering

      return () => clearTimeout(timeout); // Cleanup timeout
    }, [scrollViewRef, data]); // Re-run effect when data changes

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex flex-col" dir="rtl">
        {hasCrud && (
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
              <CustomButton Icon={trashh} title="حذف" onPress={handleDelete} />
            )}
          </View>
        )}

        {hasSpecialButton && (
          <View className="justify-end flex-row flex mb-4 w-fit">
            {specialButton &&
              specialButton.map((button, index) => (
                <CustomButton
                  key={index}
                  Icon={button.icon}
                  title={button.title}
                  onPress={button.action}
                  width={button.width}
                  backgroundColor={button.backgroundColor}
                  textColor={button.textColor}
                />
              ))}
          </View>
        )}
      </View>

      {loading && refetch == 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error && data == [] ? (
        <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
      ) : (
        <ScrollView horizontal={true} ref={scrollViewRef}>
          <View className="mb-16">
            <Table>
              <Row
                className="flex flex-row-reverse text-base font-tbold font-bold px-1"
                data={state.tableHead} // Visible headers
                widthArr={widthArr} // Dynamic widths
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView>
              <Table>
                {data.map((dataRow, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleRowPress(dataRow, index);
                    }}
                  >
                    <Row
                      className="flex flex-row-reverse p-2"
                      style={[
                        styles.row,
                        index % 2 === 0
                          ? { backgroundColor: "#ffffff" }
                          : { backgroundColor: "#f9f9f9" },
                        pk &&
                          selectedRow &&
                          selectedRow[`${pk}`] === dataRow[`${pk}`] && {
                            backgroundColor: "#227099",
                          },
                      ]}
                      textStyle={[styles.text]}
                      widthArr={widthArr} // Dynamic widths
                      data={filteredTableHead.map((col, idx) => {
                        const item = dataRow[col.key]; // Get the corresponding column data
                        if (col?.type === "checkbox") {
                          // Return JSX inside a wrapper for checkbox columns
                          return (
                            <View
                              key={idx}
                              style={{
                                width: widthArr[idx], // Set width for each column
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CheckBox
                                value={item}
                                isEditable={false}
                                onChange={(newValue) => {}}
                              />
                            </View>
                          );
                        } else if (col?.type === "image") {
                          // Return JSX inside a wrapper for image columns
                          return (
                            <TouchableOpacity
                              key={idx}
                              style={{
                                width: widthArr[idx],
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => handleDoubleClick(dataRow)}
                            >
                              {item ? (
                                <Image
                                  source={{ uri: item }}
                                  style={{ width: 50, height: 50, borderRadius: 8 }}
                                />
                              ) : (
                                <Icon name="image" size={30} color="#1C5B7D" />
                              )}
                            </TouchableOpacity>
                          );
                        } else {
                          // Return plain text for other column types
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
                                selectedRow[`${pk}`] === dataRow[`${pk}`] && {
                                  color: "#ffffff",
                                },
                              ]}
                              numberOfLines={3}
                            >
                              {col.type === "date" && item ? item?.split("T")[0] : col.type === "price" ? priceFormatter(item) : item}
                            </Text>
                          );
                        }
                      })}
                    />
                  </TouchableOpacity>
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      )}

      {/* Modal */}
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} dir={"rtl"}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {modalType !== "delete" ? (
                  <>
                    <FlatList
                      maxToRenderPerBatch={20}
                      style={{
                        maxHeight: screenWidth + 100,
                        width: "100%",
                        marginBottom: 5,
                      }}
                      data={tableHead}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{ paddingBottom: 16 }}
                      renderItem={({ item, index }) => {
                        const isLastItem = index === tableHead.length - 1;

                        return (
                          <>
                            {item?.input === "true" && (
                              <View style={styles.inputContainer}>
                                <Text className="text-base font-tmedium font-medium my-2">
                                  {item.label}
                                </Text>
                                {isLastItem ? (
                                  <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={showImagePickerOptions} style={styles.iconButton}>
                                      <Icon name="camera" size={30} color="#1C5B7D" />
                                    </TouchableOpacity>
                                  </View>
                                ) : (
                                  <RenderInput
                                    inputkey={item.key}
                                    label={item.label}
                                    type={item.type}
                                    value={rowData[item.key]}
                                    options={item.options}
                                    lines={item.lines}
                                    setRowData={setRowData}
                                    handleDropdownChange={handleDropDownChange}
                                  />
                                )}
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
                      containerStyles={'mt-4'}
                    />
                  </>
                ) : (
                  <View className="text-center">
                    <Image
                      source={Warning}
                      className="mx-auto w-16 h-16"
                    ></Image>
                    <Text className="font-tbold text-center">
                      هل انت متأكد من حذف هذا الموقع
                    </Text>
                    <Text className="font-tmedium text-center">
                      يرجي العلم انه سوف تفقد كافة البيانات الخاصة بهذا الادخال{" "}
                    </Text>
                    <View className="flex flex-row justify-center mt-4 ">
                      <TouchableOpacity
                        className=" rounded-md px-4 py-2 bg-none  border-[.5px] border-[#133E54] mx-2  w-[69px]  flex flex-row justify-center items-center"
                        onPress={() => setModalVisible(false)}
                      >
                        <Text className="font-tbold text-[#133E54]">إلغاء</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="mx-2 rounded-md  bg-[#F15555] w-[69px] flex flex-row justify-center items-center"
                        onPress={confirmAction}
                      >
                        <Text className="font-tbold text-white">حذف</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Full-Screen Image Modal */}
      <Modal
        visible={!!fullScreenImage}
        transparent={true}
        onRequestClose={() => setFullScreenImage(null)}
      >
        <TouchableWithoutFeedback onPress={() => setFullScreenImage(null)}>
          <View style={styles.fullScreenModal}>
            <Image
              source={{ uri: fullScreenImage }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
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
    padding: 20,
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1C5B7D",
  },
  fullScreenModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
};

export default ImageGrid;