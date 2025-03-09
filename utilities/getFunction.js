import api from "./api";

// const getAssets = async () => {
//     const { data } = await api.get("/departments");

//     if (data.success) {
//         const transformedData = data.Assets.map((item) => ({
//             value: item.AssetName,
//             key: item.AssetID,
//         }));

//         setOptions(transformedData);

//     } else {
//         Toast.show({
//             type: "error",
//             text1: data.message || "خطأ",
//             text2: "حدث خطأ اثناءالاتاصال بالخادم",
//             autoHide: true,
//             visibilityTime: 1500,
//             text1Style: {
//                 textAlign: "right",
//                 fontFamily: "Tajawal-Bold",
//                 fontSize: 16,
//             },
//             text2Style: {
//                 textAlign: "right",
//                 fontFamily: "Tajawal-Regular",
//                 fontSize: 14,
//             },
//         });
//     }
// };

// const getAssetStatus = async () => {
//     const { data } = await api.get("assets/status/menu");

//     if (data.success) {
//         const transformedData = data.items.map((item) => ({
//             value: item?.StatusName,
//             key: item?.StatusID,
//         }));

//         setAssetsStatus(transformedData);
//         setloader(false);
//     } else {
//         Toast.show({
//             type: "error",
//             text1: data.message || "خطأ",
//             text2: "حدث خطأ اثناءالاتاصال بالخادم",
//             autoHide: true,
//             visibilityTime: 1500,
//             text1Style: {
//                 textAlign: "right",
//                 fontFamily: "Tajawal-Bold",
//                 fontSize: 16,
//             },
//             text2Style: {
//                 textAlign: "right",
//                 fontFamily: "Tajawal-Regular",
//                 fontSize: 14,
//             },
//         });
//     }
// };

// export const {
//     getAssets,
//     getAssetStatus,
// }

export const getDropdownData = async (url, Key, Value) => {
	try {
		const { data } = await api.get(url);
		const transformedData = data.data.map((item) => ({
			key: item[Key],
			value: item[Value],
		}));

		return transformedData;
	} catch (error) {
		throw error;
	}
};
