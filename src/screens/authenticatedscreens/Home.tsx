import React from "react";
import {Animated, Easing, Image, Pressable, SafeAreaView, StyleSheet, TextInput} from "react-native";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Text, View} from "../../components/Widgets";
import {FontAwesome} from "@expo/vector-icons";
import FlatListView from "../../components/FlatListView";
import CircularImage from "../../components/CircularImage";
import {carBrands, PopularCarData} from "../../utils/Data";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {sharedStyles} from "../../utils/SharedStyles";


export default function Home() {
    const [state, setState] = React.useState({
        username: "",
        searchedCar: "",
        brandSelected: 0,
        selectedId: 0,
        loading: false,
        populaCarData: PopularCarData,
        recentViews: [] as any
    });
    const navigation = useNavigation<CombinedNavigationProps>();
    const brandOpacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;
    const popularCarOpacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;

    function getSelectedCar(carYom: string) {
        return state.populaCarData.find(mappedCar => mappedCar.yom === carYom);
    }

    function filterDataByMake(make: string) {
        return state.populaCarData.filter(item => item.make?.match(make))
    }

    const allViewedVehicles = React.useMemo(() => {
        setState(prevState => ({
            ...prevState, recentViews: [...prevState.recentViews, state.populaCarData[state.selectedId]]
        }));
        return state.recentViews;
    }, [state.selectedId]);

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(brandOpacity, {
                toValue: 1, duration: 200, delay: 50, useNativeDriver: true, easing: Easing.linear
            }),
            Animated.timing(popularCarOpacity, {
                toValue: 1,
                duration: state.populaCarData.length,
                delay: 400,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ]).start()
    }, []);

    const PressableView = Animated.createAnimatedComponent(Pressable);

    function loadPopularCars() {
        setState({
            ...state, loading: true,
        });
        //Service to get the data from the server to render
        fetch('https://aboutreact.herokuapp.com/getpost.php?offset=' + 1)
            //Sending the currect offset with get request
            .then((response) => response.json())
            .then((responseJson) => {
                setState(prevState => ({
                    ...prevState,
                    populaCarData: [...prevState.populaCarData, responseJson]
                }))
                setState({
                    ...state
                });
                setState({
                    ...state, loading: false
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }


    function searchInput() {
        return (
            <View style={[sharedStyles.searchInputMainContainer]}>
                <View style={sharedStyles.searchInputContainer}>
                    <TextInput
                        style={[
                            sharedStyles.searchInput,
                            !layoutParams.platform.isAndroid && {paddingVertical: 16},
                        ]}
                        autoCapitalize="none"
                        selectionColor="dodgerblue"
                        placeholderTextColor="#B9BABC"
                        placeholder="Search for a car"
                    />
                    <Icon name="search" size={30} color="#B9BABC"/>
                </View>
            </View>);
    }

    function onPressimage() {
        navigation.navigate("Profile");
    }

    function carBrandFlatList() {
        const renderButton = (index: number, item: any) => (
            <PressableView style={{
                ...brandStyles(state.brandSelected, index).brandButton,
                opacity: brandOpacity
            }} onPress={() => {
                setState({
                    ...state, brandSelected: index
                })
                filterDataByMake(item);
                console.log(filterDataByMake((item)))
            }} key={index}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: "600",
                    fontFamily: "WorkSans_500Medium",
                    color: state.brandSelected === index ? layoutParams.colors.white : layout.colors.black
                }}
                      adjustsFontSizeToFit>{item.charAt(0).toString().toUpperCase() + item.substring(1, item.length)}</Text>
            </PressableView>)
        return (<FlatListView showsHorizontalScrollIndicator={false} data={carBrands} horizontal
                              renderItem={({item, index}: any) => renderButton(index, item)}
                              ListFooterComponentStyle={null}
                              ListFooterComponent={() => <View style={null}/>}
                              keyExtractor={(item: any, index) => item + index}
                              key={'_'}
                              extraData={state.brandSelected} contentContainerStyle={null} numColumns={1}/>);
    }

    function renderCarSpecs(yom: string, mileage: string, model: string, index: number) {
        return (<View style={{
            marginLeft: 5
        }} key={index}>
            {renderCarItem("Model : ", model)}
            {renderCarItem("Y.O.M : ", yom)}
            {renderCarItem("Mileage : ", mileage + " kms")}
        </View>);
    }

    const renderCarItem = (item: string, key: string) => (<View style={{
        flexDirection: "row",
    }}>
        <Text style={{
            fontFamily: "WorkSans_600SemiBold",
            color: layoutParams.colors.lighGrey
        }} adjustsFontSizeToFit>{item}</Text>
        <Text style={{
            fontFamily: "WorkSans_500Medium",
        }}>{key}</Text>
    </View>);

    function renderPopularCars() {
        const renderItem = (objectItem: any, index: number) => {
            return (<PressableView style={{
                ...homeStyles.popularCars,
                backgroundColor: layoutParams.colors.listColors,
                elevation: state.selectedId == index ? layoutParams.elevation.elevation : 0,
                opacity: popularCarOpacity
            }}
                                   onPress={() => {
                                       setState({
                                           ...state, selectedId: index
                                       });
                                       navigation.navigate("CarDetails", {cardetails: getSelectedCar(objectItem.yom)});
                                   }}>
                <Image source={require("../../../assets/images/mainCarImage.jpg")} style={{
                    width: "100%",
                    borderRadius: 10,
                    padding: 10,
                    resizeMode: "contain",
                    height: "40%"
                }}/>
                <View style={{
                    marginLeft: 5,
                    marginRight: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center'
                }}><Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontFamily: "WorkSans_600SemiBold"
                }} adjustsFontSizeToFit>{objectItem?.make}</Text>
                    <Text style={{
                        color: layoutParams.colors.lighGrey,
                        fontFamily: "WorkSans_600SemiBold",
                        fontSize: 18
                    }} adjustsFontSizeToFit>ksh. {objectItem?.price}</Text>
                </View>
                {renderCarSpecs(objectItem?.yom, objectItem?.mileage, objectItem?.model, index)}
                {/*Horizontal line*/}
                <View style={{
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <View style={{
                        margin: 5, borderBottomWidth: StyleSheet.hairlineWidth, width: "85%"
                    }}/>
                </View>
                <View>
                    <Text style={{
                        textAlign: 'center', fontFamily: "WorkSans_600SemiBold",
                    }} adjustsFontSizeToFit>Show more specs</Text>
                </View>
            </PressableView>);
        }
        return <View style={{
            flex: 1.7
        }}>
            <FlatListView showsHorizontalScrollIndicator={false} data={state.populaCarData}
                          renderItem={({item, index}) => renderItem(item, index)}
                          ListFooterComponentStyle={null}
                          horizontal
                          showsVerticalScrollIndicator={false}
                          ListFooterComponent={() => <View style={{marginLeft: 10}}/>}
                          keyExtractor={(item: any, index) => item.make + index}
                          key={'_'} extraData={state.selectedId} contentContainerStyle={{margin: 5}}/>
        </View>;
    }

    const renderRecentlyViewed = () => {
        let viewedCars: any = JSON.parse(JSON.stringify(allViewedVehicles));
        return (
            <>{viewedCars.length > 0 ?
                <View style={{
                    ...homeStyles.homeFooter,
                    padding: 5
                }}>
                    {/*Image at the start*/}
                    <Image source={require("../../../assets/images/mainCarImage.jpg")} style={{
                        justifyContent: "flex-start",
                        height: "100%",
                        width: layoutParams.WINDOW.width * .4,
                        borderRadius: 10,
                        resizeMode: "contain",
                    }}/>
                    <View style={{
                        flex: 1,
                        marginLeft: 5
                    }}><Text style={{
                        fontSize: 20,
                        marginTop: 5,
                        fontFamily: 'WorkSans_600SemiBold'
                    }}>{viewedCars[viewedCars.length - 1].make}</Text>
                        {renderCarItem("Model : ", viewedCars[viewedCars.length - 1].model)}
                        {renderCarItem("Price : ", "ksh. " + viewedCars[viewedCars.length - 1].price)}
                        {renderCarItem("Year Of Manufacturing : ", viewedCars[viewedCars.length - 1].yom)}
                        {renderCarItem("Mileage : ", viewedCars[viewedCars.length - 1].mileage + " kms")}
                    </View>
                </View> : <View style={{
                    ...homeStyles.homeFooter,
                    justifyContent: "center",
                    alignItems: "center"
                }}><Text style={{
                    fontFamily: "WorkSans_600SemiBold"
                }}>No Recently view cars</Text></View>}
            </>)
    };

    return (<SafeAreaView style={{
        ...sharedStyles.container
    }}>
        <View style={sharedStyles.container}>
            {/*top view with avatar*/}
            <View style={{
                flexDirection: "row", justifyContent: "space-between", margin: 5
            }}>
                <View style={{flex: 1}}>
                    <Text style={homeStyles.headerTextNormal}>Let's find the</Text>
                    <Text style={homeStyles.headerTextBold}>Ideal car for you</Text>
                </View>

                <View style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: 'center'
                }}>
                    <FontAwesome name="bell" size={30} color={layoutParams.colors.deepBlue}
                                 style={{marginRight: 20}}/>
                    {CircularImage({
                        source: {uri: 'https://randomuser.me/api/portraits/men/36.jpg'},
                        size: layoutParams.WINDOW.height * .07,
                        rounded: true,
                        onPress: onPressimage
                    })}
                </View>
            </View>
            {searchInput()}
            <View style={{
                margin: 5
            }}>
                <Text style={{
                    fontSize: 22, fontWeight: "normal", fontFamily: "WorkSans_600SemiBold", margin: 8
                }}>Choose a brand</Text>
                {/*brandsFlatList*/}
                {carBrandFlatList()}
                <View style={{
                    justifyContent: "space-between", flexDirection: "row", alignItems: 'center', margin: 5
                }}>
                    <Text style={{
                        fontSize: 22, fontFamily: "WorkSans_600SemiBold"
                    }}>Popular Cars</Text>
                        <Text style={{
                            color: layoutParams.colors.deepBlue,
                            fontFamily: "WorkSans_600SemiBold",
                            textDecorationLine: "underline"
                        }}>View All</Text>
                </View>
            </View>
            {/*All Car Brands*/}
            {renderPopularCars()}
            <View style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "WorkSans_600SemiBold"
                }}>
                    Recently Added
                </Text>
                <Text style={{
                    ...homeStyles.footerText, color: layoutParams.colors.deepBlue,
                    textDecorationLine: "underline",
                    fontFamily: "WorkSans_600SemiBold"
                }}>
                    View All
                </Text>
            </View>
            {renderRecentlyViewed()}

        </View>
    </SafeAreaView>);

}
const homeStyles = StyleSheet.create({
    textInput: {
        width: layout.WINDOW.width * .95,
        borderColor: layoutParams.colors.backgroundColor,
        height: layout.WINDOW.height * .05,
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.white,
        fontSize: 20,
        borderRadius: 10,
        padding: 10,
        elevation: layout.elevation.elevation,
    }, circularImage: {
        width: 50, height: 50, borderRadius: 50 / 2
    }, popularCars: {
        margin: 3,
        borderRadius: 10,
        marginBottom: 30,
        padding: 5,
        minWidth: layoutParams.WINDOW.width * .5
    },
    footerText: {
        fontFamily: "WorkSans_600SemiBold", textAlign: 'center'
    },
    carDetailsText: {
        fontSize: 15,
        // fontWeight:"bold",
        fontFamily: "Roboto_500Medium"
    },
    headerTextNormal: {
        color: 'grey',
        fontFamily: 'WorkSans_600SemiBold',
        letterSpacing: 0.2,
        fontSize: 15
    },
    headerTextBold: {
        fontSize: 25,
        fontFamily: 'WorkSans_600SemiBold'
    },
    homeFooter: {
        flex: 0.7,
        margin: 5,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: layoutParams.colors.searchInput,
        ...layoutParams.elevation
    }
});
const brandStyles = (brandSelected: number, index: number) => StyleSheet.create({
    brandButton: {
        alignItems: 'center',
        justifyContent: "center",
        minWidth: layoutParams.WINDOW.width * .2,
        padding: brandSelected == index ? 10 : 6,
        backgroundColor: brandSelected == index ? layout.colors.deepBlue : layout.colors.white,
        borderColor: brandSelected == index ? layout.colors.deepBlue : layout.colors.deepBlue,
        borderWidth: 0.05,
        margin: 3,
        borderRadius: 24,
        ...layoutParams.elevation
    }
});
