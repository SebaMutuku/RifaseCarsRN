import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CombinedNavigationProps } from "../../navigation/ScreenTypes";
import layout from "../../utils/LayoutParams";
import layoutParams from "../../utils/LayoutParams";
import React from "react";
import HeaderSection from "../../components/HeaderSection";
import {
  ActivityIndicator,
  KeyboardAvoidingComponent,
  Text,
  View,
} from "../../components/Widgets";
import Toast from "react-native-toast-message";
import TextInputComponent from "../../components/TextInputComponent";
import { buttonStyle, sharedStyles } from "../../utils/SharedStyles";
import utils from "../../utils/Utils";
import { LoginResponse } from "../../utils/AppInterfaces";
import toast from "../../utils/toast";
import { AuthContext } from "../../utils/AuthContext";
import { appFonts } from "../../utils/AllConstant";

export default function LoginScreen() {
  const [state, setState] = React.useState({
    username: "",
    password: "",
    token: "",
    loading: false,
    showToast: false,
    toastMessage: "",
    toastType: "",
    showPassword: false,
    disabledButton: false,
  });
  const navigation = useNavigation<CombinedNavigationProps>();
  const translateX = React.useRef<Animated.Value>(
    new Animated.Value(50)
  ).current;
  const opacity = React.useRef<Animated.Value>(new Animated.Value(0.1)).current;
  const { signIn } = React.useContext(AuthContext);
  function inputsValid() {
    return state.username.length > 0 && state.password.length >= 8;
  }

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function onLogin() {
    if (inputsValid()) {
      setState({
        ...state,
        loading: true,
        disabledButton: true,
      });
      setTimeout(() => {
        if (state.username != null && state.password != null) {
          const data = {
            username: state.username,
            password: state.password,
          };
          utils
            .postData(utils.appUrl + "/users/login", data)
            .then((response) => {
              let responseData: LoginResponse = response;
              if (
                responseData.user != null &&
                responseData.user.token != null
              ) {
                utils.saveValue(
                  "username",
                  JSON.stringify(responseData.user.username)
                );
                utils.saveValue(
                  "token",
                  JSON.stringify(responseData.user.token)
                );
                utils.saveValue(
                  "role_id",
                  JSON.stringify(responseData.user.role_id)
                );
                signIn(responseData.user.token);
                toast.success({
                  message: responseData.message,
                });
              } else {
                toast.success({
                  message: responseData.message,
                });
              }
            })
            .finally(() => {
              setState({
                ...state,
                toastType: "",
                toastMessage: "",
                showToast: false,
                disabledButton: false,
              });
            });
        }
      }, 2000);
    }
    return;
  }

  return (
    <KeyboardAvoidingComponent>
      {ActivityIndicator(state.loading)}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: layoutParams.colors.backgroundColor,
        }}
      >
        <HeaderSection
          actionText="Access to your account"
          containerHeaderStyle={sharedStyles.containerHeaderStyle}
          actionTextStyle={sharedStyles.actionTextStyle}
        />

        <View style={{ flex: 1 }}>
          <TextInputComponent
            placeholder="Enter your username"
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
            label="Username"
          />

          <Toast
            position="bottom"
            bottomOffset={20}
            type="info"
            autoHide={true}
            visibilityTime={4000}
            onShow={() => (
              <View>
                <Text>Loading....</Text>
              </View>
            )}
          />
          <TextInputComponent
            placeholder="Enter your password"
            onChange={(text) => setState({ ...state, password: text.trim() })}
            secureEntry={!state.showPassword}
            containerStyles={sharedStyles.searchInputMainContainer}
            inputView={[sharedStyles.searchInputContainer]}
            searchInput={sharedStyles.searchInput}
            autoCapitalize="none"
            keyboardType="default"
            value={state.password.trim()}
            icon={!state.showPassword ? "eye-off" : "eye"}
            iconType="ionicon"
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

          <Text
            style={{
              textAlign: "right",
              marginRight: 10,
              color: layout.colors.deepBlue,
              fontFamily: appFonts.WorkSans_500Medium,
            }}
            onPress={() => navigation.navigate("Reset")}
          >
            Forgot your password?
          </Text>

          <Pressable
            style={{
              ...buttonStyle(inputsValid()).button,
            }}
            onPress={() => {
              onLogin();
              // showToast("User Logged In")
            }}
            disabled={!inputsValid() || state.disabledButton}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: layoutParams.colors.white,
              }}
            >
              Login
            </Text>
          </Pressable>
          <Text
            style={{
              margin: 3,
              textAlign: "center",
              fontFamily: appFonts.WorkSans_500Medium,
            }}
          >
            Not a Member?{" "}
            <Text
              style={{
                color: layout.colors.deepBlue,
                fontFamily: appFonts.WorkSans_500Medium,
              }}
              onPress={() => navigation.navigate("SignUp")}
            >
              Register
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingComponent>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    fontFamily: appFonts.WorkSans_600SemiBold,
    textAlign: "center",
  },
});
