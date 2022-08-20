/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
    ActivityIndicator as Indicator,
    ColorValue,
    StyleProp,
    Text as DefaultText,
    TextInput as DefaultTextInput,
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

interface indicatorProps {
    style: StyleProp<ViewProps>;
    size: any;
    animating: boolean | undefined;
    color: ColorValue | undefined;
    children?: React.ReactNode;
    focusable?: boolean


}

export function Text(props: TextProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return <DefaultText style={[style]} {...otherProps} />;
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

export function ActivityIndicator(props: indicatorProps) {
    return <Indicator {...props}   />;
}
