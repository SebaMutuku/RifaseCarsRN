/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Profile from "../screens/authenticatedscreens/Profile";
import {
  HomeBottomTabParamList,
  HomeBottomTabScreenProps,
  HomeStackParamList,
  UnauthenticatedParamList,
} from "./ScreenTypes";
import useColorScheme from "../hooks/useColorScheme";
import LoginScreen from "../screens/unauthenticatedscreens/LoginScreen";
import SignUpScreen from "../screens/unauthenticatedscreens/SignUpScreen";
import Home from "../screens/authenticatedscreens/Home";
import ResetPassword from "../screens/unauthenticatedscreens/ResetPassword";
import layoutParams from "../utils/LayoutParams";
import { CustomIcon, View } from "../components/Widgets";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewArrivals from "../screens/authenticatedscreens/NewArrivals";
import CarDetails from "../screens/authenticatedscreens/stackscreens/CarDetails";
import Messages from "../screens/authenticatedscreens/Messages";
import UserMessage from "../screens/authenticatedscreens/stackscreens/UserMessage";
import CircularImage from "../components/CircularImage";
import { appFonts } from "../utils/AllConstant";
import { Avatar } from "react-native-elements";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

export function HomeStackNavigator() {
  const theme = useColorScheme();
  return (
    <HomeStacks.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: layoutParams.colors.backgroundColor,
        },
        headerShadowVisible: false,
        headerShown: true,
        animation: "fade_from_bottom",
        headerTitleStyle: {
          color: "black",
          fontFamily: appFonts.WorkSans_600SemiBold,
        },
        headerTintColor: "black",
        headerBackVisible: true,
        headerBackTitleStyle: {
          fontSize: 20,
          fontFamily: appFonts.WorkSans_600SemiBold,
        },
      }}
    >
      <HomeStacks.Screen
        name="HomeStack"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <HomeStacks.Screen
        name="CarDetails"
        component={CarDetails}
        options={({ route }: any) => ({
          title:
            route.params.cardetails != undefined ||
            route.params.cardetails != null
              ? route.params?.cardetails.make
              : "Select a Car",
        })}
      />
      <HomeStacks.Group screenOptions={{ presentation: "modal" }}>
        <HomeStacks.Screen name="Wallet" component={Profile} />
        <HomeStacks.Screen
          name="UserMessage"
          component={UserMessage}
          options={({ route }: any) => ({
            title:
              route.params.fromUser != undefined ||
              route.params.fromUser != null
                ? route.params?.fromUser
                : "UserMessage",
            headerLeft: () => (
              <View
                style={{
                  margin: 5,
                }}
              >
                <CircularImage
                  source={{ uri: route.params.fromUserImage }}
                  size={45}
                  rounded
                />
              </View>
            ),
            // headerSearchBarOptions: {
            //     autoCapitalize: "none",
            //     shouldShowHintSearchIcon: true,
            //     inputType: "text",
            //     placeholder: "Enter your values"
            // }
          })}
        />
      </HomeStacks.Group>
    </HomeStacks.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const HomeBottomTabs = createBottomTabNavigator<HomeBottomTabParamList>();
const LoginStacks = createNativeStackNavigator<UnauthenticatedParamList>();
const HomeStacks = createNativeStackNavigator<HomeStackParamList>();
// const SharedElementStack = createSharedElementStackNavigator<SharedElementParamList>();

// function createSharedElements() {
//     return (
//         <SharedElementStack.Navigator initialRouteName="HomeStack">
//             <SharedElementStack.Screen component={}
//
//         </SharedElementStack.Navigator>
//     )
// }

export function UnauthenticatedNavigator() {
  const colorScheme = useColorScheme();
  return (
    <LoginStacks.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTintColor: "#fff",
        animation: "fade_from_bottom",
        headerTitleStyle: {
          color: "black",
        },
        // statusBarColor: layoutParams.colors.primaryColor,
        headerShadowVisible: true,
        statusBarTranslucent: true,
        headerStyle: {
          backgroundColor: layoutParams.colors.backgroundColor,
        },
        headerTitleAlign: "center",
        headerBackTitleStyle: {
          fontFamily: appFonts.WorkSans_600SemiBold,
        },
      }}
    >
      <LoginStacks.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          title: "Login Page",
          headerTitleStyle: {
            color: layoutParams.colors.black,
            fontFamily: appFonts.WorkSans_600SemiBold,
            fontSize: 20,
          },
        }}
      />
      <LoginStacks.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: true,
          title: "Registration Page",
          animation: "fade_from_bottom",
          headerTitleStyle: {
            color: layoutParams.colors.lighGrey,
            fontFamily: appFonts.WorkSans_500Medium,
          },
          headerTintColor: "black",
          headerBackVisible: true,
          headerBackTitleStyle: {
            fontFamily: appFonts.WorkSans_500Medium,
          },
        }}
      />
      <LoginStacks.Screen
        name="Reset"
        component={ResetPassword}
        options={{
          headerShown: true,
          animation: "fade_from_bottom",
          title: "Reset password",
          headerTitleStyle: {
            color: layoutParams.colors.lighGrey,
            fontFamily: appFonts.WorkSans_500Medium,
          },
          headerTintColor: "black",
          headerBackVisible: true,
          headerBackTitleStyle: {
            fontSize: 20,
            fontFamily: "Poppins_500Medium",
          },
        }}
      />
      <LoginStacks.Screen
        name="HomeScreen"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
    </LoginStacks.Navigator>
  );
}

function BottomTabNavigator() {
  const [showLabel, setShowLabel] = React.useState(false);
  const colorScheme = useColorScheme();
  return (
    <HomeBottomTabs.Navigator
      initialRouteName="HomeTab"
      // activeColor={layoutParams.colors.deepBlue}
      // sceneAnimationEnabled
      screenOptions={{
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontFamily: appFonts.WorkSans_500Medium,
        },
        headerStyle: {
          // backgroundColor: colorScheme === "light" ? layoutParams.colors.backgroundColor :"rgba(255,255,255,0.05)"
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: appFonts.WorkSans_600SemiBold,
        },
        tabBarLabelPosition: "beside-icon",
        headerTitleAlign: "center",
        tabBarAllowFontScaling: true,
        tabBarStyle: {
          // borderTopRightRadius: 20,
          // borderTopLeftRadius: 20,
        },
        headerTitleAllowFontScaling: true,
        unmountOnBlur: true,
        tabBarShowLabel: !showLabel,
      }}
    >
      <HomeBottomTabs.Screen
        name="HomeTab"
        component={Home}
        options={({ navigation }: HomeBottomTabScreenProps<"HomeTab">) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <CustomIcon
              icon="home"
              color={color}
              size={25}
              iconType="material-icon"
            />
          ),
          headerRight: () => (
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="bell"
                size={30}
                color={layoutParams.colors.deepBlue}
                style={{ marginRight: 20 }}
              />
              <Avatar
                size={50}
                source={require("../../assets/images/human-male.jpg")}
                onPress={() => navigation.navigate("Profile")}
                avatarStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
          ),
          title: "Home",
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerRightContainerStyle: {
            marginRight: 10,
          },
          headerStyle: {
            height: 55,
            backgroundColor: layoutParams.colors.backgroundColor,
          },
          headerShown: false,
          headerTitleStyle: false,
          headerTitleAllowFontScaling: true,
        })}
      />
      <HomeBottomTabs.Screen
        name="NewArrivals"
        component={NewArrivals}
        options={{
          title: "New Arrivals",
          tabBarLabel: "New Arrivals",
          tabBarIcon: ({ color }) => (
            <CustomIcon
              icon="baby-carriage"
              color={color}
              size={20}
              iconType="font-awesome-5"
            />
          ),
        }}
      />
      <HomeBottomTabs.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color }) => (
            <CustomIcon
              icon="facebook-messenger"
              color={color}
              size={20}
              iconType="material-community"
            />
          ),
        }}
      />
      <HomeBottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <CustomIcon
              icon="account"
              iconType="material-community"
              color={color}
              size={20}
            />
          ),
        }}
      />
    </HomeBottomTabs.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
