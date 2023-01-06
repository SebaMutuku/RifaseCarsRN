import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import HeaderSection from "../../components/HeaderSection";
import React from "react";
import { DarkTheme, useNavigation } from "@react-navigation/native";
import { CombinedNavigationProps } from "../../navigation/ScreenTypes";
import { Checkbox } from "react-native-paper";
import {
  ActivityIndicator,
  CheckBox,
  KeyboardAvoidingComponent,
  Text,
  View,
} from "../../components/Widgets";
import TextInputComponent from "../../components/TextInputComponent";
import { buttonStyle, sharedStyles } from "../../utils/SharedStyles";
import utils from "../../utils/Utils";
import toast from "../../utils/toast";
import { RegisterConstants, appFonts } from "../../utils/AllConstant";
import { RegisterResponse } from "../../utils/AppInterfaces";

export default function SignUpScreen() {
  const [state, setState] = React.useState({
    username: "",
    password: "",
    phoneNumber: "",
    checkBoxChecked: false,
    showPassword: true,
    loading: false,
    disabledButton: false,
  });
  const navigation = useNavigation<CombinedNavigationProps>();

  function inputsValid() {
    return (
      state.phoneNumber.length > 0 &&
      state.phoneNumber.length < 14 &&
      state.username.length > 0 &&
      state.password.length >= 8 &&
      state.checkBoxChecked
    );
  }

  function onRegister() {
    if (inputsValid()) {
      setState({
        ...state,
        loading: true,
        disabledButton: true,
      });

      setTimeout(
        () => {
          if (
            state.username != null &&
            state.password != null &&
            state.phoneNumber + "" != null
          ) {
            const registrationData = {
              username: state.username,
              password: state.password,
              phonenumber: state.phoneNumber,
            };
            utils
              .postData(utils.appUrl + "/users/register", registrationData)
              .then((response) => {
                let responseData: RegisterResponse = response;
                if (
                  responseData.responseCode === RegisterConstants.SUCCESS_CODE
                ) {
                  if (
                    responseData.user?.username != null &&
                    responseData.user?.user_id != null
                  ) {
                    toast.success({
                      message: responseData.message,
                    });
                    navigation.navigate("Login");
                  }
                } else if (
                  responseData.responseCode === RegisterConstants.EXISTS_CODE
                ) {
                  toast.danger({
                    message: response.message,
                  });
                } else {
                  toast.danger({
                    message: response.message,
                  });
                }
              })
              .catch((error) => {
                toast.danger({
                  message: error.message,
                });
              })
              .finally(() => {
                setState({
                  ...state,
                  loading: false,
                  disabledButton: false,
                });
              });
          }
        },
        2000,
        []
      );
    }
    return;
  }

  return (
    <KeyboardAvoidingComponent>
      {ActivityIndicator(state.loading)}
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: layout.colors.backgroundColor,
        }}
      >
        {/*upperImageView*/}
        <HeaderSection
          actionText="Create an account with us"
          containerHeaderStyle={sharedStyles.containerHeaderStyle}
          actionTextStyle={sharedStyles.actionTextStyle}
        />
        {/*inputs view*/}
        <View style={{ flex: 1 }}>
          <TextInputComponent
            placeholder="Enter phone number starting with 07"
            onChange={(value) =>
              setState({ ...state, phoneNumber: value.trim() })
            }
            secureEntry={false}
            containerStyles={sharedStyles.searchInputMainContainer}
            inputView={[sharedStyles.searchInputContainer]}
            searchInput={sharedStyles.searchInput}
            autoCapitalize="none"
            keyboardType="number-pad"
            value={state.phoneNumber}
            iconName="phone"
            iconSize={25}
            underlineColorAndroid="transparent"
            blurOnSubmit={true}
            label="Mobile Number"
          />
          <TextInputComponent
            placeholder="Enter a username"
            onChange={(text) => setState({ ...state, username: text.trim() })}
            secureEntry={false}
            containerStyles={sharedStyles.searchInputMainContainer}
            inputView={[sharedStyles.searchInputContainer]}
            searchInput={sharedStyles.searchInput}
            autoCapitalize="none"
            keyboardType="default"
            value={state.username}
            iconName="account"
            iconSize={25}
            underlineColorAndroid="transparent"
            blurOnSubmit={true}
            label="Username"
          />
          <TextInputComponent
            placeholder="Enter a password"
            onChange={(text) => setState({ ...state, password: text.trim() })}
            secureEntry={state.showPassword}
            containerStyles={sharedStyles.searchInputMainContainer}
            inputView={[sharedStyles.searchInputContainer]}
            searchInput={sharedStyles.searchInput}
            autoCapitalize="none"
            keyboardType="default"
            value={state.password}
            iconName={state.showPassword ? "eye-off" : "eye"}
            onPressIcon={() =>
              setState({
                ...state,
                showPassword: !state.showPassword,
              })
            }
            iconSize={25}
            underlineColorAndroid="transparent"
            blurOnSubmit={true}
            label="Password"
          />
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <CheckBox
              label="Accept terms and conditions here"
              checked={false}
              getChecked={false}
              checkboxRef={null}
            />
          </View>
          <Pressable
            onPress={() => onRegister()}
            disabled={!inputsValid() || state.disabledButton}
            style={{
              ...buttonStyle(inputsValid()).button,
            }}
          >
            <Text
              style={{
                ...registerStyles.buttonText,
                color: layoutParams.colors.white,
              }}
            >
              Sign Up
            </Text>
          </Pressable>
          <Text
            style={{
              margin: 10,
              textAlign: "center",
              fontFamily: appFonts.WorkSans_500Medium,
            }}
          >
            Already have an account?{" "}
            <Text
              style={{
                color: layout.colors.deepBlue,
                fontFamily: appFonts.WorkSans_500Medium,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingComponent>
  );
}
const registerStyles = StyleSheet.create({
  buttonText: {
    fontFamily: appFonts.Poppins_500Medium,
    textAlign: "center",
  },
});
