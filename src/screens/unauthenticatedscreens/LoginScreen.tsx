import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import layout from "../../utils/LayoutParams";
import React from "react";
import utils from "../../utils/Utils";
import displayImage from "../../utils/DisplayImage";

export default function LoginScreen() {
    const [state, setState] = React.useState({
        username: "", password: "", token: ""
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
        }
        return;
    }

    return (<SafeAreaProvider>
        <View style={{
            flex: 1, alignItems: "center", backgroundColor: layout.colors.backgroundColor
        }}>
            {/*upperImageView*/}
            <View style={{
                borderBottomRightRadius: 30, borderBottomLeftRadius: 30, flex: .5, elevation: layout.elevation.elevation
            }}>
                {displayImage({
                    borderRadii: 30, resizeMode: "contain"
                })}
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{
                    marginTop: 10, fontFamily: "Poppins_500Medium", fontSize: 20, textAlign: "center", // justifyContent: "center"
                }}>
                    Login to proceed
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
                    <Pressable style={({pressed}) => [{
                        marginTop: 10,
                        backgroundColor: validateInputs() ? layout.colors.disabledButtonColor : layout.colors.buttonColors,
                        elevation: layout.elevation.elevation,
                        justifyContent: "center"
                    }, styles.wrapperCustom]} onPress={() => onLogin()} disabled={validateInputs()}>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: "Poppins_500Medium",
                            color: validateInputs() ? layout.colors.disabledTextColor : layout.colors.white,
                            fontSize: 20,
                            textAlign: "center", // justifyContent: "center"
                        }}>
                            Sign In
                        </Text>
                    </Pressable>
                    <Text style={{
                        margin: 10, fontSize: 18, textAlign: "center"
                    }}>Not a Member? <Text style={{
                        fontSize: 18, fontWeight: "bold", color: layout.colors.deepBlue
                    }} onPress={() => navigation.navigate("SignUp")}>Register</Text></Text>
                </View>
            </View>
        </View>
    </SafeAreaProvider>);

}
const styles = StyleSheet.create({
    textInput: {
        width: layout.WINDOW.width * .95,
        height: layout.WINDOW.height * .07,
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.white,
        fontSize: 20,
        borderRadius: 10,
        margin: 5,
        padding: 10,
        elevation: layout.elevation.elevation
    }, wrapperCustom: {
        elevation: layout.elevation.elevation,
        alignItems: "center",
        width: layout.WINDOW.width * .95,
        borderRadius: 8,
        padding: 6,
        height: layout.WINDOW.height * .07
    },
})
