import ReportDropDown from "./ReportDropDown";
import DatePickerInput from "../UI/DatePickerInput";

import { View } from "react-native-web";
import FormField from "../UI/FormField";
export const reduceArrayToKeyValue = (array) => {
	return array.reduce((acc, obj) => {
		if (obj.SelectionTypeName === "Date From To") {
			acc["DateTo"] = "";
			acc["DateFrom"] = "";
			return acc;
		}

		acc[obj.ValueField] = obj.OnValueID || "";

		return acc;
	}, {});
};
export const GenerateFilter = (fillter, setFillters, reportFillter) => {
	return (
		<>
			{reportFillter.map((item) => {
				switch (item.SelectionTypeName) {
					case "Combo":
						return (
							<ReportDropDown
								key={item.FilterFieldName} // Ensure a unique key for each element
								FilterFieldName={item.FilterFieldName}
								ValueField={item.ValueField}
								title={item.TitleAr}
								TextField={item.TextField}
								spName={item.spName}
								value={fillter[item.ValueField]}
								onChange={(e) => {
									setFillters({
										...fillter,
										[item.ValueField]: e,
									});
								}}
							/>
						);

					case "Typing Text":
						return (
							<FormField
								key={item.ValueField} // Ensure a unique key for each element
								type="text"
								className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
								value={fillter[item.ValueField]}
								handleChangeText={(e) => {
									setFillters({
										...fillter,
										[item.ValueField]: e.target.value,
									});
								}}
							/>
						);
					case "Date From To":
						return (
							<>
								<View className="flex items-center gap-1">
									<DatePickerInput
										setDate={(e) => {
											setFillters({
												...fillter,
												DateFrom: e,
											});
										}}
										title={"الفترة من"}
									/>
								</View>
								<View className="flex items-center gap-1">
									<DatePickerInput
										// value={fillter?.DateTo || ""}
										parentStyle={"w-[180px]"}
										onChange={(e) => {
											setFillters({
												...fillter,
												DateTo: e,
											});
										}}
										placeholder={"الفترة الى"}
									/>
								</View>
							</>
						);
					default:
						return <></>; // Handle unexpected types gracefully
				}
			})}
		</>
	);
};
