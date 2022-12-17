import {Animated, StyleSheet} from "react-native";
import React from "react";
import {HeaderProps} from "../utils/AppInterfaces";
import {Text, View} from "./Widgets";
import layoutParams from "../utils/LayoutParams";


export default function HeaderSection({...props}: HeaderProps) {
    return (
        <Animated.View style={{
            ...headerStyles.container,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                padding: 10,
                height: layoutParams.WINDOW.height * 0.11,
                width: layoutParams.WINDOW.height * 0.11,
                backgroundColor: layoutParams.colors.listColors,
                justifyContent: 'center',
                borderRadius: 20,
                alignItems: 'center'
            }}>
                <Text style={{
                    ...headerStyles.headerText
                }}>
                    R
                </Text>
            </View>
            {props.containerHeaderStyle != null &&
                <Text style={props.containerHeaderStyle}>{props.containerHeaderText}</Text>}
            <Text style={props.actionTextStyle}>{props.actionText}</Text>

        </Animated.View>);

}
const headerStyles = StyleSheet.create({
    container: {
        backgroundColor: layoutParams.colors.backgroundColor,
        flex: 0.5,
    },
    headerText: {
        fontSize: layoutParams.WINDOW.height * 0.1,
        fontFamily: "WorkSans_700Bold",
        letterSpacing: 0.27,
    },
    logoText: {
        fontSize: layoutParams.WINDOW.height * 0.02,
        fontFamily: "WorkSans_600SemiBold",
        marginTop: layoutParams.WINDOW.height * 0.05,
        letterSpacing: 0.27
    }
})
