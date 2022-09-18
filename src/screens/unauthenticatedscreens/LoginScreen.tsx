import {StatusBar, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import React from "react";
import utils from "../../utils/Utils";
import displayImage from "../../utils/DisplayImage";
import {ActivityIndicator, KeyboardAvoidingComponent, Text, TextInput, View} from "../../components/Components";
import Toast from "react-native-toast-message";
import {Button} from "@rneui/base";
import {Box, useToast} from "native-base";

export default function LoginScreen() {
    const toast = useToast();
    const [state, setState] = React.useState({
        username: "", password: "", token: "", loading: false
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    function validateInputs() {
        if (state.username.length == 0) {
            return true;
        }
        return state.password.length == 0 || state.password.length < 8;

    }

    function onLogin() {
        if (!validateInputs()) {
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
                        navigation.navigate("HomeScreen")
                    }).catch(error => console.log(error));
                }
            }, 3000);

        }
        return;
    }

    return (
        <KeyboardAvoidingComponent>
            {ActivityIndicator(state.loading)}
            <View style={{
                borderBottomRightRadius: 30, borderBottomLeftRadius: 30, flex: .5, ...layoutParams.elevation
            }}>
                {displayImage({
                    borderRadii: 30, resizeMode: "contain"
                })}
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{
                    fontFamily: "Poppins_600SemiBold", fontSize: StatusBar.currentHeight, textAlign: "center", // justifyContent: "center"
                }}>
                    Rifasa Cars
                </Text>
                <Text style={{
                    color: layoutParams.colors.lighGrey,
                    fontFamily: "Poppins_500Medium",
                    fontSize: 15,
                    textAlign: "center", // justifyContent: "center"
                }}>
                    Sign in to you account
                </Text>
                <View style={{
                    marginTop: 10
                }}>

                    <TextInput placeholder="Enter your username"
                               autoCapitalize="none"
                               blurOnSubmit={true}
                               keyboardType="default"
                               style={{...styles.textInput}}
                               inlineImageLeft="username"
                               underlineColorAndroid="transparent"
                               onChangeText={(text) => setState({...state, username: text})}
                               value={state.username}
                    />
                    <Toast
                        position='bottom'
                        bottomOffset={20}
                        type="info"
                        autoHide={true}
                        visibilityTime={4000}
                        onShow={() => <View><Text>Loading....</Text></View>}
                    />
                    <TextInput placeholder="Enter your password"
                               autoCapitalize="none"
                               inlineImageLeft="password"
                               blurOnSubmit={true}
                               keyboardType="default"
                               secureTextEntry={true}
                               style={{...styles.textInput}}
                               underlineColorAndroid="transparent"
                               onChangeText={(text) => setState({...state, password: text})}
                               value={state.password}/>
                    <Text style={{
                        margin: 10, fontSize: 18, textAlign: "right"
                    }}>Forgot your password? <Text style={{
                        fontSize: 18, fontWeight: "bold", color: layout.colors.deepBlue
                    }} onPress={() => navigation.navigate("Reset")}>Reset</Text></Text>
                    <Button buttonStyle={{
                        ...styles.buttonStyle, ...styles.wrapperCustom
                    }} titleStyle={{
                        ...styles.buttonText
                    }} title="Sign in" onPress={() => onLogin()} disabled={validateInputs()} loading={false}/>
                    <Text style={{
                        margin: 10, fontSize: 18, textAlign: "center"
                    }}>Not a Member? <Text style={{
                        fontSize: 18, fontWeight: "bold", color: layout.colors.deepBlue
                    }} onPress={() => navigation.navigate("SignUp")}>Register</Text></Text>
                </View>
            </View>
        </KeyboardAvoidingComponent>);

}
const styles = StyleSheet.create({
    textInput: {
        width: layout.WINDOW.width * .95,
        height: layout.WINDOW.height * .062,
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.white,
        fontSize: 20,
        borderRadius: StatusBar.currentHeight,
        margin: 5,
        padding: 10
    }, wrapperCustom: {
        alignItems: "center",
        width: layout.WINDOW.width * .95,
        borderRadius: StatusBar.currentHeight,
        padding: 6,
        height: layout.WINDOW.height * .062
    }, buttonStyle: {
        marginTop: layoutParams.WINDOW.height * .009,
        backgroundColor: layout.colors.black,
        elevation: layoutParams.elevation.elevation,
        marginBottom: layoutParams.WINDOW.height * .009,
        justifyContent: "center",
        borderRadius: 30,
        borderColor: 'transparent'
    }, buttonText: {
        marginTop: 10, fontFamily: "Poppins_500Medium", fontSize: 20, textAlign: "center"
    }
})
