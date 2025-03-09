import { useDropDown } from "../../hooks/useDropDownData.jsx";
import DropDown from "../UI/DropDown";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { Loader } from "../../components";
const ReportDropDown = ({
	TextField = "",
	ValueField = "",
	spName = "",
	title = "",
	value = "",
	onChange = () => {},
}) => {
	const { DepartmentID, user } = useGlobalContext();

	const { data, loading, error } = useDropDown(
		spName,
		{
			LocationID: DepartmentID,
			CompanyID: 1,
			UserName: user.username,
			LangID: 1,
		},
		ValueField,
		TextField
	);

	return (
		<>
			{loading ? (
				<Loader
					width={40}
					height={40}></Loader>
			) : (
				<DropDown
					data={data}
					value={value}
					onChange={onChange}
					title={title}></DropDown>
			)}
		</>
	);
};

export default ReportDropDown;
