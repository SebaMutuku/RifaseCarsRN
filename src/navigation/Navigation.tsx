/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
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
import {Text, View} from "../components/Themed";

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
            {/*{state.token == null || state.token.length <= 0 ? <UnauthenticatedNavigator/> : <HomeStackNavigator/>}*/}
            <HomeStackNavigator/>
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
        }}>
            <HomeStacks.Screen name="HomeStack" component={BottomTabNavigator}
                               options={{headerShown: false}}/>
            <HomeStacks.Screen name="UserData" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <HomeStacks.Group screenOptions={{presentation: 'modal'}}>
                <HomeStacks.Screen name="Wallet" component={NotFoundScreen}/>
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
                headerShown: true,
                title: "Login Page",
                headerTitleStyle: {
                    color: layoutParams.colors.black,
                    fontFamily: "Poppins_500Medium",
                    fontSize: 25,
                    fontWeight: "bold",

                }
            }}/>
            <LoginStacks.Screen name="SignUp" component={SignUpScreen}
                                options={{
                                    headerShown: true,
                                    title: "Registration Page",
                                    animation: "fade_from_bottom",
                                    headerTitleStyle: {
                                        color: "black",
                                        fontFamily: "Poppins_500Medium",
                                        fontWeight: "bold",
                                        fontSize: 20
                                    },
                                    headerTintColor: "black",
                                    headerBackVisible: true,
                                    headerBackTitleStyle: {
                                        fontSize: 20,
                                        fontFamily: "Poppins_500Medium"
                                    }

                                }}/>
            <LoginStacks.Screen name="Reset" component={ResetPassword}
                                options={{
                                    headerShown: true,
                                    animation: "fade_from_bottom",
                                    title: "Password Reset Page",
                                    headerTitleStyle: {
                                        color: "black",
                                        fontFamily: "Poppins_500Medium",
                                        fontWeight: "bold",
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
    const colorScheme = useColorScheme();
    return (
        <HomeBottomTabs.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                headerStyle: {
                    backgroundColor: layoutParams.colors.backgroundColor,
                },
            }}>
            <HomeBottomTabs.Screen
                name="HomeTab"
                component={Home}
                options={({navigation}: HomeBottomTabScreenProps<'HomeTab'>) => ({
                    tabBarIcon: ({color}) => <TabBarIcon name="home" color={layoutParams.colors.black}/>,
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
                    headerLeft: () => (
                        <View>
                            <Text style={{
                                fontSize: 20, fontFamily: "Poppins_500Medium"
                            }}>Let's find the Ideal {'\n'}Car for you</Text>
                        </View>),
                    headerShown: false,
                    headerTitleStyle: false,
                    headerTitleAllowFontScaling: true
                })}
            />
            <HomeBottomTabs.Screen
                name="Settings"
                component={TabTwoScreen}
                options={{
                    title: 'Tab Two',
                    tabBarIcon: () => <TabBarIcon name="code" color={layoutParams.colors.black}/>,
                }}
            />
            <HomeBottomTabs.Screen
                name="Profile"
                component={NotFoundScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: () => <TabBarIcon name="code" color={layoutParams.colors.black}/>,
                }}
            />
        </HomeBottomTabs.Navigator>
    );
}


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}




