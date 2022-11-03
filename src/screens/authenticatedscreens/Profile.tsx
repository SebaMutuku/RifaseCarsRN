import {Animated, Pressable, SafeAreaView, SectionList, StatusBar, StyleSheet} from 'react-native';

import {Text, useThemeColor, View} from '../../components/Widgets';
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import CircularImage from "../../components/CircularImage";
import React from "react";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {sectionData} from "../../utils/Data";
import {sharedStyles} from "../../utils/SharedStyles";
import {BottomSheetProps} from "../../utils/AppInterfaces";
import CustomModal from "../../modals/CustomModal";
import {AuthContext} from "../../utils/AuthContext";
import toast from "../../utils/toast";
import {useTheme} from "@react-navigation/native";

export default function Profile() {
  const [state, setState] = React.useState({
    selectedSectionList: 0,
    isEnabled: false,
    modalVisble: false,
    modalHeading: "Loading...Please wait",
    modalAcceptString: "yes"
  });
  const {toggleTheme} = React.useContext(AuthContext);
  const backgroundColor = useThemeColor({
    light: "rgba(0,0,0,0.05)", dark: " rgba(255,255,255,0.05)"
  }, 'background');
  const color = useThemeColor({
    light: "rgba(0,0,0,0.8)", dark: "rgba(255,255,255,0.8)"
  }, 'text');
  const theme = useTheme()

  const setModalVisible = React.useCallback((visible: boolean) => {
    setState({...state, modalVisble: visible})
  }, []);
  const sectionItemOpacity = React.useRef<Animated.Value>(new Animated.Value(0));
  const profileView = React.useRef<Animated.Value>(new Animated.Value(0));
  const ref = React.useRef<BottomSheetProps>(null);
  const {signOut} = React.useContext(AuthContext)
  React.useEffect(() => {
    Animated.parallel([Animated.timing(sectionItemOpacity.current, {
      toValue: 1, duration: 500, delay: 200, useNativeDriver: true,
    }), Animated.timing(profileView.current, {
      toValue: 1, duration: 600, delay: 100, useNativeDriver: true,
    })
    ]).start()
  }, [])
  const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

  function topScreen() {
    return (<Animated.View style={{
      alignItems: 'center', transform: [{scale: profileView.current}], backgroundColor
    }}>
      {CircularImage({
        source: {uri: 'https://randomuser.me/api/portraits/men/36.jpg'},
        size: layoutParams.WINDOW.height * .1,
        rounded: true
      })}
      <View style={{
        flexDirection: "column",
      }}>
        <Text adjustsFontSizeToFit
              style={[styles.profileText, {
                fontSize: 22, fontFamily: "WorkSans_600SemiBold", color: layoutParams.colors.textLightColor,
              }]}>Sebastian</Text>
        <Text style={[styles.profileText, {color}]}>abc@gmail.com</Text>
      </View>
    </Animated.View>);
  }

  function logoutChildren() {
    return <View style={{
      marginTop: 10, flexDirection: "row", justifyContent: "space-evenly"
    }}>
      <Pressable onPress={() => setModalVisible(false)} style={{...styles.logout, backgroundColor}}>
        <Text style={{
          ...styles.modalText, fontSize: 16
        }}>No</Text>
      </Pressable>
      <Pressable onPress={() => {
        setModalVisible(true)
        setTimeout(() => {
          signOut()
          toast.success("Successfully logged out")
        }, 1000)
      }} style={{
        ...styles.logout
      }}>
        <Text style={{
          ...styles.modalText, fontSize: 16, color: layoutParams.colors.red
        }}>{state.modalAcceptString}</Text>
      </Pressable>
    </View>

  }


  const onPress = (item: any) => {
    switch (item) {
      case "Logout" : {
        setState({
          ...state, modalVisble: true, modalHeading: "Do you really wish to logout?", modalAcceptString: "Log out"
        })
      }
        break;
      case "Close Account": {
        setState({
          ...state,
          modalVisble: true,
          modalHeading: "Do you really wish to close your account?",
          modalAcceptString: "Close Account"
        })
      }
        break;
      case "Change theme":
        toggleTheme();
        break
      default:
        console.log("Pressed")
        break
    }
  }

  function scrollSectionList() {
    return (<SectionList sections={sectionData}
                         keyExtractor={(item, index) => item + index}
                         renderItem={({item, index, section}) => {
                           let iconName: any = "";
                           switch (item) {
                             case "Favourite Cars":
                               iconName = "heart";
                               break
                             case "App Currency":
                               iconName = "money";
                               // color = layoutParams.colors.black;
                               break
                             case "Language":
                               iconName = "language";
                               // color = layoutParams.colors.black;
                               break
                             case "Notifications":
                               iconName = "bell";
                               // color = layoutParams.colors.black;
                               break
                             case "Terms":
                               iconName = "book";
                               // color = layoutParams.colors.black;
                               break
                             case "FAQ":
                               iconName = "question-circle";
                               // color = layoutParams.colors.black;
                               break
                             case "About App":
                               iconName = "book";
                               // color = layoutParams.colors.black;
                               break
                             case "Change Password":
                               iconName = "pencil";
                               // color = layoutParams.colors.black;
                               break
                             case "Change theme":
                               iconName = "moon-o";
                               // color = layoutParams.colors.black;
                               break;
                             case "Update App":
                               iconName = "cloud-upload";
                               // color = layoutParams.colors.black;
                               break;
                             case "Privacy":
                               iconName = "user-secret";
                               // color = layoutParams.colors.black;
                               break;
                             case "Close Account":
                               iconName = "times-circle";
                               // color = layoutParams.colors.red;
                               break;
                             default:
                               iconName = "sign-out"
                               // color = layoutParams.colors.red;
                           }
                           return (<AnimatedTouchable style={{
                             ...sectionStyle(index, section).item, backgroundColor
                           }} onPress={() => onPress(item)}>
                             <View style={{
                               flexDirection: "row", justifyContent: "flex-start"
                             }}>
                               <FontAwesome name={iconName} size={20}
                                            color={theme.dark ? layoutParams.colors.white : layoutParams.colors.black}/>
                               <Text style={{
                                 fontFamily: "WorkSans_500Medium",
                                 marginLeft: 10,
                                 color: item.match("Close Account") || item.match("Logout") ? layoutParams.colors.red : theme.dark ? layoutParams.colors.white : layoutParams.colors.black
                               }}>{item}</Text>
                             </View>
                             <MaterialIcons name="keyboard-arrow-right" size={20} color={layoutParams.colors.lighGrey}/>
                           </AnimatedTouchable>);
                         }}
                         showsVerticalScrollIndicator={false}
                         renderSectionHeader={({section: {title}}) => (<View style={{
                           margin: 10, padding: 5
                         }}>
                           <Text style={{
                             ...styles.header, color: theme.dark ? layoutParams.colors.white : layoutParams.colors.black
                           }}>{title}</Text></View>)}
                         ListFooterComponentStyle={{
                           marginBottom: layoutParams.WINDOW.height * 0.1
                         }}
                         ListFooterComponent={<View style={{paddingBottom: StatusBar.currentHeight}}/>}
    />);
  }

  return (<SafeAreaView style={{...sharedStyles.container, backgroundColor}}>
    {/*TopImage Screen*/}
    {topScreen()}
    <Animated.View style={{
      marginTop: 20,
      backgroundColor,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      shadowOffset: {width: 1.1, height: 1.1},
      shadowOpacity: 0.2,
      shadowRadius: 10.0, // elevation:  16, // opacity: sectionItemOpacity.current
    }}>
      {scrollSectionList()}
    </Animated.View>

    <CustomModal visible={state.modalVisble} children={logoutChildren()} modalHeading={state.modalHeading}/>

  </SafeAreaView>);
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20, fontFamily: "WorkSans_700Bold"
  }, link: {
    marginTop: 15, paddingVertical: 15,
  }, linkText: {
    fontSize: 14, color: '#2e78b7',
  }, circularImage: {
    width: 50, height: 50, borderRadius: 50 / 2, justifyContent: 'center', alignItems: 'center'
  }, profileText: {
    fontSize: 14, fontFamily: "WorkSans_600SemiBold"
  }, scrollView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: layoutParams.colors.backgroundColor, ...layoutParams.elevation,
    marginTop: 20
  }, header: {
    fontFamily: "WorkSans_600SemiBold", fontSize: 20
  }, title1: {
    fontSize: 24
  }, modalText: {
    textAlign: "center", fontSize: 20, fontFamily: "WorkSans_500Medium"
  },
  logout: {
    alignItems: 'center',
    justifyContent: "center",
    minWidth: layoutParams.WINDOW.width * .2,
    padding: 10,
    backgroundColor: layout.colors.white,
    borderColor: layout.colors.deepBlue,
    margin: 3,
    borderRadius: 24,
  }
});

export const sectionStyle = (index: number, section: any) => StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: layoutParams.colors.white,
    alignItems: 'center',
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    borderTopLeftRadius: index === 0 ? 16 : 0,
    borderTopRightRadius: index === 0 ? 16 : 0,
    borderBottomLeftRadius: index == section.data.length - 1 ? 16 : 0,
    borderBottomRightRadius: index == section.data.length - 1 ? 16 : 0
  },

});

