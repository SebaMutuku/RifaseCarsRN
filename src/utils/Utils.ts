import * as SecureStore from 'expo-secure-store';
import layoutParams from "./LayoutParams";
import {PixelRatio} from "react-native";

export const appBaseUrl = "https://heroku";
export const checkValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export async function saveValue(key: string, value: any) {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        console.log(e)
    }
}

export async function getValue(key: string) {
    try {
        let value = await SecureStore.getItemAsync(key);
        return value ?? null;
    } catch (e) {
        console.log(e)
        return null;
    }
}

export async function removeValue(key: string) {
    try {
        await SecureStore.deleteItemAsync(key);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export async function getData(url: string, ...params: any): Promise<any> {
    let response;
    if (params.length == 0) {
        response = await fetch(url, {
            method: "GET", headers: {
                "Content-Type": "Application/json",
            }
        }).then(response => response.json()).catch(error => {
            console.log(error)
            return null
        });
    } else {
        response = await fetch(url, {
            body: JSON.stringify(params), method: "GET", headers: {
                "Content-Type": "Application/json",
            }
        }).then(response => response.json()).catch(error => {
            console.log(error)
            return null
        });

    }
    return response;
}

export async function postData(url: string, ...params: any): Promise<any> {
    let response;
    response = await fetch(url, {
        body: JSON.stringify(params), method: "POST", headers: {
            "Content-Type": "Application/json",
        }
    }).then(response => response.json()).catch(error => {
        console.log(error)
        return null
    });
    return response;
}

export function fontSizeNormalized(size: number, multiplier = 2) {
    const scale = (layoutParams.WINDOW.width / layoutParams.WINDOW.height) * multiplier;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const utils = {
    saveValue, getValue, removeValue, appUrl: appBaseUrl, checkValidMail, getData, postData
}

export default utils;
