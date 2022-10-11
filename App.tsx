import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import {HomeStackNavigator, UnauthenticatedNavigator} from './src/navigation/Navigation';
import layoutParams from "./src/utils/LayoutParams";
import Toast from './src/components/AnotherToast'
import {Action, AppAuthState} from "./src/utils/AppInterfaces";
import utils from "./src/utils/Utils";
import {AuthContext} from "./src/utils/AuthContext";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {navigationRef} from "./src/navigation/RootNavigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [state, dispatch] = React.useReducer<React.Reducer<AppAuthState, Action>>((prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState, userToken: action.token, isLoading: false
        }
      case 'AUTHENTICATED':
        return {
          ...prevState, userToken: action.token, isLoading: false,
        };
      case 'SIGN_OUT':
        return {
          ...prevState, isSignout: true, userToken: undefined,
        };
      case "SIGN_UP":
        return {
          ...prevState, userToken: "", isLoading: false, signout: true
        }

    }
  }, {
    isLoading: true, signout: false, userToken: undefined,
  });

  async function getToken() {
    const token = await utils.getValue("token")
    return token;

  }

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await utils.getValue('token');
        if (userToken != null || userToken != undefined) {
          dispatch({type: 'AUTHENTICATED', token: userToken});
        } else {
          dispatch({type: 'SIGN_OUT', token: ""});
        }
      } catch (e) {
        dispatch({type: 'SIGN_OUT', token: ""});
      }
    };

    bootstrapAsync();
  }, []);


  const authContext = React.useMemo(() => ({
    retrieveToken: async (data: any) => {

    }, signIn: async (token: string) => {
      if (token) {
        dispatch({type: 'AUTHENTICATED', token: token})
      } else {
        dispatch({type: 'SIGN_OUT', token: ""})
      }
    }, signUp: async (...data: string[]) => {

    },

    signOut: async () => {
      let token;
      try {
        token = await utils.getValue("token");
        if (token) {
          dispatch({type: 'SIGN_OUT', token: token})
        }
      } catch (e) {
        console.log("Exception occurred", e.message);
        return null;
      }
    }, home: async (data: any) => {
      let token: any;
      try {
        token = utils.getValue("token");
        if (token) {
          dispatch({type: 'AUTHENTICATED', token: "15151552"});
        }
      } catch (e) {
        console.log("Exception occurred", e);
        return null;
      }

    }, toggleTheme: () => {
      //     setIsDarkTheme(isDarkTheme => !isDarkTheme);
    },

  }), []);
  return (<SafeAreaProvider>
    <AuthContext.Provider value={authContext}>
      {isLoadingComplete && <>
        <StatusBar translucent={false} animated={true} backgroundColor={layoutParams.colors.black} style="auto"/>
        <NavigationContainer
            theme={colorScheme === 'light' ? DarkTheme : DefaultTheme}
            ref={navigationRef}>
          {state.userToken != null || state.userToken != undefined ? <HomeStackNavigator/> :
              <UnauthenticatedNavigator/>}
          {/*<HomeStackNavigator/>*/}
        </NavigationContainer>
        <Toast/>
      </>}
    </AuthContext.Provider>
  </SafeAreaProvider>);
}
