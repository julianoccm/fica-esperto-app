import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/Onboarding";
import { createStaticNavigation } from "@react-navigation/native";
import LoginScreen from "./src/screens/Login";

const NavigationStack = createNativeStackNavigator({
  initialRouteName: "Onboarding",
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
  },
});

const Navigation = createStaticNavigation(NavigationStack);

export default function App() {
  return <Navigation />;
}
