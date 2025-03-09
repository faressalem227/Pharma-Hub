import React from "react";
import { View, Text } from "react-native";
const NotificationsDetailes = ({ data }) => {
	//console.log(data, "99");

	// const {
	//     TrxMainID, YearID, SubsidryName, TrxMainNo, TrxDate, TrxMainDescription, TotalTrxDrLocal, SystemID, SubsidryID,
	//     LimitDays, LimitValueFrom, LimitValueTo,IsMandatory,Accepted,Rejected,ApproveBefor,ApprovalDate,insert_user,insert_time
	// } = data[0];

	const dateIns = new Date(insert_time);
	const dateTrx = new Date(TrxDate);
	const dateApprove = new Date(ApprovalDate);
	const formatedInsertDate = formatDate(dateIns);
	const formateTrxtDate = formatDate(dateTrx);
	const formateApproveDate = formatDate(dateApprove);
	//console.log(formatedInsertDate)
	//console.log(formateTrxtDate)
	return (
		<View className="w-full bg-[#d9d9d9] p-2 mb-4 rounded-lg">
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>الإذن</Text>
				<Text>ffff</Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>السنة</Text>
				<Text>ddd</Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>رقم الإذن</Text>
				<Text>ddddd</Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>تاريخ الإذن</Text>
				<Text>ccccc</Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>البيان</Text>
				<Text>cccc</Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>القيمة</Text>
				<Text></Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>قيمة من</Text>
				<Text></Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text> قيمة الى </Text>
				<Text></Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>يعتمد قبل</Text>
				<Text></Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text> تاريخ الإعتماد</Text>
				<Text></Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>مدخل البيانات</Text>
				<Text></Text>
			</View>
			<View className="border-b border-[#E4E7EC] my-1" />
			<View className="text-lg font-tbold p-1 flex flex-row-reverse justify-between">
				<Text>وقت الإدخال</Text>
				<Text></Text>
			</View>
		</View>
	);
};

export default NotificationsDetailes;
