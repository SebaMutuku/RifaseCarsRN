/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {CompositeNavigationProp, CompositeScreenProps, RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp, StackScreenProps} from "@react-navigation/stack";
import {BottomTabNavigationProp, BottomTabScreenProps} from "@react-navigation/bottom-tabs";

declare global {
  namespace ReactNavigation {
    interface HomeBottomTabLists extends HomeBottomTabParamList {
    }

    interface HomeStacksLists extends HomeStackParamList {
    }

    interface LoginStacksList extends UnauthenticatedParamList {
    }
  }
}

export type HomeBottomTabParamList = {
  HomeTab: StackScreenProps<HomeStackParamList>;
  LastOrders: undefined;
  Profile: undefined
  Messages: undefined
};

export type RootStackScreenProps<screen extends keyof HomeBottomTabParamList> = NativeStackScreenProps<HomeBottomTabParamList,
    screen>;

export type HomeStackParamList = {
  HomeStack: undefined;
  CarDetails: { cardetails: {} } | undefined
  Wallet: undefined,
  UserMessage: { fromUser: string, fromUserImage: any } | undefined

};
export type UnauthenticatedParamList = {
  Login: undefined;
  SignUp: undefined;
  Reset: undefined,
  HomeScreen: StackScreenProps<HomeBottomTabParamList> | undefined
};

export type HomeBottomTabScreenProps<Screen extends keyof HomeBottomTabParamList> = CompositeScreenProps<BottomTabScreenProps<HomeBottomTabParamList, Screen>,
    NativeStackScreenProps<HomeBottomTabParamList>>;
export type CombinedRouteProps = RouteProp<UnauthenticatedParamList>

export type AuthenticationTabScreenProps = CompositeNavigationProp<StackNavigationProp<UnauthenticatedParamList, 'Login'>,
    StackNavigationProp<HomeStackParamList, "HomeStack">>;

export type CombinedNavigationProps = CompositeNavigationProp<StackNavigationProp<UnauthenticatedParamList>,
    CompositeNavigationProp<BottomTabNavigationProp<HomeBottomTabParamList>, StackNavigationProp<HomeStackParamList>>>;
export type HomeRouteProp = RouteProp<HomeBottomTabParamList>;
