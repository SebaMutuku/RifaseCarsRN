import {Pressable, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import React from "react";
import utils from "../../utils/Utils";
import displayImage from "../../utils/DisplayImage";
import {ActivityIndicator, KeyboardAvoidingComponent, Text, View} from "../../components/Components";
import Toast from "react-native-toast-message";
import {useToast} from "native-base";
import TextInputComponent from "../../components/TextInputComponent";

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
                        navigation.navigate("HomeScreen")
                    }).catch(error => console.log(error));
                }
            }, 3000);

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
                    <TextInputComponent placeholder="username"
                                        onChange={(text) => setState({...state, username: text})}
                                        secureEntry={false} containerStyles={styles.searchInputMainContainer}
                                        inputView={styles.searchInputContainer}
                                        searchInput={styles.searchInput} autoCapitalize="none"
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
                                        secureEntry={true} containerStyles={styles.searchInputMainContainer}
                                        inputView={styles.searchInputContainer}
                                        searchInput={styles.searchInput} autoCapitalize="none"
                                        keyboardType="default"
                                        value={state.password} iconName="lock"
                                        iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                        iconColor={layoutParams.colors.lighGrey}/>

                    <Text style={{
                        margin: 10, fontSize: 18, textAlign: "right", fontFamily: "WorkSans_500Medium"
                    }}>Forgot your password? <Text style={{
                        fontSize: 18, color: layout.colors.deepBlue, fontFamily: "WorkSans_500Medium"
                    }} onPress={() => navigation.navigate("Reset")}>Reset</Text></Text>
                    <Pressable style={{
                        ...styleCatrgory(inputsValid()).loginButton
                    }} onPress={() => onLogin()} disabled={!inputsValid()}>
                        <Text style={{
                            ...styles.buttonText,
                            color: inputsValid() ? layoutParams.colors.white : layoutParams.colors.black
                        }}>Login</Text>
                    </Pressable>
                    <Text style={{
                        margin: 3, fontSize: 18, textAlign: "center", fontFamily: "WorkSans_500Medium"
                    }}>Not a Member? <Text style={{
                        fontSize: 18, color: layout.colors.deepBlue, fontFamily: "WorkSans_500Medium"
                    }} onPress={() => navigation.navigate("SignUp")}>Register</Text></Text>

                </View>
            </View>
        </SafeAreaView>
        </KeyboardAvoidingComponent>);

}
const styles = StyleSheet.create({
    buttonStyle: {
        margin: layoutParams.WINDOW.height * .009,
        backgroundColor: layout.colors.black,
        marginBottom: layoutParams.WINDOW.height * .009,
        justifyContent: "center",
        borderColor: layout.colors.black,
        borderWidth: 0.2,
        borderRadius: 13
    }, buttonText: {
        fontFamily: "WorkSans_600SemiBold", fontSize: 20, textAlign: "center"
    }, searchInputMainContainer: {
        margin: 10
    }, searchInputContainer: {
        padding: 15,
        flexDirection: 'row',
        backgroundColor: layoutParams.colors.grey,
        borderRadius: 13,
        alignItems: 'center',
    }, searchInput: {
        flex: 1, fontSize: 16, fontFamily: 'WorkSans_500Medium', color: layoutParams.colors.black,
    },
})
const styleCatrgory = (validatedInput: boolean) => StyleSheet.create({
    loginButton: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 15,
        backgroundColor: validatedInput ? layout.colors.black : layout.colors.white,
        borderColor: layout.colors.black,
        borderWidth: 0.2,
        borderRadius: 13,
        margin: 10
    }
});
