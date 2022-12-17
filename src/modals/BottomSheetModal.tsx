import BottomSheet from "@gorhom/bottom-sheet";
import React from "react";
import {Text,View} from "../components/Widgets";


interface BottomSheetProps {
    children: React.ReactNode

}

const BottomSheetModal = () => {
    return <BottomSheet snapPoints={[200, 500]} >
        <View style={{ }}>
            <Text>Welcom...</Text>
        </View>
    </BottomSheet>

}
export default BottomSheetModal;
