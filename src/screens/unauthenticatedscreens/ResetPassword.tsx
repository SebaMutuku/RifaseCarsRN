import React from "react";
import {Pressable, StatusBar, StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import displayImage from "../../utils/DisplayImage";
import utils from "../../utils/Utils";
import {Text, TextInput, View} from "../../components/Themed";

export default function ResetPassword() {
    const [state, setState] = React.useState({
        email: ""
    });

    function validateUserTextFields() {
        if (state.email.length == 0 || !state.email.toLowerCase().match(utils.checkValidMail)) {
            return true;
        }
        return false;
    }

    function onResetPass() {
    }

    return (<SafeAreaProvider>
        <View style={resetPassStyles.container}>
            <View style={{
                borderBottomRightRadius: 30, borderBottomLeftRadius: 30, flex: .5, elevation: layout.elevation.elevation
            }}>
                {displayImage({
                    borderRadii: 30, resizeMode: "contain"
                })}
            </View>
            <View style={{
                flex: 1
            }}>
                <Text style={{
                    fontFamily: "Poppins_600SemiBold", fontSize: StatusBar.currentHeight, textAlign: "center", // justifyContent: "center"
                }}> Rifasa Cars </Text>
                <Text style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: layoutParams.colors.lighGrey,
                    fontFamily: "Poppins_500Medium",
                }}> Reset your account</Text>
                <TextInput placeholder="abc@mail.com"
                           autoCapitalize="none"
                           blurOnSubmit={true}
                           keyboardType="email-address"
                           style={{...resetPassStyles.textInput}}
                           underlineColorAndroid="transparent"
                           onChangeText={(text) => setState({...state, email: text})}
                           value={state.email}
                />
                <Pressable style={({pressed}) => [{
                    marginTop: 10,
                    backgroundColor: validateUserTextFields() ? layout.colors.selectedColor : layout.colors.black,
                    elevation: layout.elevation.elevation,
                    justifyContent: "center",
                    alignItems: 'center'
                }, resetPassStyles.wrapperCustom]} onPress={() => onResetPass()} disabled={validateUserTextFields()}>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: "Poppins_500Medium",
                        color: validateUserTextFields() ? layout.colors.disabledTextColor : layout.colors.white,
                        fontSize: 20,
                        textAlign: "center", // justifyContent: "center"
                    }}>
                        Reset Password
                    </Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaProvider>);
}
const resetPassStyles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: layoutParams.colors.backgroundColor, alignItems: 'center'
    }, textInput: {
        width: layout.WINDOW.width * .95,
        height: layout.WINDOW.height * .062,
        marginTop: 20,
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.white,
        fontSize: 20,
        borderRadius: StatusBar.currentHeight,
        margin: 5,
        padding: 10,
        elevation: layout.elevation.elevation
    }, wrapperCustom: {
        elevation: layout.elevation.elevation,
        alignItems: "center",
        marginTop: 30,
        width: layout.WINDOW.width * .95,
        borderRadius: StatusBar.currentHeight,
        padding: 6,
        height: layout.WINDOW.height * .062,
    },
})
