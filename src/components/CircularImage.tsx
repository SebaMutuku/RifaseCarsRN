import {ImageSourcePropType, ImageStyle} from "react-native";
import React from "react";
import {Avatar} from "@rneui/themed";

interface AvatarProps {
    avatarStyle?: ImageStyle;
    source: ImageSourcePropType;
    onPress?: () => void;
    size: number;
    rounded?: boolean
}

export default function CircularImage({...props}: AvatarProps) {
    return (<Avatar {...props} />

    );
}
