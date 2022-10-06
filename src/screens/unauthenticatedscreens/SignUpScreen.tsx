import {Pressable, StyleSheet} from "react-native";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import displayImage from "../../components/DisplayImage";
import React from "react";
import utils from "../../utils/Utils";
import {DarkTheme, useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Checkbox} from 'react-native-paper';
import {KeyboardAvoidingComponent, Text, View} from "../../components/Widgets";
import TextInputComponent from "../../components/TextInputComponent";
import {buttonStyle, sharedStyles} from "../../utils/SharedStyles";

export default function SignUpScreen() {
    const [state, setState] = React.useState({
        username: "", password: "", email: "", checkBoxChecked: false
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    function inputsValid() {
        if (state.email.length > 0 && state.email.toLowerCase().match(utils.checkValidMail)) {
            return true;
        }
        if (state.password.length > 0 && state.password.length >= 8) {
            return true;
        }
        return state.checkBoxChecked
    }

    function onRegister() {
        if (inputsValid()) {
            if (state.username != null && state.password != null && state.email != null) {
                fetch(utils.appUrl + "/register", {
                    method: "POST", headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify({
                        username: state.username, pasword: state.password
                    })
                }).then(response => response.json()).then(reponseData => {
                    const response = JSON.parse(JSON.stringify(reponseData));
                    utils.saveValue("token", response.User.token);
                }).catch(error => console.log(error));
            }
        }
        return;
    }

    return (<KeyboardAvoidingComponent>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: layout.colors.backgroundColor
                }}>
                    {/*upperImageView*/}
                    <View style={{
                        borderBottomRightRadius: 30,
                        borderBottomLeftRadius: 30,
                        flex: .5,
                        elevation: layout.elevation.elevation
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
                            <TextInputComponent placeholder="abc@mail.com"
                                                onChange={(text) => setState({...state, email: text})}
                                                secureEntry={false}
                                                containerStyles={sharedStyles.searchInputMainContainer}
                                                inputView={sharedStyles.searchInputContainer}
                                                searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                                keyboardType="default"
                                                value={state.email}
                                                iconName="email"
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
                                                secureEntry={true}
                                                containerStyles={sharedStyles.searchInputMainContainer}
                                                inputView={sharedStyles.searchInputContainer}
                                                searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                                keyboardType="default"
                                                value={state.password} iconName="lock"
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
                                margin: 10,  textAlign: "center", fontFamily: "WorkSans_500Medium"
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


