import {Pressable, StyleSheet} from "react-native";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import HeaderSection from "../../components/HeaderSection";
import React from "react";
import {DarkTheme, useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Checkbox} from 'react-native-paper';
import {ActivityIndicator, KeyboardAvoidingComponent, Text, View} from "../../components/Widgets";
import TextInputComponent from "../../components/TextInputComponent";
import {buttonStyle, sharedStyles} from "../../utils/SharedStyles";
import utils from "../../utils/Utils";
import toast from "../../utils/toast";
import {RegisterConstants} from "../../utils/AllConstant";
import {RegisterResponse} from "../../utils/AppInterfaces";

export default function SignUpScreen() {
    const [state, setState] = React.useState({
        username: "", password: "", phoneNumber: "", checkBoxChecked: false, showPassword: true, loading: false
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    function inputsValid() {
        return (state.phoneNumber.length > 0 && state.phoneNumber.length < 14) && (state.username.length > 0) && (state.password.length >= 8) && (state.checkBoxChecked);
    }

    function onRegister() {
        if (inputsValid()) {
            setState({
                ...state, loading: true
            });

            setTimeout(() => {
                if (state.username != null && state.password != null && (state.phoneNumber + "") != null) {
                    const registrationData = {
                        "username": state.username, "password": state.password, "phonenumber": state.phoneNumber
                    }
                    utils.postData(utils.appUrl + "/users/register", registrationData).then(response => {
                        let responseData: RegisterResponse = response
                        if (responseData.responseCode === RegisterConstants.SUCCESS_CODE) {
                            if (responseData.user?.username != null && responseData.user?.user_id != null) {
                                toast.success({
                                    message: responseData.message
                                });
                                navigation.navigate("Login");
                            }
                        } else if (responseData.responseCode === RegisterConstants.EXISTS_CODE) {
                            toast.danger({
                                message: response.message
                            });
                        } else {
                            toast.danger({
                                message: response.message
                            })
                        }

                    }).catch(error => {
                        toast.danger({
                            message: error.message
                        })
                    })
                }
                setState({
                    ...state, loading: false
                })
            }, 2000, [])
        }
        return;
    }


    return (<KeyboardAvoidingComponent>
        {ActivityIndicator(state.loading)}
        <View style={{
            flex: 1, justifyContent: "center", backgroundColor: layout.colors.backgroundColor
        }}>
            {/*upperImageView*/}
            {HeaderSection({
                actionText: "Create an account with us",
                containerHeaderStyle: sharedStyles.containerHeaderStyle,
                actionTextStyle: sharedStyles.actionTextStyle
            })}
            {/*inputs view*/}
            <View style={{flex: 1}}>
                <View style={{
                    marginTop: 10
                }}>
                    <TextInputComponent placeholder="Enter phone number starting with 07"
                                        onChange={(value) => setState({...state, phoneNumber: value})}
                                        secureEntry={false}
                                        containerStyles={sharedStyles.searchInputMainContainer}
                                        inputView={sharedStyles.searchInputContainer}
                                        searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                        keyboardType="number-pad"
                                        value={state.phoneNumber}
                                        iconName="phone"
                                        iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                        iconColor={layoutParams.colors.lighGrey}/>
                    <TextInputComponent placeholder="Enter a username"
                                        onChange={(text) => setState({...state, username: text})}
                                        secureEntry={false}
                                        containerStyles={sharedStyles.searchInputMainContainer}
                                        inputView={sharedStyles.searchInputContainer}
                                        searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                        keyboardType="default"
                                        value={state.username} iconName="account"
                                        iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                        iconColor={layoutParams.colors.lighGrey}/>
                    <TextInputComponent placeholder="Enter a password"
                                        onChange={(text) => setState({...state, password: text})}
                                        secureEntry={state.showPassword}
                                        containerStyles={sharedStyles.searchInputMainContainer}
                                        inputView={sharedStyles.searchInputContainer}
                                        searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                        keyboardType="default"
                                        value={state.password}
                                        iconName={state.showPassword ? "eye-off" : "eye"}
                                        onPressIcon={() => setState({
                                            ...state, showPassword: !state.showPassword
                                        })}
                                        iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                        iconColor={layoutParams.colors.lighGrey}/>
                    <Checkbox.Item label="Accept terms and conditions here "
                                   status={state.checkBoxChecked ? 'checked' : 'unchecked'}
                                   position={"leading"}
                                   color={layout.colors.black}
                                   labelStyle={{
                                       color: layout.colors.black, fontFamily: "WorkSans_500Medium"
                                   }}
                                   uncheckedColor={layout.colors.selectedColor}
                                   theme={DarkTheme}
                                   onPress={() => setState({
                                       ...state, checkBoxChecked: !state.checkBoxChecked
                                   })}
                    />
                    <Pressable onPress={() => onRegister()} disabled={!inputsValid()} style={{
                        ...buttonStyle(inputsValid()).button
                    }}>
                        <Text style={{
                            ...registerStyles.buttonText,
                            color: inputsValid() ? layoutParams.colors.white : layoutParams.colors.black
                        }}>Sign Up</Text>
                    </Pressable>
                    <Text style={{
                        margin: 10, textAlign: "center", fontFamily: "WorkSans_500Medium"
                    }}>Already have an account? <Text style={{
                        fontSize: 18, color: layout.colors.deepBlue, fontFamily: "WorkSans_500Medium"
                    }} onPress={() => navigation.navigate("Login")}>Login</Text></Text>
                </View>
            </View>
                </View>
            </KeyboardAvoidingComponent>);
}
const registerStyles = StyleSheet.create({
    buttonText: {
        fontFamily: "Poppins_500Medium", fontSize: 20, textAlign: "center",
    }
})


