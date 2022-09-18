import {SafeAreaView, SectionList, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '../../components/Components';
import {HomeBottomTabScreenProps} from "../../navigation/ScreenTypes";
import layoutParams from "../../utils/LayoutParams";
import CircularImage from "../../components/CircularImage";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";

export default function Profile({navigation}: HomeBottomTabScreenProps<'Profile'>) {
  const [state, setState] = React.useState({
    selectedSectionList: 0
  });

  function topScreen() {
    return (<View style={{
      alignItems: 'center'
    }}>
      {CircularImage({
        source: {uri: 'https://randomuser.me/api/portraits/men/36.jpg'},
        size: layoutParams.WINDOW.height * .1,
        rounded: true
      })}
      <View style={{
        flexDirection: "column"
      }}>
        <Text adjustsFontSizeToFit
              style={[styles.profileText, {
                fontSize: 25, fontFamily: "Roboto_500Medium", color: layoutParams.colors.lighGrey,
              }]}>Sebastian</Text>
        <Text style={styles.profileText}>abc@gmail.com</Text>
      </View>
    </View>);
  }

  function scrollSectionList() {
    const sectionData = [{
      title: "Content", data: ["Favourite Cars", "New Cars"]
    }, {
      title: "Preferences", data: ["Language", "Notifications"]
    }, {
      title: "App Features", data: ["Terms", "FAQ", "About App"]
    }, {
      title: "User Settings",
      data: ["Change Password", "Dark Theme", "Update App", "Privacy", "Close Account", "Logout"]
    },];
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
                           return (<TouchableOpacity style={styles.item}
                                                     onPress={() => {
                                                     }}>
                             <FontAwesome name={iconName} size={20}
                                          color={color}/>
                             <Text style={{
                               fontFamily: "normal",
                               fontSize: 18,
                               marginLeft: 10,
                               color: item.match("Close Account") || item.match("Logout") ? layoutParams.colors.red : layoutParams.colors.black
                             }}>{item}</Text>
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

  return (<SafeAreaView style={styles.container}>
    {/*TopImage Screen*/}
    {topScreen()}
    <View style={{
      flex: 1,
      flexGrow: 1,
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: layoutParams.colors.white,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10, ...layoutParams.elevation
    }}>
      {scrollSectionList()}
    </View>

  </SafeAreaView>);
}
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: layoutParams.colors.backgroundColor
  }, title: {
    fontSize: 20, fontWeight: 'bold',
  }, link: {
    marginTop: 15, paddingVertical: 15,
  }, linkText: {
    fontSize: 14, color: '#2e78b7',
  }, circularImage: {
    width: 50, height: 50, borderRadius: 50 / 2, justifyContent: 'center', alignItems: 'center'
  }, profileText: {
    fontSize: 14, fontWeight: "normal", fontFamily: "Roboto_500Medium"
  }, scrollView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: layoutParams.colors.backgroundColor,
    elevation: layoutParams.elevation.elevation,
    marginTop: 20
  }, item: {
    flexDirection: "row",
    backgroundColor: layoutParams.colors.backgroundColor,
    padding: 20,
    marginTop: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10
  }, header: {
    fontFamily: "Poppins_500Medium", fontSize: 20
  }, title1: {
    fontSize: 24
  }
});
