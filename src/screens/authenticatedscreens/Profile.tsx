import { Alert, Animated, SafeAreaView, StyleSheet } from "react-native";

import {
  BottomSheetComponent,
  IconComponent,
  ProfileListItemComponent,
  Text,
  useThemeColor,
  View,
} from "../../components/Widgets";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import React from "react";
import { sharedStyles } from "../../utils/SharedStyles";
import { BottomSheetComponentProps } from "../../utils/AppInterfaces";
import ReusableBottomSheet from "../../modals/CustomModal";
import { AuthContext } from "../../utils/AuthContext";
import { useTheme } from "@react-navigation/native";
import { appFonts } from "../../utils/AllConstant";
import { ListItem, Avatar, Button } from "react-native-elements";

export default function Profile() {
  const [state, setState] = React.useState({
    selectedSectionList: 0,
    isEnabled: false,
    modalVisble: false,
    modalHeading: "Loading...Please wait",
    modalAcceptString: "yes",
    updateTheme: false,
    loading: false,
  });
  const { toggleTheme } = React.useContext(AuthContext);
  const backgroundColor = useThemeColor(
    {
      light: "rgba(0,0,0,0.05)",
      dark: " rgba(255,255,255,0.05)",
    },
    "background"
  );
  const color = useThemeColor(
    {
      light: "rgba(0,0,0,0.8)",
      dark: "rgba(255,255,255,0.8)",
    },
    "text"
  );
  const theme = useTheme();

  const setModalVisible = React.useCallback((visible: boolean) => {
    setState({ ...state, modalVisble: visible });
  }, []);
  const sectionItemOpacity = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );
  const profileView = React.useRef<Animated.Value>(new Animated.Value(0));
  const ref = React.useRef<BottomSheetComponentProps>(null);
  const { signOut } = React.useContext(AuthContext);
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(sectionItemOpacity.current, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(profileView.current, {
        toValue: 1,
        duration: 600,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function headerSection() {
    return (
      <Animated.View
        style={{
          transform: [{ scale: profileView.current }],
          backgroundColor: layoutParams.colors.backgroundColor,
        }}
      >
        <ListItem>
          <Avatar
            size="large"
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontSize: 22,
                fontFamily: appFonts.Poppins_600SemiBold,
                color: layoutParams.colors.primaryColor,
              }}
              adjustsFontSizeToFit
            >
              Sebastian Mutuku
            </ListItem.Title>
            <ListItem.Subtitle
              adjustsFontSizeToFit
              style={[
                styles.profileText,
                { color: layoutParams.colors.primaryColor },
              ]}
            >
              abc@gmail.com
            </ListItem.Subtitle>
            <ListItem.Subtitle
              adjustsFontSizeToFit
              style={[
                styles.profileText,
                { color: layoutParams.colors.primaryColor },
              ]}
            >
              Software Developer
            </ListItem.Subtitle>
          </ListItem.Content>
          <IconComponent
            color={layoutParams.colors.lighGrey}
            icon="edit"
            iconType="antdesign"
            size={30}
            onPress={() => Alert.alert("pressed")}
          />
        </ListItem>
      </Animated.View>
    );
  }

  function logoutChildren() {
    return (
      <View
        style={{
          backgroundColor: layoutParams.colors.backgroundColor,

          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <Text
          style={{
            fontFamily: appFonts.WorkSans_500Medium,
            alignSelf: "center",
            // fontSize: 18,
            margin: 10,
          }}
        >
          Do you really wish to {state.modalAcceptString} ?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            title="Yes"
            buttonStyle={[
              styles.button,
              { backgroundColor: layoutParams.colors.red },
            ]}
            titleStyle={styles.titleStyle}
            onPress={() => {
              setModalVisible(true);
              setTimeout(() => {
                signOut();
              }, 500);
              setState({
                ...state,
                loading: false,
              });
            }}
          />
          <Button
            title="No"
            onPress={() => {
              setState({
                ...state,
                loading: false,
              });
              setModalVisible(false);
            }}
            buttonStyle={[
              styles.button,
              { backgroundColor: layoutParams.colors.primaryColor },
            ]}
            titleStyle={styles.titleStyle}
          />
        </View>
      </View>
    );
  }

  const onLogout = () => {
    setTimeout(() => {
      setState({
        ...state,
        modalVisble: true,
        loading: true,
        modalAcceptString: "log out",
      });
    });
    setState({
      ...state,
      loading: false,
    });
  };

  const onCloseAccount = () => {
    setState({
      ...state,
      modalVisble: true,
      modalAcceptString: "close your account",
    });
  };
  const onThemePress = () => {
    toggleTheme();
    setState({
      ...state,
      updateTheme: !state.updateTheme,
    });
    return <BottomSheetComponent children={<View></View>} isVisible={true} />;
  };

  function scrollSectionList() {
    return (
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            ...styles.sectionHeads,
            color: theme.dark
              ? layoutParams.colors.white
              : layoutParams.colors.primaryColor,
            marginTop: 15,
          }}
        >
          Content
        </Text>
        <ProfileListItemComponent
          leftIcon="favorite"
          leftIconType="material"
          chevron={true}
          title="Favorites"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <ProfileListItemComponent
          leftIcon="attach-money"
          leftIconType="material"
          chevron={true}
          title="App Currency"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <Text
          style={{
            ...styles.sectionHeads,
            color: theme.dark
              ? layoutParams.colors.white
              : layoutParams.colors.primaryColor,
          }}
        >
          Preferences
        </Text>
        <ProfileListItemComponent
          leftIcon="language"
          leftIconType="font-awesome"
          chevron={true}
          title="Language"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <ProfileListItemComponent
          leftIcon="bell"
          leftIconType="font-awesome"
          chevron={true}
          title="Notifications"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <Text
          style={{
            ...styles.sectionHeads,
            color: theme.dark
              ? layoutParams.colors.white
              : layoutParams.colors.primaryColor,
          }}
        >
          App Features
        </Text>
        <ProfileListItemComponent
          leftIcon="book"
          leftIconType="font-awesome"
          chevron={true}
          title="Terms"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <ProfileListItemComponent
          leftIcon="questioncircle"
          leftIconType="antdesign"
          chevron={true}
          title="FAQ"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <ProfileListItemComponent
          leftIcon="world"
          leftIconType="fontisto"
          chevron={true}
          title="About app"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <ProfileListItemComponent
          leftIcon="versions"
          leftIconType="octicon"
          chevron={true}
          title="App version"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <Text
          style={{
            ...styles.sectionHeads,
            color: theme.dark
              ? layoutParams.colors.white
              : layoutParams.colors.primaryColor,
          }}
        >
          User Settings
        </Text>
        <ProfileListItemComponent
          leftIcon="edit"
          leftIconType="antdesign"
          chevron={true}
          title="Change password"
          titleAndiconColor="black"
          onPress={() => {}}
        />
        <ProfileListItemComponent
          leftIcon="moon"
          leftIconType="ionicon"
          chevron={false}
          title="Update Theme"
          titleAndiconColor="black"
          value={state.updateTheme}
          onPress={() => onThemePress()}
          rightIcon={true}
        />
        <ProfileListItemComponent
          leftIcon="update"
          leftIconType="material"
          chevron={true}
          title="Update App"
          titleAndiconColor="black"
          onPress={() => {}}
          value={state.updateTheme}
        />
        <ProfileListItemComponent
          leftIcon="privacy-tip"
          leftIconType="material"
          chevron={true}
          title="Privacy"
          titleAndiconColor="black"
          onPress={() => {}}
        />

        <ProfileListItemComponent
          leftIcon="delete"
          leftIconType="antdesign"
          chevron={true}
          title="Close account"
          titleAndiconColor="red"
          onPress={() => onCloseAccount()}
        />
        <ProfileListItemComponent
          leftIcon="logout"
          leftIconType="antdesign"
          chevron={true}
          title="Logout"
          titleAndiconColor="red"
          onPress={() => onLogout()}
        />
        <View style={{ marginBottom: layoutParams.WINDOW.height * 0.15 }} />
      </Animated.ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...sharedStyles.container, backgroundColor }}>
      {/*TopImage Screen*/}
      {headerSection()}
      <Animated.View
        style={{
          marginTop: 20,
          backgroundColor: layoutParams.colors.backgroundColor,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowOffset: { width: 1.1, height: 1.1 },
          shadowOpacity: 0.2,
          shadowRadius: 10.0, // elevation:  16, // opacity: sectionItemOpacity.current
        }}
      >
        {scrollSectionList()}
      </Animated.View>
      <ReusableBottomSheet
        visible={state.modalVisble}
        children={logoutChildren()}
        modalHeading={state.modalHeading}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: appFonts.WorkSans_700Bold,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  circularImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontFamily: appFonts.Poppins_500Medium,
  },
  scrollView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: layoutParams.colors.backgroundColor,
    ...layoutParams.elevation,
    marginTop: 20,
  },
  sectionHeads: {
    fontFamily: appFonts.Poppins_500Medium,
    marginLeft: 15,
    fontSize: 15,
  },
  title1: {
    fontSize: 24,
  },
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: appFonts.WorkSans_500Medium,
  },
  logout: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: layoutParams.WINDOW.width * 0.2,
    padding: 10,
    backgroundColor: layout.colors.white,
    borderColor: layout.colors.deepBlue,
    margin: 3,
    borderRadius: 24,
  },
  titleStyle: {
    fontFamily: appFonts.Poppins_400Regular,
  },
  button: {
    padding: 8,
    margin: 15,
    minWidth: 80,
    borderRadius: 50,
  },
});

export const sectionStyle = (index: number, section: any) =>
  StyleSheet.create({
    item: {
      flexDirection: "row",
      backgroundColor: layoutParams.colors.white,
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: 10,
      marginRight: 10,
      padding: 15,
      borderTopLeftRadius: index === 0 ? 16 : 0,
      borderTopRightRadius: index === 0 ? 16 : 0,
      borderBottomLeftRadius: index == section.data.length - 1 ? 16 : 0,
      borderBottomRightRadius: index == section.data.length - 1 ? 16 : 0,
    },
  });
