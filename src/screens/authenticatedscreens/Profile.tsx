import {Animated, SafeAreaView, SectionList, StyleSheet, Switch, TouchableOpacity} from 'react-native';

import {Text, View} from '../../components/Widgets';
import {HomeBottomTabScreenProps} from "../../navigation/ScreenTypes";
import layoutParams from "../../utils/LayoutParams";
import CircularImage from "../../components/CircularImage";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import {sectionData} from "../../utils/Data";
import {sharedStyles} from "../../utils/SharedStyles";

export default function Profile({navigation}: HomeBottomTabScreenProps<'Profile'>) {
  const [state, setState] = React.useState({
    selectedSectionList: 0, isEnabled: false
  });
  const toggleSwitch = () => setState(prevState => ({
    ...prevState, isEnabled: !state.isEnabled
  }));
  const sectionItemOpacity = React.useRef<Animated.Value>(new Animated.Value(0));
  const profileView = React.useRef<Animated.Value>(new Animated.Value(0));
  React.useEffect(() => {
    Animated.parallel([Animated.timing(sectionItemOpacity.current, {
      toValue: 1, duration: 500, delay: 200, useNativeDriver: true,
    }), Animated.timing(profileView.current, {
      toValue: 1, duration: 500, delay: 600, useNativeDriver: true,
    })]).start()
  }, [])
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  function topScreen() {
    return (<Animated.View style={{
      alignItems: 'center', opacity: profileView.current
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
                fontSize: 25, fontFamily: "WorkSans_700Bold", color: layoutParams.colors.lighGrey,
              }]}>Sebastian</Text>
        <Text style={styles.profileText}>abc@gmail.com</Text>
      </View>
    </Animated.View>);
  }

  function scrollSectionList() {
    return (<SectionList sections={sectionData}
                         keyExtractor={(item, index) => item + index}
                         renderItem={({item}) => {
                           let iconName: any = "", color = "";
                           switch (item) {
                             case "Favourite Cars":
                               iconName = "heart";
                               color = layoutParams.colors.deepBlue;
                               break
                             case "New Cars":
                               iconName = "car";
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
                           return (!item.match("Dark Theme") ? <TouchableOpacity style={{...styles.item}}
                                                                                 onPress={() => {
                                                                                 }}>
                             <FontAwesome name={iconName} size={20}
                                          color={color}/>
                             <Text style={{
                               fontFamily: "WorkSans_500Medium",
                               fontSize: 18,
                               marginLeft: 10,
                               color: item.match("Close Account") || item.match("Logout") ? layoutParams.colors.red : layoutParams.colors.black
                             }}>{item}</Text>
                           </TouchableOpacity> : <TouchableOpacity style={{
                             ...styles.item
                           }}
                                                                   onPress={() => {
                                                                   }}>
                             <Switch
                                 trackColor={{false: "#767577", true: "#81b0ff"}}
                                 thumbColor={state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                 ios_backgroundColor="#3e3e3e"
                                 onValueChange={toggleSwitch}
                                 value={state.isEnabled}
                             />
                           </TouchableOpacity>);
                         }}
                         showsVerticalScrollIndicator={false}
                         renderSectionHeader={({section: {title}}) => (<View style={{
                           marginLeft: 20,
                         }}><Text style={styles.header}>{title}</Text></View>)}
                         ListFooterComponentStyle={{
                           marginBottom: 5
                         }}
                         ListFooterComponent={<View style={{paddingBottom: 5}}/>}

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
      elevation: 16,
      opacity: sectionItemOpacity.current
    }}>
      {scrollSectionList()}
    </Animated.View>

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
    fontSize: 14, fontWeight: "normal", fontFamily: "WorkSans_600SemiBold"
  }, scrollView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: layoutParams.colors.backgroundColor,
    elevation: layoutParams.elevation.elevation,
    marginTop: 20
  }, item: {
    flexDirection: "row",
    backgroundColor: layoutParams.colors.white,
    borderRadius: 16,
    alignItems: 'center',
    margin: 2,
    padding: 15,
    elevation: 3,
    shadowColor: 'grey',
    shadowOffset: {width: 1.1, height: 1.1},
    shadowOpacity: 0.22,
    shadowRadius: 8.0,
  }, header: {
    fontFamily: "WorkSans_600SemiBold", fontSize: 20
  }, title1: {
    fontSize: 24
  }
});
