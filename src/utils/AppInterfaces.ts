import {ImageSourcePropType, ImageStyle, ListRenderItem, StyleProp, ViewStyle} from "react-native";
import React, {Key} from "react";

export interface CarObjectInterface {
    id: string;
    make: string;
    mileage: string;
    price: string;
    yom: string;
}

export interface PopularCarInterface {
    id: any;
    make: string | undefined;
    mileage: string | number,
    yom: string
    price: string;
    imageUrl: string | undefined;
    model?: string
}

export interface MessagesData {
    from: string;
    lastMessage: string,
    messageTime: string | typeof Date;
    imageUrl: string;
}

export interface CommunicationDateInterface {
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
    renderItem: ListRenderItem<{ id: string, title: string } | undefined> | null | undefined;
    ListFooterComponentStyle?: StyleProp<ViewStyle>;
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined
    keyExtractor: ((item: ({ id: string, title: string } | undefined), index: number) => string) | undefined;
    key?: Key | null | undefined;
    extraData: any;
    horizontal?: boolean;
    columnWrapperStyle?: StyleProp<ViewStyle>;
    contentContainerStyle: StyleProp<ViewStyle>;
    itemSeparatorComponent?: React.ComponentType<any> | null | undefined;
    numColumns?: number | undefined;
    pagingEnabled?: boolean | undefined;
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined;
    initialScrollIndex?: number
}

export interface imageProps {
    borderRadii: number,
    resizeMode: any,
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
