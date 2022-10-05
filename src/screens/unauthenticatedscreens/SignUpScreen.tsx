import {Pressable, StatusBar, StyleSheet} from "react-native";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import displayImage from "../../utils/DisplayImage";
import React from "react";
import utils from "../../utils/Utils";
import {DarkTheme, useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Checkbox} from 'react-native-paper';
import {KeyboardAvoidingComponent, Text, View} from "../../components/Components";
import TextInputComponent from "../../components/TextInputComponent";

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
                            fontFamily: "Poppins_600SemiBold", fontSize: StatusBar.currentHeight, textAlign: "center", // justifyContent: "center"
                        }}>
                            Rifasa Cars
                        </Text>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 15,
                            color: layoutParams.colors.lighGrey,
                            fontFamily: "Poppins_500Medium", // justifyContent: "center"
                        }}>
                            Create an account with us
                        </Text>
                        <View style={{
                            marginTop: 10
                        }}>
                            <TextInputComponent placeholder="abc@mail.com"
                                                onChange={(text) => setState({...state, email: text})}
                                                secureEntry={false}
                                                containerStyles={registerStyles.searchInputMainContainer}
                                                inputView={registerStyles.searchInputContainer}
                                                searchInput={registerStyles.searchInput} autoCapitalize="none"
                                                keyboardType="default"
                                                value={state.email}
                                                iconName="email"
                                                iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                                iconColor={layoutParams.colors.lighGrey}/>
                            <TextInputComponent placeholder="Enter a username"
                                                onChange={(text) => setState({...state, username: text})}
                                                secureEntry={false}
                                                containerStyles={registerStyles.searchInputMainContainer}
                                                inputView={registerStyles.searchInputContainer}
                                                searchInput={registerStyles.searchInput} autoCapitalize="none"
                                                keyboardType="default"
                                                value={state.username} iconName="account"
                                                iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                                iconColor={layoutParams.colors.lighGrey}/>
                            <TextInputComponent placeholder="Enter a password"
                                                onChange={(text) => setState({...state, password: text})}
                                                secureEntry={true}
                                                containerStyles={registerStyles.searchInputMainContainer}
                                                inputView={registerStyles.searchInputContainer}
                                                searchInput={registerStyles.searchInput} autoCapitalize="none"
                                                keyboardType="default"
                                                value={state.password} iconName="lock"
                                                iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                                iconColor={layoutParams.colors.lighGrey}/>
                            <Checkbox.Item label="Accept terms and condtions here "
                                           status={state.checkBoxChecked ? 'checked' : 'unchecked'}
                                           position={"leading"}
                                           color={layout.colors.black}
                                           labelStyle={{
                                               fontSize: 20, color: layout.colors.black
                                           }}
                                           uncheckedColor={layout.colors.selectedColor}
                                           theme={DarkTheme}
                                           onPress={() => setState({
                                               ...state, checkBoxChecked: !state.checkBoxChecked
                                           })}
                            />
                            <Pressable onPress={() => onRegister()} disabled={!inputsValid()} style={{
                                ...registerButton(inputsValid()).buttonStyle
                            }}>
                                <Text style={{
                                    ...registerStyles.buttonText,
                                    color: inputsValid() ? layoutParams.colors.white : layoutParams.colors.black
                                }}>Sign Up</Text>
                            </Pressable>
                            <Text style={{
                                margin: 10, fontSize: 18, textAlign: "center"
                            }}>Already have an account? <Text style={{
                                fontSize: 18, fontWeight: "bold", color: layout.colors.deepBlue
                            }} onPress={() => navigation.navigate("Login")}>Login</Text></Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingComponent>);
}
const registerStyles = StyleSheet.create({
    textInput: {
        // backgroundColor: "#DBE0E6",
        width: layout.WINDOW.width * .95,
        height: layout.WINDOW.height * .062,
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.textInputColor,
        fontSize: 20,
        borderRadius: StatusBar.currentHeight,
        margin: 5,
        padding: 10,
    }, buttonText: {
        marginTop: 10, fontFamily: "Poppins_500Medium", fontSize: 20, textAlign: "center",
    }, searchInputMainContainer: {
        margin: 10
    }, searchInputContainer: {
        padding: 15,
        flexDirection: 'row',
        backgroundColor: layout.colors.textInputColor,
        borderRadius: 13,
        alignItems: 'center',
    }, searchInput: {
        flex: 1, fontSize: 16, fontFamily: 'WorkSans_500Medium', color: layoutParams.colors.black,
    },
})
const registerButton = (validatedInput: boolean) => StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        backgroundColor: validatedInput ? layout.colors.black : layout.colors.white,
        borderColor: layout.colors.black,
        borderWidth: 0.2,
        borderRadius: 13,
        margin: 10
    }
});


