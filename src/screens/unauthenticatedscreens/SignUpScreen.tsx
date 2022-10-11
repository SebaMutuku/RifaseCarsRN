import {Pressable, StyleSheet} from "react-native";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import displayImage from "../../components/DisplayImage";
import React from "react";
import {DarkTheme, useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Checkbox} from 'react-native-paper';
import {KeyboardAvoidingComponent, showToast, Text, View} from "../../components/Widgets";
import TextInputComponent from "../../components/TextInputComponent";
import {buttonStyle, sharedStyles} from "../../utils/SharedStyles";
import utils from "../../utils/Utils";
import Firebase from "../../utils/Firebase";
import {insert} from "../../services/Database";
import {User} from "../../utils/AppInterfaces";

export default function SignUpScreen() {
    const [state, setState] = React.useState({
        username: "", password: "", phoneNumber: "", checkBoxChecked: false, showPassword: false
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    function inputsValid() {
        return (state.phoneNumber.length > 0 && state.phoneNumber.length < 14) && (state.username.length > 0) && (state.password.length >= 8) && (state.checkBoxChecked);
    }

    function onRegister() {
        if (inputsValid()) {
            if (state.username != null && state.password != null && (state.phoneNumber + "") != null) {
                const user: User = {
                    active: false,
                    admin: false,
                    createdAt: new Date(),
                    password: "",
                    phoneNumber: "",
                    user_id: "",
                    username: ""
                };
                const user_id = utils.generateUuid();
                Firebase.firestore().collection("users").where("username", "==", state.username).where("phoneNumber", "==", state.phoneNumber).get().then(data => {
                    if (data.docs.length > 0) {
                        showToast('User with details already  exists');
                        return;
                    }
                    user.phoneNumber = state.phoneNumber;
                    user.password = state.password;
                    user.username = state.username;
                    user.user_id = user_id;
                    user.active = true;
                    user.createdAt = new Date();
                    user.admin = false;
                    user.token = "";
                    insert("users", user_id, user);
                    showToast("User added successfully");
                    navigation.navigate("Login");
                });
            }
        }
        return;
    }


    return (<KeyboardAvoidingComponent>
        <View style={{
            flex: 1, justifyContent: "center", backgroundColor: layout.colors.backgroundColor
        }}>
            {/*upperImageView*/}
            <View style={{
                borderBottomRightRadius: 30, borderBottomLeftRadius: 30, flex: .5, elevation: layout.elevation.elevation
            }}>
                {displayImage({
                    borderRadii: 30, resizeMode: "contain"
                })}
            </View>
            {/*inputs view*/}
            <View style={{flex: 1}}>

                <Text style={{
                    marginTop: 10,
                    color: layoutParams.colors.lighGrey,
                    fontFamily: "WorkSans_500Medium",
                    fontSize: 15,
                    textAlign: "center"
                }}>
                    Create an account with us
                </Text>
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


