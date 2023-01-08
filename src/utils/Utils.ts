import * as SecureStore from "expo-secure-store";
import layoutParams from "./LayoutParams";
import { PixelRatio } from "react-native";
import { toastComponent } from "../components/Widgets";
import useColorScheme from "../hooks/useColorScheme";
export declare type IconType =
  | "material"
  | "material-community"
  | "material-community-icons"
  | "simple-line-icon"
  | "zocial"
  | "font-awesome"
  | "octicon"
  | "ionicon"
  | "foundation"
  | "evilicon"
  | "entypo"
  | "antdesign"
  | "font-awesome-5"
  | "antdesign"
  |"fontisto"
  | string;

export const appBaseUrl = "https://carfueldjango.herokuapp.com/api";
export const checkValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export async function saveValue(key: string, value: any) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.log(e);
  }
}

export async function getValue(key: string) {
  try {
    let value = await SecureStore.getItemAsync(key);
    return value ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function removeValue(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getData(url: string, ...params: any): Promise<any> {
  let response;
  if (params.length == 0) {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        return null;
      });
  } else {
    response = await fetch(url, {
      body: JSON.stringify(params),
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  return response;
}

export async function postData(url: string, ...params: any): Promise<any> {
  let response;
  response = await fetch(url, {
    body: JSON.stringify(params[0]),
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      toastComponent(error.message);
      console.log(error);
    });
  return response;
}

export function fontSizeNormalized(size: number, multiplier = 2) {
  const scale =
    (layoutParams.WINDOW.width / layoutParams.WINDOW.height) * multiplier;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function generateUuid() {
  let chars = "0123456789abcdef".split("");
  let uuid = [],
    rnd = Math.random,
    r;
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
  uuid[14] = "4"; // version 4
  for (let i = 0; i < 36; i++) {
    if (!uuid[i]) {
      r = 0 | (rnd() * 16);
      uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r & 0xf];
    }
  }
  return uuid.join("");
}
export const SHOW_TOAST_MESSAGE = "SHOW_TOAST_MESSAGE";

export function changeBackgroundColor() {
  const colorScheme = useColorScheme();
  return colorScheme == "light"
    ? layoutParams.colors.backgroundColor
    : layoutParams.colors.white;
}

const utils = {
  saveValue,
  getValue,
  removeValue,
  appUrl: appBaseUrl,
  checkValidMail,
  getData,
  postData,
  generateUuid,
  SHOW_TOAST_MESSAGE,
  changeBackgroundColor,
};

export default utils;
