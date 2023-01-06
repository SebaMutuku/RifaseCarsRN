import { appFonts } from "./AllConstant";
import layoutParams from "./LayoutParams";
import layout from "./LayoutParams";
import { StatusBar, StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: layoutParams.colors.backgroundColor,
  },
  searchInputMainContainer: {
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  searchInputContainer: {
    padding: 10,
    flexDirection: "row",
    borderRadius: 13,
    borderWidth: 0.5,
    borderColor: layoutParams.colors.grey,
  },
  searchInput: {
    flex: 1,
    color: layoutParams.colors.black,
  },
  appTitle: {
    fontFamily: appFonts.WorkSans_600SemiBold,
    fontSize: StatusBar.currentHeight,
    textAlign: "center",
  },
  containerHeaderStyle: {
    margin: 5,
    fontSize: 25,
    color: layoutParams.colors.black,
    fontFamily: appFonts.WorkSans_600SemiBold,
  },
  actionTextStyle: {
    color: layoutParams.colors.lighGrey,
    fontFamily: appFonts.WorkSans_500Medium,
    fontSize: 15,
    textAlign: "center",
  },
});
export const buttonStyle = (validatedInput: boolean) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      padding: 15,
      backgroundColor: validatedInput
        ? layout.colors.primaryColor
        : layout.colors.primaryColor,
      borderWidth: 0.5,
      borderColor: layoutParams.colors.grey,
      margin: 10,
      borderRadius: 10,
    },
  });
