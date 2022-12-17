import React from "react";
import {Pressable, StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import layoutParams from "../../utils/LayoutParams";
import HeaderSection from "../../components/HeaderSection";
import {ActivityIndicator, KeyboardAvoidingComponent, showToast, Text, View} from "../../components/Widgets";
import TextInputComponent from "../../components/TextInputComponent";
import {buttonStyle, sharedStyles} from "../../utils/SharedStyles";
import utils from "../../utils/Utils";
import {GetUserresponse} from "../../utils/AppInterfaces";
import toast from "../../utils/toast";


export default function ResetPassword() {
    const [state, setState] = React.useState({
        username: "", password: "", showPassword: false, passFieldVisible: false, loading: false,
    });

    function inputsValid() {
        return state.username.length > 0;
    }

    React.useEffect(()=>{
        console.log(state.passFieldVisible)
    },[state.passFieldVisible])

    function onResetPass() {
        if (inputsValid()) {
            setState({
                ...state, loading: true
            });
        }
        setTimeout(() => {
            if (state.username != null) {
                const data = {
                    "username": state.username
                }
                utils.postData(utils.appUrl + "/users/getUser", data).then(response => {
                    let responseData: GetUserresponse = response
                    if (responseData.responseCode == 200) {
                        setState({
                            ...state,
                            passFieldVisible: true
                        });

                    } else {
                        toast.success({
                            message: responseData.message
                        })
                    }
                }).catch(error => showToast(error.message)).finally(() => {
                    setState({
                        ...state,
                        loading: false
                    });
                })
            }
        }, 2000);
        return

    }

    return (<KeyboardAvoidingComponent>
        <SafeAreaProvider>
            {ActivityIndicator(state.loading)}
            <View style={sharedStyles.container}>
                {HeaderSection({
                    actionText: "Recover your account",
                    containerHeaderStyle: sharedStyles.containerHeaderStyle,
                    actionTextStyle: sharedStyles.actionTextStyle
                })}
                <View style={{
                    flex: 1
                }}>
                    <TextInputComponent placeholder="Enter your username or phonenumber"
                                        onChange={(text) => setState({...state, username: text.trim()})}
                                        secureEntry={false} containerStyles={sharedStyles.searchInputMainContainer}
                                        inputView={sharedStyles.searchInputContainer}
                                        searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                        keyboardType="default"
                                        value={state.username} iconName="account"
                                        iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                        iconColor={layoutParams.colors.lighGrey}/>
                    {state.passFieldVisible ?
                        <TextInputComponent placeholder="password"
                                            onChange={(text) => setState({...state, password: text.trim()})}
                                            secureEntry={!state.showPassword}
                                            containerStyles={sharedStyles.searchInputMainContainer}
                                            inputView={sharedStyles.searchInputContainer}
                                            searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                            keyboardType="default"
                                            value={state.password.trim()}
                                            iconName={!state.showPassword ? "eye-off" : "eye"}
                                            onPressIcon={() => setState({
                                                ...state, showPassword: !state.showPassword
                                            })}
                                            iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                            iconColor={layoutParams.colors.lighGrey}/> : null}


                    <Pressable style={{
                        ...buttonStyle(inputsValid()).button
                    }} onPress={() => onResetPass()} disabled={!inputsValid()}>
                        <Text style={{
                            ...resetPassStyles.buttonText,
                            color: inputsValid() ? layoutParams.colors.white : layoutParams.colors.black
                        }}>
                            Reset Password
                        </Text>
                    </Pressable>

                </View>
            </View>
        </SafeAreaProvider>
    </KeyboardAvoidingComponent>);
}
const resetPassStyles = StyleSheet.create({
    buttonText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 20,
    }
})
