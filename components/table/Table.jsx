import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ReportComponent from "./ReportComponent";
import TableRow from "./tableRow";
import DailyPrecentageRow from "./DailyPrecentageRow";
import DailyOperation from "./DailyOperation";
import InventoryItemComponent from "./InventoryItemComponent";
import ItemDetailsComponent from "./ItemDetailsComponent";
import OperationalFailureRow from "./OperationalFailureRow";
import ElecticityBillsRow from "./ElecticityBillsRow";
import ElectricityCutOutRow from "./electricityCutOutRow";
import DailyexamintaionRow from "./DailyexamintaionRow";
import DailyOperationAssetsRow from "./DailyOperationAssetsRow";
import DailyOperationAssetRow from "./DailyOperationAssetRow";
import FailureRow from "./FailureRow";
import ScheduleRow from "./ScheduleRow";
import ExpensesRow from "./ExpensesRow";
import AssesmentRow from "./AssesmentRow";
import ScheduleSparePart from "./ScheduleSparePart";
const Table = ({
	electricityBills,
	electricityCutOut,
	Inventoy,
	inventoryItemDetails,
	header,
	routingfunction,
	data,
	onStartMachine,
	onCloseMachine,
	dailyPrecentageData,
	assetsOperation,
	dailyOperationalData,
	reports,
	DailyExaminationList,
	handlePress,
	OperatioalReports,
	Failures,
	DailyOperationAssets,
	Schedule,
	LongPress,
	DailyOperationAsset,
	Assesment,
	sparePart,
	editInventory,
	Expenses,
}) => {
	const renderContent = (item, key = "") => {
		if (assetsOperation) {
			return (
				<TableRow
					item={item}
					onStartMachine={onStartMachine}
					onCloseMachine={onCloseMachine}
					numOfRows="4"
				/>
			);
		} else if (reports) {
			return (
				<ReportComponent
					data={item}
					routing={(failureID) => {
						routingfunction(failureID);
					}}
				/>
			);
		} else if (dailyPrecentageData) {
			return (
				<DailyPrecentageRow
					onpress={handlePress}
					data={item}
				/>
			);
		} else if (dailyOperationalData) {
			return (
				<DailyOperation
					data={item}
					handlePress={handlePress}
				/>
			);
		} else if (Inventoy) {
			return (
				<InventoryItemComponent
					handlePress={handlePress}
					data={item}
					editInventory={editInventory}
				/>
			);
		} else if (inventoryItemDetails) {
			return <ItemDetailsComponent data={item} />;
		} else if (OperatioalReports) {
			return (
				<OperationalFailureRow
					routingfunction={(id) => {
						routingfunction(id);
					}}
					data={item}
				/>
			);
		} else if (electricityBills) {
			return (
				<ElecticityBillsRow
					data={item}
					routingFunction={routingfunction}
				/>
			);
		} else if (electricityCutOut) {
			return (
				<ElectricityCutOutRow
					data={item}
					routingFunction={routingfunction}
				/>
			);
		} else if (DailyExaminationList) {
			return (
				<DailyexamintaionRow
					data={item}
					routingFunction={routingfunction}
				/>
			);
		} else if (Failures) {
			return (
				<FailureRow
					data={item}
					routingFunction={routingfunction}></FailureRow>
			);
		} else if (DailyOperationAssets) {
			return (
				<DailyOperationAssetsRow
					data={item}
					routingFunction={routingfunction}
				/>
			);
		} else if (DailyOperationAsset) {
			return (
				<DailyOperationAssetRow
					data={item}
					hourID={key}
					handlePress={handlePress}
				/>
			);
		} else if (Schedule) {
			return (
				<ScheduleRow
					data={item}
					handlePress={handlePress}
				/>
			);
		} else if (Assesment) {
			return (
				<AssesmentRow
					data={item}
					LongPress={LongPress}
					handelpress={handlePress}
				/>
			);
		} else if (Expenses) {
			return (
				<ExpensesRow
					data={item}
					routingFunction={routingfunction}
				/>
			);
		} else if (sparePart) {
			return <ScheduleSparePart data={item} />;
		} else {
			return null; // or some default component
		}
	};

	return (
		<View className="w-full flex">
			<View className="flex  flex-row p-4 justify-center bg-[#E4E7EC] items-center">
				{header.map((item, index) => (
					<View
						className="flex flex-1"
						key={index}
						style={styles.headerItem}>
						<Text className="font-tregular text-black text-center leading-[18px] text-base">
							{item}
						</Text>
					</View>
				))}
			</View>

			<ScrollView className="flex-1">
				{DailyOperationAsset
					? Object.keys(data).map((item, index) => {
							return (
								<View
									className="flex-1"
									key={index}>
									{renderContent(data[item], item)}
								</View>
							);
					  })
					: data.map((item, index) => {
							return (
								<View
									className="flex-1"
									key={index}>
									{renderContent(item)}
								</View>
							);
					  })}
			</ScrollView>
		</View>
	);
};

export default Table;

const styles = StyleSheet.create({
	rowStyle: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		width: "100%",
		display: "flex ",
		justifyContent: "center",
	},
	tableHeader: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 8,
	},
});
