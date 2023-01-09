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
  View as DefaultView,
  SafeAreaView,
} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import layoutParams from "../utils/LayoutParams";
import React from "react";
import {
  AppCheckBoxProps,
  BottomSheetComponentProps,
  IconProps,
  KeyBoardProps,
  ListItemProfileProps,
  LoadingLinearProps,
  ThemeProps,
} from "../utils/AppInterfaces";
import Colors from "../constants/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { appFonts } from "../utils/AllConstant";
import {
  BottomSheet,
  Icon,
  LinearProgress,
  ListItem,
  Switch,
} from "react-native-elements";
import { DarkTheme } from "react-native-paper";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colorName;
  }
}

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export const toastRef = React.createRef<any>();

export function CheckBox({ ...props }: AppCheckBoxProps) {
  const [checked, setChecked] = React.useState(props.checked);
  let checkboxRef: BouncyCheckbox | null = null;
  props.getChecked = checked;
  return (
    <BouncyCheckbox
      style={{ marginTop: 16 }}
      ref={(ref: any) => (checkboxRef = ref)}
      isChecked={checked}
      text={props.label}
      fillColor={layoutParams.colors.primaryColor}
      textStyle={{
        color: layoutParams.colors.black,
        fontFamily: appFonts.WorkSans_500Medium,
      }}
      unfillColor={layoutParams.colors.backgroundColor}
      disableBuiltInState
      onPress={() => setChecked(!checked)}
    />
  );
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <DefaultText
      style={[{ color }, style]}
      {...otherProps}
      allowFontScaling={true}
      adjustsFontSizeToFit={true}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return (
    <DefaultTextInput style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function ActivityIndicatorComponent(visible: boolean) {
  return (
    visible && (
      <View
        style={{
          width: layoutParams.WINDOW.width,
          height: layoutParams.WINDOW.height,
          position: "absolute",
          zIndex: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: layoutParams.WINDOW.width * 0.7,
            height: layoutParams.WINDOW.height * 0.2,
            backgroundColor: layoutParams.colors.white,
            ...layoutParams.elevation,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Indicator
            size="large"
            color={layoutParams.colors.deepBlue}
            animating={true}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontFamily: appFonts.Roboto_500Medium,
            }}
          >
            Loading...
          </Text>
        </View>
      </View>
    )
  );
}

export const toastComponent = (text: string) => {
  toastRef.current?.show(text);
};

export function KeyboardAvoidingComponent({ children }: KeyBoardProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <React.Fragment>{children}</React.Fragment>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export function IconComponent({ ...props }: IconProps) {
  return (
    <Icon
      name={props.icon}
      size={props.size}
      type={props.iconType}
      color={props.color}
      onPress={props.onPress}
    />
  );
}

export function ProfileListItemComponent({ ...props }: ListItemProfileProps) {
  return (
    <ListItem
      onPress={props.onPress}
      style={{
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: layoutParams.colors.backgroundColor,
      }}
    >
      <IconComponent
        color={props.titleAndiconColor as string}
        icon={props.leftIcon}
        iconType={props.leftIconType}
        size={18}
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            color: props.titleAndiconColor,
            fontFamily: appFonts.WorkSans_400Regular,
          }}
        >
          {props.title}
        </ListItem.Title>
      </ListItem.Content>
      {props.chevron && <ListItem.Chevron />}
      <View
        style={{
          alignItems: "center",
        }}
      >
        {props.rightIcon && (
          <Switch
            value={props.value}
            color={layoutParams.colors.primaryColor}
          />
        )}
      </View>
    </ListItem>
  );
}

export function BottomSheetComponent({ ...props }: BottomSheetComponentProps) {
  return (
    <SafeAreaView>
      <BottomSheet {...props}>{props.children}</BottomSheet>
    </SafeAreaView>
  );
}
export function LinearProgressComponent({ loading }: LoadingLinearProps) {
  return (
    <>
      {loading && (
        <LinearProgress
          color={layoutParams.colors.primaryColor}
          accessibilityViewIsModal
          accessible={false}
          children={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Text>Loading</Text>
            </View>
          }
          style={{
            justifyContent: "center",
            alignContent: "center",
            // top: 300,
            // position: "absolute",
          }}
        />
      )}
    </>
  );
}
