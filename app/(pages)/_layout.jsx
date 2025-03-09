import { useEffect } from "react";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { LogoBar, MainLayout } from "../../components";
import { SafeAreaView } from "react-native";
SplashScreen.preventAutoHideAsync();

const ProtectedRoute = () => {
	const router = useRouter();
	const { user, isLogged } = useGlobalContext();

	useEffect(() => {
		if (!user || !isLogged) {
			router.replace("/");
		}
	}, [user, isLogged]);

	return (
		<>
			<Stack>
				<Stack.Screen
					name="Home"
					options={{ headerShown: false }}
				/>
			</Stack>
		</>
	);
};

export default ProtectedRoute;
