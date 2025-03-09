import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import ProgressBar from "../UI/ProgressBar";
import { getCounter, incrementCounter } from "../../utilities/counterFunctions";

const TableRow = ({ item, onStartMachine, onCloseMachine }) => {
	const [date, setDate] = useState({
		counter: getCounter(item.CurrentDayOperatingHours),
		startDate: item.StartIn,
		endDate: item.EndIn,
	});

	const [active, setActive] = useState(false);
	const [loader, setLoader] = useState({ open: false, close: false });

	useEffect(() => {
		if (!active) {
			if (item.StatusID < 3) {
				if (new Date(item?.StartIn) > new Date(item?.EndIn)) {
					setActive(1);
				} else if (new Date(item?.StartIn) < new Date(item?.EndIn)) {
					setActive(2);
				}
			} else if (item.StatusID >= 3) {
				setActive(item?.StatusID);
			}
		}

		if (active == 1) {
			const intervalId = setInterval(() => {
				setDate({ ...date, counter: incrementCounter(date.counter) });
			}, 1000);
			return () => clearInterval(intervalId);
		}
	}, [active]);

	const failure =
		active == 4
			? "عاطل"
			: active == 5
			? "عمرة"
			: active == 6
			? "لا يوجد"
			: active == 7
			? "خارج الخدمة"
			: active == 3
			? "بلاغ"
			: "";
	const StatusColor =
		active == 4
			? "FF0F0F"
			: active == 5
			? "B05200"
			: active == 6
			? "808080"
			: active == 7
			? "000000"
			: "";

	return (
		<View className="flex flex-row justify-between  p-3 items-center border-b-[1px] border-[#E4E7EC]">
			<View className="flex flex-1">
				{active >= 3 ? (
					<View className=" flex items-center justify-center">
						<View
							style={{ borderColor: `#${StatusColor}` }}
							className={`border-[0.5px]  border-[#${
								active == 4
									? "FF0F0F"
									: active == 5
									? "B05200"
									: active == 6
									? "808080"
									: active == 7
									? "000000"
									: active == 3
									? "000000"
									: ""
							}] rounded-lg    relative`}>
							<View
								style={{ backgroundColor: `#${StatusColor}` }}
								className={`animate-ping absolute  h-3 w-3 -top-1 -right-1  rounded-full  opacity-90`}></View>

							<Text
								style={{ color: `#${StatusColor}` }}
								className="text-center px-4 py-2 font-tmedium">
								{failure}
							</Text>
						</View>
					</View>
				) : (
					<Text className="text-center font-tmedium text-base   ">
						{`${
							date.counter.hours <= 9
								? "0" + date.counter.hours
								: date.counter.hours
						}:${
							date.counter.minutes <= 9
								? "0" + date.counter.minutes
								: date.counter.minutes
						}:${
							date.counter.seconds <= 9
								? "0" + date.counter.seconds
								: date.counter.seconds
						}`}
					</Text>
				)}
			</View>
			<View className="flex flex-1 text-base">
				<TouchableOpacity
					disabled={active == 2 || active >= 3}
					onPress={async () => {
						setLoader({ ...loader, close: true });
						const res = await onCloseMachine(item?.AssetID);
						if (res) {
							const nowDate = new Date();
							nowDate.setHours(nowDate.getHours() + 3);
							setDate({ ...date, endDate: nowDate });
							setActive(2);
							setLoader({ ...loader, close: false });
						}
					}}
					className={`${
						active == 2 || active >= 3
							? "text-[#F15555] bg-[#F9EAEB]"
							: "bg-[#F15555] text-white "
					} py-2 rounded-md text-center items-center w-[82%]`}>
					{loader.close ? (
						<ActivityIndicator
							animating={loader.close}
							color="#227099"
							size="small"
							className="ml-2 w-6 h-6"
						/>
					) : (
						<Text
							className={`text-center font-tmedium text-base
                    ${
											active == 2 || active >= 3
												? " text-[#F15555]"
												: " text-white "
										}`}>
							ايقاف
						</Text>
					)}
				</TouchableOpacity>
			</View>
			<View className="flex flex-1 items-center text-base">
				<TouchableOpacity
					className={`${
						active == 1 || active >= 3
							? "text-[#019444] bg-[#E8F0EE]"
							: "bg-[#019444] text-white "
					}  py-2 rounded-md w-[82%]    text-center text-base`}
					disabled={active == 1 || active >= 3}
					onPress={async () => {
						setLoader({ ...loader, open: true });
						console.log(5);
						
						const res = await onStartMachine(item?.AssetID);
						console.log(6);
						
						if (res) {
							setLoader(false);
							const nowDate = new Date();
							nowDate.setHours(nowDate.getHours() + 3);
							setDate({ ...date, startDate: nowDate });
							setActive(1);
							setLoader({ ...loader, open: false });
						}
					}}>
					{loader.open ? (
						<ActivityIndicator
							animating={loader.open}
							color="#227099"
							size="small"
							className="ml-2 w-6 h-6"
						/>
					) : (
						<Text
							className={`font-tmedium text-center text-base ${
								active == 1 || active >= 3 ? "text-[#019444]" : " text-white"
							}`}>
							بدء
						</Text>
					)}
				</TouchableOpacity>
			</View>
			<View className="flex flex-1">
				<Text className="font-tmedium text-center text-base">
					{item?.AssetName}
				</Text>
				<ProgressBar
					ShedulePeriodHours={item.ShedulePeriodHours}
					hours={item.TotalOperatingHours}
				/>
			</View>
		</View>
	);
};

export default TableRow;
