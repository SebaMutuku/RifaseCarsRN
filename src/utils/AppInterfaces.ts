import {ImageSourcePropType, ImageStyle, ListRenderItem, StyleProp, TextStyle, ViewStyle} from "react-native";
import React, {Key} from "react";


export interface AppAuthState {
    isLoading: boolean;
    signout: boolean;
    userToken: undefined | string;

}

export type Action =
    { type: 'RETRIVE_TOKEN', token: string | undefined }
    | { type: 'AUTHENTICATED'; token: string | undefined }
    | { type: 'SIGN_UP'; token: string | undefined }
    | { type: 'SIGN_OUT', token: string | undefined };

export interface CarItemProps {
    id: string;
    make: string;
    mileage: string;
    price: string;
    yom: string;
}


export interface carData {
    id: any;
    make: string | undefined;
    model?: string
    mileage: string | number,
    yom: string
    price: string;
    imageUrl: string | undefined;

}

export interface MessageTemplate {
    from: string;
    lastMessage: string,
    messageTime: string | typeof Date;
    imageUrl: string;
}

export interface CommunicationDataProps {
    sender: string;
    message: string;
    messageTime: string | typeof Date;
}

export interface SectionDateInterface {
    title: string;
    data: [...args: string[]]
}

export interface MessageContext {
    sender: string,
    message: string,
    messageTime: string
}

export interface flatlistProps {
    showsVerticalScrollIndicator?: boolean,
    showsHorizontalScrollIndicator?: boolean,
    data: any [];
    renderItem: any;
    ListFooterComponentStyle?: StyleProp<ViewStyle>;
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined
    keyExtractor: ((item: ({ id: string, title: string } | undefined), index: number) => string) | undefined;
    key?: Key | null | undefined;
    extraData?: any;
    horizontal?: boolean;
    columnWrapperStyle?: StyleProp<ViewStyle>;
    contentContainerStyle: StyleProp<ViewStyle>;
    itemSeparatorComponent?: React.ComponentType<any> | null | undefined;
    numColumns?: number | undefined;
    pagingEnabled?: boolean | undefined;
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined;
    initialScrollIndex?: number
}

export interface HeaderProps {
    containerHeaderText?: string;
    containerHeaderStyle: StyleProp<TextStyle>;
    actionTextStyle: StyleProp<TextStyle>;
    actionText: string;
}

export interface AvatarPropsInterface {
    avatarStyle?: ImageStyle;
    source: ImageSourcePropType;
    onPress?: () => void;
    size: number;
    rounded?: boolean
}

export interface KeyBoardProps {
    children: React.ReactNode
}

export type ThemeProps = {
    lightColor?: string; darkColor?: string;
};
export interface CarViewProps {
    carData: carData;
    index: number;
}
export interface PopularCarListProps {
    index: number;
    selectedId: number,
    objectItem: any;
    renderCarSpecs: React.ReactNode;
    onPress: () => void;
}

export interface CarBrandsProps {
    index: number;
    item: any;
    onPress: () => void;
    populaCarData: carData[];
    brandSelected: number
}

export interface User {
    user_id: string;
    username: string;
    password: string;
    phoneNumber: string;
    token?: string;
    active: boolean;
    admin: boolean;
    createdAt: Date;
}

export interface LoginResponse {
    message: string;
    user: {
        token: string; role: number; username: string;
    }
}

export interface RegisterResponse {

    user?: {
        username: string,
        user_id: number,
        role_id: string
    },
    message: string;
    responseCode: number
}

export type BottomSheetProps = {
    children?: React.ReactNode; visible: boolean | undefined; height: number;
};

export interface ReviewData {
    date: string;
    reviewer: string;
    rating: string;
    reviewSammury: string;
    comment: string;
}
