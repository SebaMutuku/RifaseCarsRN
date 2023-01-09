import { BottomSheetComponent, Text, View } from "../components/Widgets";
import { Modal, StyleSheet } from "react-native";
import React from "react";
import layoutParams from "../utils/LayoutParams";
import { appFonts } from "../utils/AllConstant";

interface CloseAccountProps {
  visible: boolean;
  modalHeading: string;
  children: React.ReactNode;
}

export default function ReusableBottomSheet({ ...props }: CloseAccountProps) {
  const [modalVisible, setModalVisible] = React.useState(props.visible);

  return (
    <View style={styles.centeredView}>
      <BottomSheetComponent
        children={props.children}
        isVisible={props.visible}
        containerStyle={{}}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    ...layoutParams.elevation,
  },
  titleStyle: {
    fontFamily: appFonts.Poppins_400Regular,
  },
  button: {
    padding: 10,
    margin: 20,
    minWidth: 100,
    borderRadius: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: appFonts.WorkSans_600SemiBold,
  },
  subtitleText: {
    textAlign: "center",
    fontFamily: appFonts.WorkSans_500Medium,
  },
});
