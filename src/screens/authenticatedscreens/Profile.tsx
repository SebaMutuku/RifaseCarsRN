import {Animated, SafeAreaView, SectionList, StatusBar, StyleSheet, Switch, TouchableOpacity} from 'react-native';

import {Text, View} from '../../components/Widgets';
import layoutParams from "../../utils/LayoutParams";
import CircularImage from "../../components/CircularImage";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import {sectionData} from "../../utils/Data";
import {sharedStyles} from "../../utils/SharedStyles";
import {BottomSheetProps} from "../../utils/AppInterfaces";
import CustomModal from "../../modals/CustomModal";
import {AuthContext} from "../../utils/AuthContext";

export default function Profile() {
  const [state, setState] = React.useState({
    selectedSectionList: 0, isEnabled: false, modalVisble: false, modalHeading: "", modalAcceptString: ""
  });
  const toggleSwitch = () => setState(prevState => ({
    ...prevState, isEnabled: !state.isEnabled
  }));
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
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  function topScreen() {
    return (<Animated.View style={{
      alignItems: 'center', transform: [{scale: profileView.current}]
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
        <Text style={styles.profileText}>abc@gmail.com</Text>
      </View>
    </Animated.View>);
  }

  function logoutChildren() {
    return <View style={{
      marginTop: 10, flexDirection: "row", justifyContent: "space-evenly"
    }}>
      <Text style={{
        ...styles.modalText, fontSize: 16
      }} onPress={() => setState({
        ...state, modalVisble: false,
      })}>No</Text>
      <Text style={{
        ...styles.modalText, fontSize: 16, color: layoutParams.colors.red
      }} onPress={() => {
        setState({
          ...state, modalVisble: false,
        });
        signOut()
      }}>Log out</Text>
    </View>

  }


  const onPress = (item: any) => {
    switch (item) {
      case "Logout" : {
        setState({
          ...state, modalVisble: true, modalHeading: "Do you really want to logout?", modalAcceptString: "Log out"
        })
      }
        break;
      case "Close Account": {
        setState({
          ...state,
          modalVisble: true,
          modalHeading: "Do you really want to close your account?",
          modalAcceptString: "Close Account"
        })
      }
        break;
      default:
        console.log("Pressed")
        break
    }
  }

  function scrollSectionList() {
    return (<SectionList sections={sectionData}
                         keyExtractor={(item, index) => item + index}
                         renderItem={({item, index, section}) => {
                           let iconName: any = "", color = "";
                           switch (item) {
                             case "Favourite Cars":
                               iconName = "heart";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "App Currency":
                               iconName = "money";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "Language":
                               iconName = "language";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "Notifications":
                               iconName = "bell";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "Terms":
                               iconName = "book";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "FAQ":
                               iconName = "question-circle";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "About App":
                               iconName = "book";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "Change Password":
                               iconName = "pencil";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "Dark Theme":
                               iconName = "toggle-off";
                               color = layoutParams.colors.deepBlue;
                               break;
                             case "Update App":
                               iconName = "cloud-upload";
                               color = layoutParams.colors.deepBlue;
                               break;
                             case "Privacy":
                               iconName = "user-secret";
                               color = layoutParams.colors.deepBlue;
                               break;
                             case "Close Account":
                               iconName = "times-circle";
                               color = layoutParams.colors.red;
                               break;
                             default:
                               iconName = "sign-out"
                               color = layoutParams.colors.red;
                           }
                           return (!item.match("Dark Theme") ? <AnimatedTouchable style={{
                             ...sectionStyle(index, section).item, ...layoutParams.elevation
                           }} onPress={() => onPress(item)}>
                             <FontAwesome name={iconName} size={20}
                                          color={color}/>
                             <Text style={{
                               fontFamily: "WorkSans_500Medium",
                               marginLeft: 10,
                               color: item.match("Close Account") || item.match("Logout") ? layoutParams.colors.red : layoutParams.colors.black
                             }}>{item}</Text>
                           </AnimatedTouchable> : <AnimatedTouchable style={{
                             ...sectionStyle(index, section).item, ...layoutParams.elevation, padding: 0
                           }} onPress={() => onPress(item)}>
                             <Switch
                                 trackColor={{false: "#767577", true: "#81b0ff"}}
                                 thumbColor={state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                 ios_backgroundColor="#3e3e3e"
                                 onValueChange={toggleSwitch}
                                 value={state.isEnabled}
                             />
                             <Text style={{
                               fontFamily: "WorkSans_500Medium", marginLeft: 10,
                             }}> {state.isEnabled ? item : "Light Theme"}</Text>
                           </AnimatedTouchable>);
                         }}
                         showsVerticalScrollIndicator={false}
                         renderSectionHeader={({section: {title}}) => (<View style={{
                           margin: 10, padding: 5
                         }}>
                           <Text style={styles.header}>{title}</Text></View>)}
                         ListFooterComponentStyle={{
                           marginBottom: layoutParams.WINDOW.height * 0.1
                         }}
                         ListFooterComponent={<View style={{paddingBottom: StatusBar.currentHeight}}/>}
    />);
  }

  return (<SafeAreaView style={sharedStyles.container}>
    {/*TopImage Screen*/}
    {topScreen()}
    <Animated.View style={{
      marginTop: 20,
      backgroundColor: layoutParams.colors.white,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      shadowOffset: {width: 1.1, height: 1.1},
      shadowOpacity: 0.2,
      shadowRadius: 10.0,
      elevation: 16, // opacity: sectionItemOpacity.current
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
    textAlign: "center", fontSize: 20, fontFamily: "Poppins_400Regular"
  },
});

export const sectionStyle = (index: number, section: any) => StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: layoutParams.colors.white,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    borderTopLeftRadius: index === 0 ? 16 : 0,
    borderTopRightRadius: index === 0 ? 16 : 0,
    borderBottomLeftRadius: index == section.data.length - 1 ? 16 : 0,
    borderBottomRightRadius: index == section.data.length - 1 ? 16 : 0
  }
});

