import React from "react";
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import layoutParams from "../../utils/LayoutParams";
import {Button} from "@rneui/base";
import FlatListView from "../../components/FlatListView";
import {Avatar} from '@rneui/themed';
import {Text, View} from "../../components/Widgets";
import {messagesData, usersD} from "../../utils/Data";
import moment from 'moment'
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialIcons";


export default function Messages() {
    const navigation = useNavigation<CombinedNavigationProps>();
    type messageTemplate = {
        from: string,
        messageTime: string,
        lastMessage: string
    }

    const [state, setState] = React.useState({
        searchedMessage: "", usersData: usersD, selectedUser: {}, selectedMessage: 0, messages: messagesData
    });


    function searchInput() {
        return (
            <View style={[messageStyles.searchInputMainContainer,]}>
                <View style={messageStyles.searchInputContainer}>
                    <TextInput
                        style={[
                            messageStyles.searchInput,
                            !layoutParams.platform.isAndroid && {paddingVertical: 16},
                        ]}
                        placeholder="Search" onChangeText={(value) => setState({
                        ...state, searchedMessage: value
                    })} value={state.searchedMessage}
                        autoCapitalize="none"
                        selectionColor="dodgerblue"
                        placeholderTextColor="#B9BABC"
                    />
                    <Icon name="search" size={30} color="#B9BABC"/>
                </View>
            </View>);
    }

    const renderRightActions = () => {
        return (
            <View
                style={{
                    margin: 0,
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: 70,
                }}>
                <Button color="red" onPress={() => {
                }} title="DELETE"></Button>
            </View>
        );
    };

    function usersFlatList() {
        const closeRow = (index: number) => {
            console.log(index)
        };
        const renderUsers = React.useCallback((item: any, index: number) =>
            <Swipeable renderRightActions={() => renderRightActions()}
                       rightThreshold={-100} onSwipeableOpen={() => closeRow(index)}>
                <View style={{
                    flexDirection: "column", justifyContent: "space-evenly", alignItems: 'center'
                }} key={index}>
                    <Avatar
                        size={layoutParams.WINDOW.height * .065}
                        rounded
                        source={item.avatar_url ? {uri: item.avatar_url} : {}}
                        overlayContainerStyle={{
                            backgroundColor: layoutParams.colors.disabledTextColor,
                        }}
                        containerStyle={{
                            borderColor: layoutParams.colors.selectedColor,
                            borderWidth: 2.5,
                            margin: 5
                        }}/>
                    <Text style={{
                        ...messageStyles.text
                    }}>{item.name}</Text>
                </View>
            </Swipeable>, []);
        return <FlatListView data={state.usersData as any} renderItem={({item, index}: any) => renderUsers(item, index)
        } keyExtractor={(item: any, index) => item + index}
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
        return <FlatListView data={state.messages} renderItem={({item, index}: any) => {
            return <TouchableOpacity style={{
                flex: 1,
                flexGrow: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',
                borderRadius: 15,
                margin: 1,
                paddingRight: 10,
                elevation: state.selectedMessage == index ? layoutParams.elevation.elevation : 0,
                backgroundColor: layoutParams.colors.backgroundColor,
            }} key={index} onPress={() => {
                setState({
                    ...state,
                    selectedMessage: index
                });
                viewUserMessage(item);
            }
            }>
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                    <Avatar overlayContainerStyle={{
                        backgroundColor: layoutParams.colors.disabledTextColor,
                    }}
                            source={{uri: item.image}}
                            size={layoutParams.WINDOW.height * .07}
                            rounded
                            containerStyle={{
                                margin: 2
                            }}/>
                    <View style={{flexDirection: "column", marginLeft: 5, justifyContent: "space-evenly"}}>
                        <Text style={{
                            fontFamily: "WorkSans_600SemiBold"
                        }}>{item.from}</Text>
                        <Text style={{
                            fontSize: 15,
                            color: layoutParams.colors.lighGrey
                        }}>{item.lastMessage}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{
                        fontSize: 12, color: layoutParams.colors.lighGrey, fontFamily: "Poppins_400Regular"
                    }}>{moment(item.messageTime).fromNow()}</Text>
                    <Ionicons name="md-checkmark-done" size={20} color={layoutParams.colors.lighGrey}/>
                </View>
            </TouchableOpacity>
        }} keyExtractor={(item: any, index) => item + index}
                             key={'_'} extraData={state.selectedUser}
                             contentContainerStyle={{margin: 5}}
                             showsVerticalScrollIndicator={false}
                             ListFooterComponent={() => <View style={{
                                 marginBottom: 5
                             }}/>}/>
    }

    const viewUserMessage = (user: any) => {
        navigation.navigate("UserMessage", {
            fromUser: user.from,
            fromUserImage: user.image
        });
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
            backgroundColor: layoutParams.colors.backgroundColor,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10, ...layoutParams.elevation
        }}>{messagesFlatList()}</View>
    </SafeAreaView>)
}
const messageStyles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: layoutParams.colors.backgroundColor
    }, text: {
        fontFamily: "WorkSans_500Medium", color: layoutParams.colors.lighGrey
    },
    searchInputMainContainer: {
        margin: 10
    },
    searchInputContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: layoutParams.colors.searchInput,
        borderRadius: 13,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: layoutParams.colors.black,
    },
})
