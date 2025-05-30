import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/Onboarding";
import { createStaticNavigation } from "@react-navigation/native";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";
import AuthControlScreen from "./src/screens/AuthControl";
import SettingsScreen from "./src/screens/Settings";
import { Post } from "./src/models/post";
import PostScreen from "./src/screens/Post";
import BillsScreen from "./src/screens/Bills";

const NavigationStack = createNativeStackNavigator({
  initialRouteName: "AuthControl",
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
        gestureEnabled: false,
      },
    },
    AuthControl: {
      screen: AuthControlScreen,
      options: {
        headerShown: false,
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        headerShown: false,
      },
    },
    Post: {
      screen: PostScreen,
      initialParams: { id: null },
      options: {
        headerShown: false,
      },
    },
    Bills: {
      screen: BillsScreen,
      initialParams: { id: null, type: null },
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
