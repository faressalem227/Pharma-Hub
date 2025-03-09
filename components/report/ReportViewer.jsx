import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Loader, MainButton } from "../../components";
import {
	reduceArrayToKeyValue,
	GenerateFilter,
} from "./ReportContentGenerator";
import IframeComponent from "./IframeComponent";
import { Dimensions, View } from "react-native";

import api from "../../utilities/api";
import axios from "axios";
export default function ReportViewer({
	ReportID,
	additionalParams = null,
	style = "",
	route = null,
}) {
	const { DepartmentID, user } = useGlobalContext();
	const [reportUrl, setReportUrl] = useState("");
	const [fillter, setFillters] = useState({});
	const [ReportFillter, setReportFillter] = useState([]);
	const [loading, setLoading] = useState(false);
	const [report, setReport] = useState("");

	const generateReportLink = (fillter) => {
		if (
			Object.values(fillter).includes("") &&
			!Object.values(fillter).length == 0
		) {
			return;
		}
		const serverUrl = 'http://192.168.1.29:5007/api/';
		if (!additionalParams) additionalParams = {};
		//console.log(additionalParams);
		const parm = { ...fillter, ...additionalParams };
		let reportParams = Object.keys(parm)
			.map((key) => `${key}=${parm[key]}`)
			.join("&");
		reportParams =
			reportParams +
			`&CompanyID=${1}&UserName=${
				user.username
			}&DepartmentID=${DepartmentID}&ReportID=${ReportID}`;
		let report = `${serverUrl}report/${
			route ? route : "Viewer"
		}?${reportParams}`;
		//console.log(report, "url");
		setReportUrl(report);
	};

	const getReport = async () => {
		try {
			const response = await axios.get(`http://192.168.1.29:5007/api/report/ordersListReport?Value=8&LangID=1&CompanyID=1&UserName=host&DepartmentID=5&ReportID=3359`);
			// //(response.data.data);
			setFillters(reduceArrayToKeyValue(response.data.data));
			setReportFillter(response.data.data);
			generateReportLink(reduceArrayToKeyValue(response.data.data));
		} catch (error) {
			//(error);
		}
	};

	const Fetchreport = async () => {
		setLoading("url");
		try {
			setReport("");
			setReportUrl("");
			await getReport();
		} catch (error) {
			//(error);
		} finally {
			setLoading(false);
		}
	};

	const showReport = async (url) => {
		setLoading("content");
		try {
			const report = await axios.get(url);
			setReport(report.data);
		} catch (err) {
			//(err);
		} finally {
			setLoading("");
		}
	};

	useEffect(() => {
		Fetchreport();
	}, [ReportID, DepartmentID]);
	useEffect(() => {
		if (reportUrl) {
			showReport(reportUrl);
		}
	}, [reportUrl]);
	//console.log(reportUrl);
	//console.log(report);
	const { height } = Dimensions.get("screen");
	return (
		<View
			style={{
				height: height,
				width: "100%",
			}}
			className="p-1 ">
			{loading !== "url" ? (
				<View className="flex items-center  flex-wrap gap-1  justify-center h-full p-4">
					{GenerateFilter(fillter, setFillters, ReportFillter)}
					<MainButton
						title={"معاينة"}
						handlePress={() => {
							generateReportLink(fillter);
						}}
					/>
				</View>
			) : (
				<Loader isLoading={loading == "url"} />
			)}
			{loading == "content" ? (
				<>
					<Loader isLoading={loading == "content"} />
				</>
			) : (
				<View className={`justify-center h-full items-center flex  `}>
					<IframeComponent
						content={report}
						key={reportUrl || 1}
					/>
				</View>
			)}
		</View>
	);
}
