import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import {
  HomeStackNavigator,
  UnauthenticatedNavigator,
} from "./src/navigation/Navigation";
import Toast from "./src/components/AnotherToast";
import { Action, AppAuthState } from "./src/utils/AppInterfaces";
import utils from "./src/utils/Utils";
import { AuthContext } from "./src/utils/AuthContext";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { navigationRef } from "./src/navigation/RootNavigation";
import { StatusBar } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = isDarkTheme ? DarkTheme : DefaultTheme;

  const [state, dispatch] = React.useReducer<
    React.Reducer<AppAuthState, Action>
  >(
    (prevState, action) => {
      switch (action.type) {
        case "RETRIVE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "AUTHENTICATED":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: undefined,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            userToken: "",
            isLoading: false,
            signout: true,
          };
      }
    },
    {
      isLoading: true,
      signout: false,
      userToken: undefined,
    }
  );

  async function verifyToken() {
    const token = await utils.getValue("token");
    return token?.toString();
  }

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let userToken = await utils.getValue("token");
        userToken = "hahaaha";
        if (userToken !== null || userToken !== undefined) {
          dispatch({ type: "AUTHENTICATED", token: userToken });
        } else {
          dispatch({ type: "SIGN_OUT", token: "" });
        }
      } catch (e) {
        dispatch({ type: "SIGN_OUT", token: "" });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      retrieveToken: async (data: any) => {
        fetch("urls", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((response) => {
            console.table(response);
          });
      },
      signIn: async (token: string) => {
        if (token) {
          dispatch({ type: "AUTHENTICATED", token: token });
        } else {
          dispatch({ type: "SIGN_OUT", token: "" });
        }
      },
      signOut: async () => {
        let token;
        try {
          token = await utils.getValue("token");
          if (token) {
            await utils.removeValue("token");
            await utils.removeValue("username");
            dispatch({ type: "SIGN_OUT", token: "" });
          } else dispatch({ type: "SIGN_OUT", token: "" });
        } catch (e) {
          console.log("Exception occurred", e);
        }
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );
  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        {isLoadingComplete && (
          <>
            <StatusBar
              translucent={false}
              animated={true}
              barStyle={theme.dark ? "light-content" : "dark-content"}
            />
            <NavigationContainer theme={theme} ref={navigationRef}>
              {state.userToken != null || state.userToken != undefined ? (
                <HomeStackNavigator />
              ) : (
                <UnauthenticatedNavigator />
              )}
            </NavigationContainer>
            <Toast />
          </>
        )}
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
