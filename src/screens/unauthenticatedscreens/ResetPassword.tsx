import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import layoutParams from "../../utils/LayoutParams";
import HeaderSection from "../../components/HeaderSection";
import {
  ActivityIndicatorComponent,
  KeyboardAvoidingComponent,
  toastComponent,
  Text,
  View,
} from "../../components/Widgets";
import TextInputComponent from "../../components/TextInputComponent";
import { buttonStyle, sharedStyles } from "../../utils/SharedStyles";
import utils from "../../utils/Utils";
import { GetUserresponse } from "../../utils/AppInterfaces";
import toast from "../../utils/toast";

export default function ResetPassword() {
  const [state, setState] = React.useState({
    username: "",
    password: "",
    showPassword: false,
    passFieldVisible: false,
    loading: false,
  });

  function inputsValid() {
    return state.username.length > 0;
  }

  React.useEffect(() => {}, [state.passFieldVisible]);

  function onResetPass() {
    if (inputsValid()) {
      setState({
        ...state,
        loading: true,
      });
    }
    setTimeout(() => {
      if (state.username != null) {
        const data = {
          username: state.username,
        };
        utils
          .postData(utils.appUrl + "/users/getUser", data)
          .then((response) => {
            let responseData: GetUserresponse = response;
            if (responseData.responseCode == 200) {
              setState({
                ...state,
                passFieldVisible: true,
              });
            } else {
              toast.success({
                message: responseData.message,
              });
            }
          })
          .catch((error) => toastComponent(error.message))
          .finally(() => {
            setState({
              ...state,
              loading: false,
            });
          });
      }
    }, 2000);
    return;
  }
  return (
    <KeyboardAvoidingComponent>
      <SafeAreaProvider>
        {ActivityIndicatorComponent(state.loading)}
        <View style={sharedStyles.container}>
          <HeaderSection
            actionText="Recover your account"
            containerHeaderStyle={sharedStyles.containerHeaderStyle}
            actionTextStyle={sharedStyles.actionTextStyle}
          />
          <View
            style={{
              flex: 1,
            }}
          >
            <TextInputComponent
              placeholder="Enter your username or phonenumber"
              onChange={(text) => setState({ ...state, username: text.trim() })}
              secureEntry={false}
              containerStyles={sharedStyles.searchInputMainContainer}
              inputView={[sharedStyles.searchInputContainer]}
              searchInput={sharedStyles.searchInput}
              autoCapitalize="none"
              keyboardType="default"
              value={state.username}
              icon="account"
              iconType="material-community"
              iconSize={25}
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              label="Username or Phone Number"
            />
            {state.passFieldVisible && (
              <TextInputComponent
                placeholder="password"
                onChange={(text) =>
                  setState({ ...state, password: text.trim() })
                }
                secureEntry={!state.showPassword}
                containerStyles={sharedStyles.searchInputMainContainer}
                inputView={[sharedStyles.searchInputContainer]}
                searchInput={sharedStyles.searchInput}
                autoCapitalize="none"
                keyboardType="default"
                value={state.password.trim()}
                icon={!state.showPassword ? "eye-off" : "eye"}
                iconType="material-icon"
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
            )}

            <Pressable
              style={{
                ...buttonStyle(inputsValid()).button,
              }}
              onPress={() => onResetPass()}
              disabled={!inputsValid()}
            >
              <Text
                style={{
                  ...resetPassStyles.buttonText,
                  color: layoutParams.colors.white,
                }}
              >
                Reset Password
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaProvider>
    </KeyboardAvoidingComponent>
  );
}
const resetPassStyles = StyleSheet.create({
  buttonText: {
    fontFamily: "Poppins_500Medium",
  },
});
