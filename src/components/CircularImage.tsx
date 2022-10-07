import React from "react";
import {Avatar} from "@rneui/themed";
import {AvatarPropsInterface} from "../utils/AppInterfaces";



export default function CircularImage({...props}: AvatarPropsInterface) {
    return (<Avatar {...props} />

    );
}
