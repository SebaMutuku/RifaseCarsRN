import { TextInput, View, Text } from "./Widgets";
import layoutParams from "../utils/LayoutParams";
import React from "react";
import {
  ColorValue,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Icon } from "react-native-elements";
import { appFonts } from "../utils/AllConstant";
import { IconType } from "../utils/Utils";

interface textInputProps {
  placeholder: string;
  onChange: (text: string) => void;
  secureEntry: boolean;
  containerStyles: StyleProp<ViewStyle>;
  inputView: StyleProp<ViewStyle>;
  searchInput: StyleProp<TextStyle>;
  autoCapitalize: any;
  blurOnSubmit?: boolean;
  keyboardType: KeyboardTypeOptions | undefined;
  underlineColorAndroid?: ColorValue | undefined;
  value: any;
  icon?: string;
  iconType?: IconType;
  onPressIcon?: () => void;
  iconSize: number;
  label?: string;
}

const TextInputComponent = ({ ...props }: textInputProps) => {
  const [state, setState] = React.useState({
    borderColor: layoutParams.colors.lighGrey,
  });
  function onFocus() {
    setState({
      borderColor: layoutParams.colors.primaryColor,
    });
  }
  function onBlur() {
    setState({
      borderColor: layoutParams.colors.lighGrey,
    });
  }
  return (
    <View style={[props.containerStyles]}>
      {props.label && (
        <Text
          style={{
            fontFamily: appFonts.WorkSans_500Medium,
            marginLeft: 10,
            marginBottom: 5,
            color: layoutParams.colors.deepBlue,
          }}
        >
          {props.label}
        </Text>
      )}
      <View style={[props.inputView, { borderColor: state.borderColor }]}>
        <TextInput
          style={[
            props.searchInput,
            !layoutParams.platform.isAndroid && { paddingVertical: 16 },
          ]}
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
          focusable={true}
          allowFontScaling={true}
          onFocus={onFocus}
          onBlur={onBlur}
          accessibilityLabel={props.label}
        />
        <Icon
          type={props.iconType}
          name={props.icon as string}
          size={props.iconSize}
          color={layoutParams.colors.grey}
          onPress={props.onPressIcon}
        />
      </View>
    </View>
  );
};

export default TextInputComponent;
