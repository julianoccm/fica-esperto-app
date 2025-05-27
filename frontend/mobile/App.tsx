import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/Onboarding";
import { createStaticNavigation } from "@react-navigation/native";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";

const NavigationStack = createNativeStackNavigator({
  initialRouteName: "Register",
  screens: {
    Onboarding: {
      screen: OnboardingScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      }, 
    },
    Register: {
      screen: RegisterScreen,
      options: {
        headerShown: false,
      }, 
    },
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      }, 
    },
  },
});

const Navigation = createStaticNavigation(NavigationStack);

export default function App() {
  return <Navigation />;
}
