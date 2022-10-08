import {Pressable, SafeAreaView, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import React from "react";
import utils from "../../utils/Utils";
import displayImage from "../../components/DisplayImage";
import {ActivityIndicator, KeyboardAvoidingComponent, showToast, Text, View} from "../../components/Widgets";
import Toast from "react-native-toast-message";
import {useToast} from "native-base";
import TextInputComponent from "../../components/TextInputComponent";
import {buttonStyle, sharedStyles} from "../../utils/SharedStyles";

export default function LoginScreen() {
    const toast = useToast();
    const [state, setState] = React.useState({
        username: "", password: "", token: "", loading: false
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    function inputsValid() {
        if (state.username.length == 0) {
            return false;
        }
        return state.password.length > 0 && state.password.length >= 8;

    }

    function onLogin() {
        if (inputsValid()) {
            setState({
                ...state, loading: true
            });
            setTimeout(() => {
                setState({
                    ...state, loading: false
                });
                //
                navigation.navigate("HomeScreen");
                if (state.username != null && state.password != null) {
                    const tkn = "seba"
                    setState({
                        ...state, token: tkn
                    });
                    fetch(utils.appUrl + "/login", {
                        method: "POST", headers: {
                            "Content-Type": "application/json"
                        }, body: JSON.stringify({
                            username: state.username, pasword: state.password
                        })
                    }).then(response => response.json()).then(reponseData => {
                        const response = JSON.parse(JSON.stringify(reponseData));
                        utils.saveValue("token", response.User.token);
                        navigation.navigate("HomeScreen");
                    }).catch(error => showToast(error.message));
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
                        showToast("User Logged In")
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

