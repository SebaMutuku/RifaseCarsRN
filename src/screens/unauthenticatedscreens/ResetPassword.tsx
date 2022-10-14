import React from "react";
import {Pressable, StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import layoutParams from "../../utils/LayoutParams";
import HeaderSection from "../../components/HeaderSection";
import utils from "../../utils/Utils";
import {Text, View} from "../../components/Widgets";
import TextInputComponent from "../../components/TextInputComponent";
import {buttonStyle, sharedStyles} from "../../utils/SharedStyles";

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
        <View style={sharedStyles.container}>
            {HeaderSection({
                actionText: "Recover your account",
                containerHeaderStyle: sharedStyles.containerHeaderStyle,
                actionTextStyle: sharedStyles.actionTextStyle
            })}
            <View style={{
                flex: 1
            }}>
                <TextInputComponent placeholder="password"
                                    onChange={(text) => setState({...state, email: text})}
                                    secureEntry={false} containerStyles={sharedStyles.searchInputMainContainer}
                                    inputView={sharedStyles.searchInputContainer}
                                    searchInput={sharedStyles.searchInput} autoCapitalize="none"
                                    keyboardType="email-address"
                                    value={state.email} iconName="email"
                                    iconSize={25} underlineColorAndroid="transparent" blurOnSubmit={true}
                                    iconColor={layoutParams.colors.lighGrey}/>


                <Pressable style={{
                    ...buttonStyle(!validateUserTextFields()).button
                }} onPress={() => onResetPass()} disabled={!validateUserTextFields()}>
                    <Text style={{
                        ...resetPassStyles.buttonText,
                        color: !validateUserTextFields() ? layoutParams.colors.white : layoutParams.colors.black
                    }}>
                        Reset Password
                    </Text>
                </Pressable>

            </View>
        </View>
    </SafeAreaProvider>);
}
const resetPassStyles = StyleSheet.create({
    buttonText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 20,
    }
})
