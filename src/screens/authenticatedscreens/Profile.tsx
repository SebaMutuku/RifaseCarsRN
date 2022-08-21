import {SectionList, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '../../components/Themed';
import {HomeBottomTabScreenProps} from "../../navigation/ScreenTypes";
import {SafeAreaProvider} from "react-native-safe-area-context";
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
      marginLeft: 10, marginRight: 10, flexDirection: "row", justifyContent: "space-between"
    }}>
      {CircularImage({
        source: require('../../../assets/images/human-male.jpg'), style: {...styles.circularImage}, onPress: () => {
        }
      })}
      <View style={{
        flexDirection: "column"
      }}>
        <Text
            style={[styles.profileText, {fontSize: 25, color: layoutParams.colors.disabledTextColor}]}>Sebastian</Text>
        <Text style={styles.profileText}>abc@gmail.com</Text>
        <Text style={styles.profileText}>Close Account</Text>
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
      title: "User Settings", data: ["Change Password", "Dark Theme", "Update App", "Privacy", "Logout"]
    },];
    return (<SectionList sections={sectionData}
                         keyExtractor={(item, index) => item + index}
                         renderItem={({item}) => {
                           let iconName: any = "";
                           switch (item) {
                             case "Favourite Cars":
                               iconName = "heart";
                               break
                             case "New Cars":
                               iconName = "car";
                               break
                             case "Language":
                               iconName = "language";
                               break
                             case "Notifications":
                               iconName = "bell";
                               break
                             case "Terms":
                               iconName = "book";
                               break
                             case "FAQ":
                               iconName = "question-circle";
                               break
                             case "About App":
                               iconName = "book";
                               break
                             case "Change Password":
                               iconName = "pencil";
                               break
                             case "Dark Theme":
                               iconName = "toggle-off";
                               break;
                             case "Update App":
                               iconName = "download";
                               break;
                             case "Privacy":
                               iconName = "user-secret";
                               break;
                             default:
                               iconName = "sign-out"
                           }
                           return (<TouchableOpacity style={styles.item}
                                                     onPress={() => {
                                                     }}>
                               <FontAwesome name={iconName} size={20}
                                            color={layoutParams.colors.deepBlue}/>
                             <Text style={{fontFamily: "normal", fontSize: 18, marginLeft: 10}}>{item}</Text>
                           </TouchableOpacity>)
                         }}
                         renderSectionHeader={({section: {title}}) => (<View style={{
                           marginLeft: 20,
                         }}><Text style={styles.header}>{title}</Text></View>)}
                         ListFooterComponentStyle={{
                           marginBottom: StatusBar.currentHeight
                         }}
                         ListFooterComponent={<View style={{paddingBottom: StatusBar.currentHeight}}/>}

    />);
  }

  return (<SafeAreaProvider style={styles.container}>
    {/*TopImage Screen*/}
    {topScreen()}
    <View style={{
      justifyContent: "center",
    }}>
      {scrollSectionList()}
    </View>

  </SafeAreaProvider>);
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
    width: 70, height: 70, borderRadius: 50 / 2
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
    backgroundColor: layoutParams.colors.white,
    padding: 20,
    marginTop: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10
  }, header: {
    fontSize: 20, color: layoutParams.colors.black, FontFamily: "Poppins_500Medium", fontWeight: "bold"
  }, title1: {
    fontSize: 24
  }
});
