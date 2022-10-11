import {Text, View} from "../components/Widgets";
import {BottomSheet} from "@rneui/base";

interface CloseAccountProps {
    visible: boolean | undefined;
    height: number
}

export default function CloseAccount({...props}: CloseAccountProps) {
    function children() {
        return (
            <View>
                <Text>Visible</Text>
            </View>)
    }

    return (<BottomSheet>
        <View>
            <Text>Bottom sheet</Text>
        </View>
    </BottomSheet>)
}
