import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import * as SecureStore from "expo-secure-store";
import api from "../utilities/api";
import { HandleDropdownFormat } from "../hooks/useDropDownData";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [departmentData, setDepartmentData] = useState([]);
	const [DepartmentID, setDepartmentID] = useState(); // Ensure getInitialValue is defined

	const fetchDropdownData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get("/table?sp=api_admin_department_trx"); // Replace with actual endpoint
			//(response.data.data)
			setDepartmentData(
				HandleDropdownFormat(
					response.data.data,
					"DepartmentID",
					"DepartmentNameAr"
				)
			);
			//(response.data); // Check the structure of the response
		} catch (err) {
			console.error("Error fetching dropdown data:", err);
			// setError("Failed to load dropdown options."); // Ensure this state is defined
		} finally {
			setLoading(false);
		}
	}, []);

	const checkAuth = async () => {
		try {
			const username = JSON.parse(await SecureStore.getItemAsync("UserName"));
			// const lastActive = JSON.parse(await SecureStore.getItemAsync("lastActive"));
			const UserTypeID = JSON.parse(
				await SecureStore.getItemAsync("UserTypeID")
			);
			const UserDepartmentID = JSON.parse(
				await SecureStore.getItemAsync("UserDepartmentID")
			);
			const UserDepartmentName = JSON.parse(
				await SecureStore.getItemAsync("UserDepartmentName")
			);

			if (username) {
				setIsLogged(true);
				setUser({
					username: username,
					// lastActive: lastActive,
					type: UserTypeID,
					selectedDepartmentID: UserDepartmentID,
					DepartmentID: UserDepartmentID,
					UserDepartmentName: UserDepartmentName,
				});
				await fetchDropdownData();
			} else { 
				setIsLogged(false);
			}
		} catch (error) {
			console.error("Error checking authentication:", error);
			setIsLogged(false);
		} finally {
			setLoading(false);
		}
	};

	const saveTokens = async (accessToken, refreshToken, user) => {
		// //console.log(accessToken, username, lastActive, UserTypeID, UserDepartmentID, UserDepartmentName)
		await SecureStore.setItemAsync("accessToken", JSON.stringify(accessToken));
		await SecureStore.setItemAsync(
			"refreshToken",
			JSON.stringify(refreshToken)
		);
		await SecureStore.setItemAsync("username", JSON.stringify(user.username));
		await SecureStore.setItemAsync("email", JSON.stringify(user.email));
		await SecureStore.setItemAsync(
			"UserTypeID",
			JSON.stringify(user.UserTypeID)
		);
		await SecureStore.setItemAsync(
			"UserDepartmentName",
			JSON.stringify(user.UserDepartmentName)
		);
		await SecureStore.setItemAsync(
			"UserDepartmentID",
			JSON.stringify(user.UserDepartmentID)
		);
	};

	useEffect(() => {
		checkAuth();
	}, []);

	const login = async (email, password, fcmToken) => {
		try {
			const response = await api.post(`/auth/signin`, {
				UserName: email,
				password,
				fcmToken: fcmToken,
			});
			const { accessToken, refreshToken, user } = response.data;
			//(response.data)
			await saveTokens(accessToken, refreshToken, user);

			setUser({
				username: user?.username,
				// lastActive: user?.lastActive,
				type: user?.UserTypeID,
				DepartmentID: user?.UserDepartmentID,
				UserDepartmentName: user?.UserDepartmentName,
			});
			setIsLogged(true);
			await fetchDropdownData();
		} catch (error) {
			console.error("Login error:", error);
			// setError("Login failed. Please check your credentials."); // Ensure this state is defined
			return Promise.reject(error);
		}
	};

	const getFunction = async (url) => {
		try {
			const response = await api.get(url);
			return response;
		} catch (error) {
			if (error.response?.status === 403 || error.response?.status === 401) {
				await logOut();
			} else {
				return Promise.reject(error);
			}
		}
	};

	const postFunction = async (url, data) => {
		try {
			const response = await api.post(url, data);
			return response;
		} catch (error) {
			if (error.response?.status === 403 || error.response?.status === 401) {
				await logOut();
			} else {
				return Promise.reject(error);
			}
		}
	};

	const putFunction = async (url, data) => {
		try {
			const response = await api.put(url, data);
			return response;
		} catch (error) {
			if (error.response?.status === 403 || error.response?.status === 401) {
				await logOut();
			} else {
				return Promise.reject(error);
			}
		}
	};

	const deleteFunction = async (url) => {
		try {
			const response = await api.delete(url);
			return response;
		} catch (error) {
			if (error.response?.status === 403 || error.response?.status === 401) {
				await logOut();
			} else {
				return Promise.reject(error);
			}
		}
	};

	const logOut = async () => {
		try {
			const response = await api.get("/auth/signout");
			//(response);

			await SecureStore.deleteItemAsync("accessToken");
			await SecureStore.deleteItemAsync("refreshToken");
			await SecureStore.deleteItemAsync("username");
			await SecureStore.deleteItemAsync("UserTypeID");
			await SecureStore.deleteItemAsync("UserDepartmentID");
			await SecureStore.deleteItemAsync("UserDepartmentName");
			await SecureStore.deleteItemAsync("email");
			setIsLogged(false);
			setUser(null);
		} catch (error) {
			console.error("Error during logout:", error);
			if (error.response?.status === 401 || error.response?.status === 403) {
				await SecureStore.deleteItemAsync("accessToken");
				await SecureStore.deleteItemAsync("refreshToken");
				await SecureStore.deleteItemAsync("username");
				await SecureStore.deleteItemAsync("UserTypeID");
				await SecureStore.deleteItemAsync("UserDepartmentID");
				await SecureStore.deleteItemAsync("UserDepartmentName");
				await SecureStore.deleteItemAsync("email");
				setIsLogged(false);
				setUser(null);
			}
			return Promise.reject(error);
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				logOut,
				isLogged,
				setIsLogged,
				login,
				setLoading,
				user,
				setUser,
				loading,
				checkAuth,
				getFunction,
				postFunction,
				putFunction,
				fetchDropdownData,
				deleteFunction,
				departmentData, // Return department data
				DepartmentID, // Return DepartmentID state
				setDepartmentID,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
