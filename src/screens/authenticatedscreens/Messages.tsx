import React from "react";
import {SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import layoutParams from "../../utils/LayoutParams";
import {SearchBar} from "@rneui/base";
import FlatListView from "../../components/FlatListView";
import {Avatar} from '@rneui/themed';
import {Text, View} from "../../components/Themed";

export default function Messages() {
    const usersD = [{
        name: "Seba", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Vice Chairman'
    }, {
        name: "Sebastian", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Sebastian'
    }, {
        name: "Testing", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Testing'
    }, {
        name: "Ona", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Ona'
    }, {
        name: "Mac", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Mac'
    }, {
        name: "Users", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Users'
    }, {
        name: "Testers 1", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Testers 1'
    }, {
        name: "Laughter", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Laughter'
    }]
    const messagesData = ["Seba", "Sebastian", "Testing", "Logbook", "Mac", "Users", "Testers", "hehe", "username 1", "username 2"]
    const [state, setState] = React.useState({
        searchedMessage: "", usersData: usersD, selectedUser: 0, selectedMessage: 0, messages: messagesData
    });


    function searchInput() {
        return (<SearchBar placeholder="Search" onChangeText={(value) => setState({
            ...state, searchedMessage: value
        })} value={state.searchedMessage} inputStyle={{
            fontSize: 20, fontWeight: "bold", color: layoutParams.colors.black
        }} containerStyle={{
            backgroundColor: layoutParams.colors.backgroundColor
        }} inputContainerStyle={{
            backgroundColor: layoutParams.colors.white, borderWidth: 0, borderRadius: 15
        }} autoCapitalize="none" lightTheme/>);
    }

    function usersFlatList() {
        return <FlatListView data={state.usersData as any} renderItem={({item, index}: any) => {
            return (<View style={{
                flexDirection: "column", justifyContent: "space-evenly", alignItems: 'center'
            }}>
                <Avatar key={index}
                        size={layoutParams.WINDOW.height * .06}
                        rounded
                        source={item.avatar_url ? {uri: item.avatar_url} : {}}
                        overlayContainerStyle={{
                            backgroundColor: layoutParams.colors.disabledTextColor,
                        }}
                        containerStyle={{
                            margin: 5
                        }}/>
                <Text style={{
                    ...messageStyles.text
                }}>{item.name}</Text>
            </View>);
        }} keyExtractor={(item: any, index) => item + index}
                             horizontal={true}
                             key={'_'} extraData={state.selectedUser}
                             contentContainerStyle={{margin: 5}}
                             ListHeaderComponent={() => <View style={{
                                 flexDirection: "column", justifyContent: "space-evenly", alignItems: 'center'
                             }}>
                                 <Avatar
                                     icon={{name: "add", color: "black", type: 'ionicon'}}
                                     containerStyle={{
                                         borderWidth: 1, borderStyle: 'dashed', margin: 5
                                     }}
                                     size={layoutParams.WINDOW.height * .06}
                                     rounded/>
                                 <Text style={{
                                     ...messageStyles.text
                                 }}>New Message</Text>
                             </View>} showsHorizontalScrollIndicator={false}/>
    }

    function messagesFlatList() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        return <FlatListView data={state.messages as any} renderItem={({item, index}) => <TouchableOpacity style={{
            flex: 1,
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 15,
            margin: 1,
            paddingRight: 10,
            backgroundColor: layoutParams.colors.backgroundColor,
        }}>
            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                <Avatar overlayContainerStyle={{
                    backgroundColor: layoutParams.colors.disabledTextColor,
                }}
                        source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
                        size={layoutParams.WINDOW.height * .07}
                        rounded
                        containerStyle={{
                            margin: 2
                        }}/>
                <View style={{flexDirection: "column", marginLeft: 5, justifyContent: "space-evenly"}}>
                    <Text style={{
                        fontSize: 20, fontFamily: "Poppins_600SemiBold"
                    }}>{item as any}</Text>
                    <Text style={{
                        fontSize: 15
                    }}>This is a texting message</Text>
                </View>
            </View>
            <Text style={{
                fontSize: 16, color: layoutParams.colors.lighGrey, fontFamily: "Poppins_700Bold"
            }}>{time}</Text>
        </TouchableOpacity>} keyExtractor={(item: any, index) => item + index}
                             key={'_'} extraData={state.selectedUser}
                             contentContainerStyle={{margin: 5}}
                             showsVerticalScrollIndicator={false}
                             ListFooterComponentStyle={{
                                 marginBottom: 5
                             }}/>
    }

    const addMessage = () => {

    }
    return (<SafeAreaView style={{
        ...messageStyles.container
    }}>
        <View>{searchInput()}
            {usersFlatList()}
        </View>
        <View style={{
            flexGrow: 1,
            flex: 1,
            backgroundColor: layoutParams.colors.white,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10, ...layoutParams.elevation
        }}>{messagesFlatList()}</View>
    </SafeAreaView>)
}
const messageStyles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: layoutParams.colors.backgroundColor
    }, text: {
        fontFamily: "Poppins_500Medium", color: layoutParams.colors.lighGrey
    }
})
