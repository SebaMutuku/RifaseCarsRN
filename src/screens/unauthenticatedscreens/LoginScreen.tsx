import {Animated, Easing, Pressable, SafeAreaView, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import React from "react";
import displayImage from "../../components/DisplayImage";
import {ActivityIndicator, KeyboardAvoidingComponent, Text, View} from "../../components/Widgets";
import Toast from "react-native-toast-message";
import TextInputComponent from "../../components/TextInputComponent";
import {buttonStyle, sharedStyles} from "../../utils/SharedStyles";
import {loginWithUserNameAndPassword} from "../../services/Database";
import Firebase from "../../utils/Firebase";
import toast from "../../utils/toast";

export default function LoginScreen() {
    const [state, setState] = React.useState({
        username: "", password: "", token: "", loading: false, showToast: false, toastMessage: "", toastType: ''
    });
    const navigation = useNavigation<CombinedNavigationProps>();
    const translateX = React.useRef<Animated.Value>(new Animated.Value(50)).current;
    const opacity = React.useRef<Animated.Value>(new Animated.Value(0.1)).current;
    const PressableView = Animated.createAnimatedComponent(Pressable);

    function inputsValid() {
        return state.username.length > 0 && (state.password.length >= 8);
    }

    React.useEffect(() => {
        Animated.parallel([Animated.timing(translateX, {
            toValue: 0, duration: 500, easing: Easing.linear, useNativeDriver: true
        }), Animated.timing(opacity, {
            toValue: 1, duration: 1000, easing: Easing.out(Easing.cubic), useNativeDriver: true,
        })]).start()
    }, [])

    function onLogin() {
        if (inputsValid()) {
            setState({
                ...state, loading: true
            });
            setTimeout(() => {
                if (state.username != null && state.password != null) {
                    loginWithUserNameAndPassword(state.username, state.password).then(data => {
                        let username: string, userId: string;
                        if (data.docs.length == 0) {
                            state.toastMessage = "Invalid Username or password"
                            setState({
                                ...state, loading: false, showToast: true, toastType: "error"
                            })
                            toast.success({
                                message: "Invalid username or password"
                            })
                            return;
                        }
                        data.docs.forEach(item => {
                            username = item.data()['username']
                            userId = item.data()['user_id']
                        })
                        data.forEach(d => {
                            Firebase.firestore().collection("users").doc(d.id).update({
                                token: "123221"
                            });
                            setState({
                                ...state, token: "122311223331", showToast: true, toastType: "success"

                            })
                            setState({
                                ...state,
                                loading: false,
                                showToast: true,
                                toastType: "success",
                                toastMessage: "Successfully Logged In"
                            })
                            toast.success({
                                message: "Successfully Logged In"
                            })
                            navigation.navigate("HomeScreen");
                        })
                    })
                    setState({
                        ...state, toastType: "", toastMessage: "", showToast: false
                    })
                }
            }, 1000);

        }
        return;
    }

    return (<KeyboardAvoidingComponent>
        {ActivityIndicator(state.loading)}
        <SafeAreaView style={{flex: 1, backgroundColor: layoutParams.colors.backgroundColor}}>
            <View style={{
                borderBottomRightRadius: 30, borderBottomLeftRadius: 30, flex: .5, ...layoutParams.elevation
            }}>
                {displayImage({
                    borderRadii: 30, resizeMode: "contain"
                })}
            </View>
            <View style={{flex: 1}}>
                <Text style={{
                    marginTop: 10,
                    color: layoutParams.colors.lighGrey,
                    fontFamily: "WorkSans_500Medium",
                    fontSize: 15,
                    textAlign: "center"
                }}>
                    Sign in to you account
                </Text>
                <View style={{
                    marginTop: 10
                }}>
                    <TextInputComponent placeholder="username"
                                        onChange={(text) => setState({...state, username: text})}
                                        secureEntry={false} containerStyles={sharedStyles.searchInputMainContainer}
                                        inputView={sharedStyles.searchInputContainer}
                                        searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                        keyboardType="default"
                                        value={state.username} iconName="account"
                                        iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                        iconColor={layoutParams.colors.lighGrey}/>

                    <Toast
                        position='bottom'
                        bottomOffset={20}
                        type="info"
                        autoHide={true}
                        visibilityTime={4000}
                        onShow={() => <View><Text>Loading....</Text></View>}
                    />
                    <TextInputComponent placeholder="password"
                                        onChange={(text) => setState({...state, password: text})}
                                        secureEntry={true} containerStyles={sharedStyles.searchInputMainContainer}
                                        inputView={sharedStyles.searchInputContainer}
                                        searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                        keyboardType="default"
                                        value={state.password} iconName="lock"
                                        iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                        iconColor={layoutParams.colors.lighGrey}/>

                    <Text style={{
                        margin: 10, textAlign: "right", fontFamily: "WorkSans_500Medium"
                    }}>Forgot your password? <Text style={{
                        fontSize: 18, color: layout.colors.deepBlue, fontFamily: "WorkSans_500Medium"
                    }} onPress={() => navigation.navigate("Reset")}>Reset</Text></Text>
                    <Pressable style={{
                        ...buttonStyle(inputsValid()).button
                    }} onPress={() => {
                        onLogin()
                        // showToast("User Logged In")
                    }} disabled={!inputsValid()}>
                        <Text style={{
                            ...styles.buttonText,
                            color: inputsValid() ? layoutParams.colors.white : layoutParams.colors.black
                        }}>Login</Text>
                    </Pressable>
                    <Text style={{
                        margin: 3, textAlign: "center", fontFamily: "WorkSans_500Medium"
                    }}>Not a Member? <Text style={{
                        fontSize: 18, color: layout.colors.deepBlue, fontFamily: "WorkSans_500Medium"
                    }} onPress={() => navigation.navigate("SignUp")}>Register</Text></Text>

                </View>
            </View>
        </SafeAreaView>
        </KeyboardAvoidingComponent>);

}
const styles = StyleSheet.create({
    buttonText: {
        fontFamily: "WorkSans_600SemiBold", fontSize: 20, textAlign: "center"
    }
})

