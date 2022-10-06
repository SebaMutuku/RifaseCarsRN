/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
    ActivityIndicator as Indicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text as DefaultText,
    TextInput as DefaultTextInput,
    TouchableWithoutFeedback,
    View as DefaultView
} from 'react-native';
import useColorScheme from "../hooks/useColorScheme";
import layoutParams from "../utils/LayoutParams";
import React from "react";

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: any
) {
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return colorName
    }
}

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export const toastRef = React.createRef<any>();


export function Text(props: TextProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return <DefaultText style={[style]} {...otherProps} allowFontScaling={true} adjustsFontSizeToFit={true} />;
}

export function View(props: ViewProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, layoutParams.colors.backgroundColor);
    return <DefaultView style={style} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, layoutParams.colors.backgroundColor);
    return <DefaultTextInput style={style} {...otherProps} />;
}

export function ActivityIndicator(visible: boolean) {
    return (
        visible && (
            <View style={{
                width: layoutParams.WINDOW.width,
                height: layoutParams.WINDOW.height,
                position: 'absolute',
                zIndex: 10,
                alignItems: "center",
                justifyContent: 'center'
            }}>
                <View style={{
                    width: layoutParams.WINDOW.width * .7,
                    height: layoutParams.WINDOW.height * .2,
                    backgroundColor: layoutParams.colors.grey,
                    ...layoutParams.elevation,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                }}>
                    <Indicator size="large" color={layoutParams.colors.deepBlue} animating={true}/>
                    <Text style={{marginLeft: 10, fontSize: 20, fontFamily: "Roboto_500Medium"}}>Loading...</Text>
                </View>
            </View>
        ));
}

export const showToast = (text: string) => {
    toastRef.current?.show(text);
};
interface KeyBoardProps {
    children: React.ReactNode
}

export function KeyboardAvoidingComponent({children}: KeyBoardProps) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <React.Fragment>
                    {children}
                </React.Fragment>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


