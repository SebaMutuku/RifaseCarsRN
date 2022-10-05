import {TextInput, View} from "./Components";
import layoutParams from "../utils/LayoutParams";
import React from "react";
import {ColorValue, KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface textInputProps {
    placeholder: string;
    onChange: (text: string) => void;
    secureEntry: boolean,
    containerStyles: StyleProp<ViewStyle>;
    inputView: StyleProp<ViewStyle>;
    searchInput: StyleProp<TextStyle>;
    autoCapitalize: any
    blurOnSubmit?: boolean
    keyboardType: KeyboardTypeOptions | undefined;
    underlineColorAndroid?: ColorValue | undefined;
    value: any;
    iconName: string;
    iconSize: number;
    iconColor:string
}

const TextInputComponent = ({...props}: textInputProps) => (<View style={[props.containerStyles]}>
    <View style={props.inputView}>
        <TextInput
            style={[props.searchInput, !layoutParams.platform.isAndroid && {paddingVertical: 16},]}
            autoCapitalize={props.autoCapitalize}
            selectionColor="dodgerblue"
            placeholderTextColor="#B9BABC"
            placeholder={props.placeholder}
            onChangeText={props.onChange}
            value={props.value}
            blurOnSubmit={props.blurOnSubmit}
            underlineColorAndroid={props.underlineColorAndroid}
            secureTextEntry={props.secureEntry}
            keyboardType={props.keyboardType}
        />
        <Icon name={props.iconName} size={props.iconSize} color={props.iconColor}/>
    </View>
</View>);

export default TextInputComponent;
