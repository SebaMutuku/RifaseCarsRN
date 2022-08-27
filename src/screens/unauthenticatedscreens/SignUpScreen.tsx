import {Pressable, StatusBar, StyleSheet} from "react-native";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import displayImage from "../../utils/DisplayImage";
import React from "react";
import utils from "../../utils/Utils";
import {DarkTheme, useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Checkbox} from 'react-native-paper';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Text, TextInput, View} from "../../components/Themed";

export default function SignUpScreen() {
    const [state, setState] = React.useState({
        username: "", password: "", email: "", checkBoxChecked: false
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    function validateUserTextFields() {
        if (state.email.length <= 0 || !state.email.toLowerCase().match(utils.checkValidMail)) {
            return true;
        }
        if (state.password.length <= 0 || state.password.length < 8) {
            return true;
        }
        return !state.checkBoxChecked
    }

    function onRegister() {
        if (!validateUserTextFields()) {
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

    return (<SafeAreaProvider><View style={{
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: layout.colors.backgroundColor
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
                fontFamily: "Poppins_600SemiBold", fontSize: StatusBar.currentHeight, textAlign: "center", // justifyContent: "center"
            }}>
                Rifasa Cars
            </Text>
            <Text style={{
                color: layoutParams.colors.lighGrey,
                fontFamily: "Poppins_500Medium", fontSize: 20, textAlign: "center", // justifyContent: "center"
            }}>
                Create an account with us
            </Text>
            <View style={{
                marginTop: 10, alignItems: 'center'
            }}>
                <TextInput placeholder="abc@mail.com"
                           autoCapitalize="none"
                           blurOnSubmit={true}
                           keyboardType="email-address"
                           style={{...registerStyles.textInput}}
                           underlineColorAndroid="transparent"
                           onChangeText={(text) => setState({...state, email: text})}
                           value={state.email}
                />
                <TextInput placeholder="Enter a username"
                           autoCapitalize="none"
                           blurOnSubmit={true}
                           keyboardType="default"
                           style={{...registerStyles.textInput}}
                           underlineColorAndroid="transparent"
                           onChangeText={(text) => setState({...state, username: text})}
                           value={state.username}
                />
                <TextInput placeholder="Enter a password"
                           autoCapitalize="none"
                           blurOnSubmit={true}
                           keyboardType="default"
                           style={{...registerStyles.textInput}}
                           underlineColorAndroid="transparent"
                           secureTextEntry={true}
                           onChangeText={(text) => setState({...state, password: text})}
                           value={state.password}
                />
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
                <Pressable style={({pressed}) => [{
                    marginTop: 10,
                    backgroundColor: validateUserTextFields() ? layout.colors.selectedColor : layout.colors.black,
                    elevation: layout.elevation.elevation,
                    justifyContent: "center",
                    alignItems: 'center'
                }, registerStyles.wrapperCustom]} onPress={() => onRegister()} disabled={validateUserTextFields()}>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: "Poppins_500Medium",
                        color: validateUserTextFields() ? layout.colors.grey : layout.colors.white,
                        fontSize: 20,
                        textAlign: "center", // justifyContent: "center"
                    }}>
                        Sign Up
                    </Text>
                </Pressable>
                <Text style={{
                    margin: 10, fontSize: 18, textAlign: "center"
                }}>Already have an account? <Text style={{
                    fontSize: 18, fontWeight: "bold", color: layout.colors.deepBlue
                }} onPress={() => navigation.navigate("Login")}>Login</Text></Text>
            </View>
        </View>
    </View>
    </SafeAreaProvider>);
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
    }, wrapperCustom: {
        alignItems: "center",
        width: layout.WINDOW.width * .95,
        borderRadius: StatusBar.currentHeight,
        padding: 6,
        height: layout.WINDOW.height * .062,
    },
})
