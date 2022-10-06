import {Text, TextInput, View} from "../../../components/Widgets";
import {Keyboard, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
import layoutParams from "../../../utils/LayoutParams";
import layout from "../../../utils/LayoutParams";
import React from "react";
import {communicationData} from "../../../utils/Data";
import FlatListView from "../../../components/FlatListView";
import moment from "moment/moment";
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

interface MessageContext {
    sender: string,
    message: string,
    messageTime: string
}

export default function UserMessage() {
    const [state, setState] = React.useState({
        messagesData: communicationData, messageText: ""
    })
    React.useEffect(() => {

    }, [state.messagesData])

    const sendmessage = () => {
        const todayDate = new Date().toISOString();
        const sendMessage: MessageContext = {
            message: state.messageText, messageTime: todayDate, sender: "me"
        };
        setState(prevState => ({
            ...prevState, messagesData: [...prevState.messagesData, sendMessage], messageText: ""
        }));
        Keyboard.dismiss()
    }

    function replyInput() {
        return (<View style={{
            flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
            <TextInput placeholder="Type something"
                       autoCapitalize="none"
                       blurOnSubmit={true}
                       keyboardType="default"
                       multiline={true}
                       style={{...userMessageStyles.userMessage}}
                       underlineColorAndroid="transparent"
                       onChangeText={(text) => setState({...state, messageText: text})}
                       value={state.messageText}/>
            <TouchableOpacity style={{
                height: 45,
                width: 45,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: "center",
                backgroundColor: layoutParams.colors.deepBlue
            }} onPress={() => sendmessage()} disabled={state.messageText.length <= 0}>
                {state.messageText.length > 0 ? <MaterialIcons name="send" size={24} color={layoutParams.colors.white}
                /> : <MaterialCommunityIcons name="microphone" size={24} color={layoutParams.colors.white}/>}
            </TouchableOpacity>
        </View>);

    }


    function userMessagesFlatList() {
        const renderUserMessages = (item: any, index: number) => {
            return <View style={{
                ...userMessageStyles.messageContent,
                backgroundColor: item.sender === "me" ? layoutParams.colors.listColors : layoutParams.colors.messageColor,
                marginRight: item.sender === "me" ? StatusBar.currentHeight : 0,
                marginLeft: item.sender === "me" ? 0 : StatusBar.currentHeight
            }} key={index}>
                <Text style={{
                    ...userMessageStyles.sender
                }}>{item.sender}</Text>
                <Text allowFontScaling={true} style={{
                    fontSize: 15
                }}>{item.message}</Text>
                <View style={{
                    ...userMessageStyles.momentAndIcon
                }}>
                    <Text style={{
                        ...userMessageStyles.messageTime
                    }}>{moment(item.messageTime).fromNow()}</Text>
                    <Ionicons name="md-checkmark-done" size={20}
                              color={item.sender === "me" ? layoutParams.colors.lighGrey : layoutParams.colors.deepBlue}/>
                </View>
            </View>
        }
        return <FlatListView data={state.messagesData} renderItem={({item, index}) => renderUserMessages(item, index)}
                             extraData={null}
                             keyExtractor={(item: any, index) => item + index}
                             contentContainerStyle={{margin: 5}}
                             showsVerticalScrollIndicator={false}
                             ListFooterComponent={() => <View style={{
                                 marginBottom: 5
                             }}/>} initialScrollIndex={state.messagesData.length - 1}/>
    }

    return <SafeAreaView style={{...userMessageStyles.container}}>
        <><View style={{
            flex: 1
        }}>
            {userMessagesFlatList()}
        </View>
            <View style={{
                marginBottom: 5, padding: 5, borderRadius: 10, backgroundColor: layoutParams.colors.backgroundColor
            }}>{replyInput()}
            </View>
        </>
    </SafeAreaView>
}
const userMessageStyles = StyleSheet.create({
    container: {
        flex: 1, flexGrow: 1, backgroundColor: layoutParams.colors.backgroundColor
    }, messageContent: {
        flexGrow: 1, justifyContent: 'center', borderRadius: 10, padding: 5, marginTop: 10,
    }, sender: {
        fontSize: 15, fontFamily: "Poppins_600SemiBold", textTransform: 'capitalize'
    }, messageTime: {
        color: layoutParams.colors.lighGrey
    }, momentAndIcon: {
        flexDirection: "row", justifyContent: 'flex-end'
    }, userMessage: {
        width: "85%",
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.white,
        fontSize: 20,
        borderRadius: 20,
        padding: 10,
        maxHeight: StatusBar.currentHeight
    }
})
