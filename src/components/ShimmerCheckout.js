import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Ripple from 'react-native-material-ripple';
import Icon from "react-native-vector-icons/Ionicons"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import Space from '../components/Space';


const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorGradient = ['#f3a337', '#eb8937']
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const Checkout = () => {
    return (
        <>
            <LinearGradient colors={colorGradient} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <View style={{ justifyContent: "center", marginTop: 5 }}>
                    <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold" }}>Checkout</Text>
                </View>
            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff", paddingHorizontal: 15 }}>
                <View style={{ paddingVertical: 10, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: "50%",
                            borderRadius: 5,
                            height: 20
                        }}
                    />
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: 35,
                            borderRadius: 5,
                            height: 35
                        }}
                    />
                </View>
                <View style={{ justifyContent: "flex-start", width: "100%", flexDirection: "row" }}>
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 100,
                        }}
                    />
                    <View style={{ marginLeft: 20, flexDirection: "column", justifyContent: "space-around" }}>
                        <ShimmerPlaceHolder
                            shimmerColors={colorShimmer}
                            style={{
                                width: "60%",
                                borderRadius: 5,
                            }}
                        />
                        <ShimmerPlaceHolder
                            shimmerColors={colorShimmer}
                            style={{
                                marginTop: 7,
                                width: "30%",
                                borderRadius: 5,
                            }}
                        />
                        <View style={{ marginTop: 10 }}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 7,
                                    width: "45%",
                                    borderRadius: 5,
                                }}
                            />
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 7,
                                    width: "90%",
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ paddingTop: 20, paddingBottom: 10, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: "50%",
                            borderRadius: 5,
                            height: 20
                        }}
                    />
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: 35,
                            borderRadius: 5,
                            height: 35
                        }}
                    />
                </View>
                <View style={{ width: "100%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 5, padding: 5 }}>
                        <ShimmerPlaceHolder
                            shimmerColors={colorShimmer}
                            style={{
                                width: 60,
                                borderRadius: 5,
                                height: 60
                            }}
                        />
                        <View style={{ marginLeft: 10, flexDirection: "column" }}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: "60%",
                                    borderRadius: 5,
                                }}
                            />
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 7,
                                    width: "40%",
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                        <View style={{ height: 60, width: 60, justifyContent: "center", alignItems: "center" }} >
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: 30,
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 5, padding: 5 }}>
                        <ShimmerPlaceHolder
                            shimmerColors={colorShimmer}
                            style={{
                                width: 60,
                                borderRadius: 5,
                                height: 60
                            }}
                        />
                        <View style={{ marginLeft: 10, flexDirection: "column" }}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: "60%",
                                    borderRadius: 5,
                                }}
                            />
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 7,
                                    width: "40%",
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                        <View style={{ height: 60, width: 60, justifyContent: "center", alignItems: "center" }} >
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: 30,
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                    </View>
                </View>
                <Space />
                <View style={{ height: 100 }}></View>
            </ScrollView>
            <View style={{ position: "absolute", left: 0, bottom: 0, height: 180, paddingTop: 10, paddingBottom: 10, width: "100%", paddingHorizontal: 15, backgroundColor: "#fafafa" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: "50%",
                            borderRadius: 5,
                        }}
                    />
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: "35%",
                            borderRadius: 5,
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            marginTop: 7,
                            width: "25%",
                            borderRadius: 5,
                        }}
                    />
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            marginTop: 7,
                            width: "35%",
                            borderRadius: 5,
                        }}
                    />
                </View>
                <View style={{ borderTopWidth: 1, borderTopColor: "#ccc", height: 10, width: "100%", marginVertical: 5 }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 7 }}>
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: "35%",
                            borderRadius: 5,
                        }}
                    />
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: "35%",
                            borderRadius: 5,
                        }}
                    />
                </View>
                <ShimmerPlaceHolder
                    shimmerColors={colorShimmer}
                    style={{
                        marginTop: 7,
                        height: 40,
                        width: "100%",
                        borderRadius: 5,
                    }}
                />
            </View>
        </>
    )
}

const s = StyleSheet.create({
    button: {
        height: 50,
        width: 150,
        backgroundColor: "#140078",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: "#8559da",
        shadowOpacity: 0.7,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        elevation: 6,
    },
    text: {
        color: "white",
        fontWeight: "600",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Checkout