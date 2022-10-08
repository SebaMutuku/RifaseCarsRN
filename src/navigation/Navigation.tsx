/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import Profile from '../screens/authenticatedscreens/Profile';
import {
    HomeBottomTabParamList,
    HomeBottomTabScreenProps,
    HomeStackParamList,
    UnauthenticatedParamList
} from "./ScreenTypes";
import useColorScheme from "../hooks/useColorScheme";
import LoginScreen from "../screens/unauthenticatedscreens/LoginScreen";
import SignUpScreen from "../screens/unauthenticatedscreens/SignUpScreen";
import {navigationRef} from "./RootNavigation";
import utils from "../utils/Utils";
import Home from "../screens/authenticatedscreens/Home";
import ResetPassword from "../screens/unauthenticatedscreens/ResetPassword";
import layoutParams from "../utils/LayoutParams";
import {Avatar} from "react-native-paper";
import {Text, View} from "../components/Widgets";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RecentViews from "../screens/authenticatedscreens/RecentViews";
import CarDetails from "../screens/authenticatedscreens/stackscreens/CarDetails";
import Messages from "../screens/authenticatedscreens/Messages";
import UserMessage from "../screens/authenticatedscreens/stackscreens/UserMessage";
import CircularImage from "../components/CircularImage";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const [state, setState] = React.useState({
        token: "" as any
    });

    React.useEffect(() => {
        const fetchToken = async () => {
            // await utils.saveValue("token", "yayyayayyaass");
            const savedToken = await utils.getValue("token");
            console.log("Saved token ", savedToken)
            if (savedToken != null || savedToken != undefined) {
                //checkToken here
                let checkToken: boolean = false;
                await fetch(utils.appUrl + "/verify").then(resp => resp.json()).then(data => {
                    const respData = JSON.parse(JSON.stringify(data));
                    if (respData.message == "success") {
                        checkToken = true;
                    }
                    return checkToken;
                }).catch(error => console.log(error));
                if (checkToken) {
                    setState({
                        ...state,
                        token: savedToken
                    })
                }
            }

        }
        fetchToken();
    }, [state.token])
    console.table("token ", state.token)
    return (
        <NavigationContainer
            theme={colorScheme === 'light' ? DarkTheme : DefaultTheme}
            ref={navigationRef}>
            {state.token == null || state.token.length <= 0 ? <UnauthenticatedNavigator/> : <HomeStackNavigator/>}
            {/*<HomeStackNavigator/>*/}
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */



// const Switch = createAppContainer(createSwitchNavigator(
//     {
//         UnAuthenticated: AuthenticationScreen,
//         Authenticated: UnauthenticatedNavigator
//     },
//     {
//         initialRouteName: 'UnAuthenticated'
//     }
// ));


function HomeStackNavigator() {
    return (
        <HomeStacks.Navigator initialRouteName='HomeStack' screenOptions={{
            headerStyle: {
                backgroundColor: layoutParams.colors.backgroundColor,
            },
            headerShadowVisible: false,
            headerShown: true,
            animation: "fade_from_bottom",
            headerTitleStyle: {
                color: "black",
                fontFamily: "WorkSans_600SemiBold",
                fontSize: 20
            },
            headerTintColor: "black",
            headerBackVisible: true,
            headerBackTitleStyle: {
                fontSize: 20,
            }
        }}>
            <HomeStacks.Screen name="HomeStack" component={BottomTabNavigator}
                               options={{headerShown: false}}/>
            <HomeStacks.Screen name="CarDetails" component={CarDetails}
                               options={({route}: any) => ({title: route.params.cardetails != undefined || route.params.cardetails != null ? route.params?.cardetails.make : "Select a Car"})}/>
            <HomeStacks.Group screenOptions={{presentation: 'modal'}}>
                <HomeStacks.Screen name="Wallet" component={Profile}/>
                <HomeStacks.Screen name="UserMessage" component={UserMessage}
                                   options={({route}: any) => (
                                       {
                                           title: route.params.fromUser != undefined || route.params.fromUser != null ? route.params?.fromUser : "UserMessage",
                                           headerLeft: () => <View style={{
                                               margin: 5
                                           }}>
                                               <CircularImage
                                                   source={{uri: route.params.fromUserImage}}
                                                   size={45} rounded/></View>,
                                           // headerSearchBarOptions: {
                                           //     autoCapitalize: "none",
                                           //     shouldShowHintSearchIcon: true,
                                           //     inputType: "text",
                                           //     placeholder: "Enter your values"
                                           // }
                                       })
                                   }
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

function UnauthenticatedNavigator() {
    const colorScheme = useColorScheme();
    return (
        <LoginStacks.Navigator initialRouteName="Login" screenOptions={{
            headerTintColor: '#fff',
            animation: "fade_from_bottom",
            headerTitleStyle: {
                color: "black",
            },

            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: layoutParams.colors.backgroundColor,
            },
            headerTitleAlign: 'center'
        }}>
            <LoginStacks.Screen name="Login" component={LoginScreen} options={{
                headerShown: false,
                title: "Login Page",
                headerTitleStyle: {
                    color: layoutParams.colors.black,
                    fontFamily: "WorkSans_600SemiBold",
                    fontSize: 20
                }
            }}/>
            <LoginStacks.Screen name="SignUp" component={SignUpScreen}
                                options={{
                                    headerShown: true,
                                    title: "Registration Page",
                                    animation: "fade_from_bottom",
                                    headerTitleStyle: {
                                        color: "black",
                                        fontFamily: "WorkSans_600SemiBold",
                                        fontSize: 20
                                    },
                                    headerTintColor: "black",
                                    headerBackVisible: true,
                                    headerBackTitleStyle: {
                                        fontSize: 20,
                                        fontFamily: "WorkSans_600SemiBold"
                                    }

                                }}/>
            <LoginStacks.Screen name="Reset" component={ResetPassword}
                                options={{
                                    headerShown: true,
                                    animation: "fade_from_bottom",
                                    title: "Reset password",
                                    headerTitleStyle: {
                                        color: "black",
                                        fontFamily: "WorkSans_600SemiBold",
                                        fontSize: 20
                                    },
                                    headerTintColor: "black",
                                    headerBackVisible: true,
                                    headerBackTitleStyle: {
                                        fontSize: 20,
                                        fontFamily: "Poppins_500Medium"
                                    }
                                }}/>
            <LoginStacks.Screen name="HomeScreen" component={HomeStackNavigator} options={{headerShown: false}}/>
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
                    alignItems: "center"
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily:"WorkSans_500Medium"
                },
                headerStyle: {
                    backgroundColor: layoutParams.colors.backgroundColor
                },
                headerTitleStyle: {
                    fontSize: 20,
                    fontFamily: "WorkSans_600SemiBold",
                },
                tabBarLabelPosition: "beside-icon",
                headerTitleAlign: "center",
                tabBarAllowFontScaling: true,
                tabBarStyle: {
                    backgroundColor: layoutParams.colors.backgroundColor,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                },
                headerTitleAllowFontScaling: true,
                unmountOnBlur: true,
                tabBarShowLabel: !showLabel
            }}
        >
            <HomeBottomTabs.Screen
                name="HomeTab"
                component={Home}
                options={({navigation}: HomeBottomTabScreenProps<'HomeTab'>) => ({
                    tabBarLabel: "Home",
                    tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} size={25}/>,
                    headerRight: () => (
                        <View style={{
                            justifyContent: 'space-between',
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <FontAwesome name="bell" size={30} color={layoutParams.colors.deepBlue}
                                         style={{marginRight: 20}}/>
                            <Avatar.Image size={50} source={require('../../assets/images/human-male.jpg')}
                                          onTouchStart={() => navigation.navigate('Profile')} style={{
                                justifyContent: "center", alignItems: 'center'
                            }}/>
                        </View>
                    ),
                    title: "Home",
                    headerLeftContainerStyle: {
                        marginLeft: 10
                    },
                    headerRightContainerStyle: {
                        marginRight: 10
                    },
                    headerStyle: {
                        height: 55,
                        backgroundColor: layoutParams.colors.backgroundColor
                    },
                    headerShown: false,
                    headerTitleStyle: false,
                    headerTitleAllowFontScaling: true
                })}
            />
            <HomeBottomTabs.Screen
                name="RecentlyView"
                component={RecentViews}
                options={{
                    title: "Recent Views",
                    tabBarLabel: "Recent Views",
                    tabBarIcon: ({color}) => <TabBarIcon name="cart" color={color} size={25}/>,
                }}
            />
            <HomeBottomTabs.Screen
                name="Messages"
                component={Messages}
                options={{
                    tabBarLabel: "Messages",
                    tabBarIcon: ({color}) => <TabBarIcon name="comment-multiple" color={color} size={25}/>,
                }}
            />
            <HomeBottomTabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({color}) => <TabBarIcon name="account-cog" color={color} size={25}/>,
                }}
            />
        </HomeBottomTabs.Navigator>
    );
}


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    color: string;
    size: number
}) {
    return <MaterialCommunityIcons style={{marginBottom: -3}} {...props} />;
}




