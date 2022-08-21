import {FlatList, ListRenderItem, StyleProp, ViewStyle} from "react-native";
import React, {Key} from "react";

interface flatlistProps {
    showsHorizontallIndicator: boolean,
    showsVerticalScrollIndicator?: boolean,
    data: readonly ({ id: string, title: string } | undefined)[] | null | undefined;
    renderItem: ListRenderItem<{ id: string, title: string } | undefined> | null | undefined;
    ListFooterComponentStyle: StyleProp<ViewStyle>;
    ListFooterComponent: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined
    keyExtractor: ((item: ({ id: string, title: string } | undefined), index: number) => string) | undefined;
    key: Key | null | undefined;
    extraData: any;
    horizontal?: boolean;
    columnWrapperStyle?: StyleProp<ViewStyle>;
    contentContainerStyle: StyleProp<ViewStyle>;
    itemSeparatorComponent?: React.ComponentType<any> | null | undefined;
    numColumns: number | undefined;
    pagingEnabled?: boolean | undefined;
}

export default function FlatListView({...props}: flatlistProps) {
    return (<FlatList {...props}/>);
}
