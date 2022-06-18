import React from 'react'
import { Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import styles from '../stylesheets/Main'
import Ripple from 'react-native-material-ripple';
import { convertToIDR } from "../Helper"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const SliderCard = (props) => {
    return (
        <View style={styles.purchaseCardWrap}>
            <Swiper
                loop
                autoplay
                autoplayTimeout={7}
                paginationStyle={{
                    position: "absolute",
                    bottom: 5,
                    left: 2,
                    justifyContent: "flex-start"
                }}
                dot={
                    <View style={{ width: 8, height: 8, backgroundColor: "#c1c1c1", borderRadius: 100, marginLeft: 10, marginRight: -5 }}>
                    </View>
                }
                activeDot={
                    <View style={{ width: 8, height: 8, backgroundColor: "#e8791c", borderRadius: 100, marginLeft: 10, marginRight: -5 }}>
                    </View>
                }
            >
                <Ripple
                    style={styles.cardPurchase}
                    rippleColor="#fff"
                >
                    <View style={[styles.cardPurchaseTitle, { backgroundColor: "#0ead69" }]}>
                        <Text style={{ textTransform: "capitalize", color: "#fff", fontFamily: "Poppins-SemiBold" }}>pemasukan</Text>
                    </View>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
                        {props.isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: "45%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <Text style={{ textTransform: "capitalize", color: "#0ead69", fontFamily: "Poppins-Bold", fontSize: 16 }}>{props.cashflow && convertToIDR(parseInt(props.cashflow.income))}</Text>
                        )}
                    </View>
                </Ripple>
                <Ripple
                    style={styles.cardPurchase}
                    rippleColor="#fff"
                >
                    <View style={[styles.cardPurchaseTitle, { backgroundColor: "#e76f51" }]}>
                        <Text style={{ textTransform: "capitalize", color: "#fff", fontFamily: "Poppins-SemiBold" }}>pengeluaran</Text>
                    </View>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
                        {props.isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: "45%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <Text style={{ textTransform: "capitalize", color: "#e76f51", fontFamily: "Poppins-Bold", fontSize: 16 }}>{props.cashflow && convertToIDR(parseInt(props.cashflow.expanse))}</Text>
                        )}
                    </View>
                </Ripple>
                <Ripple
                    style={styles.cardPurchase}
                    rippleColor="#fff"
                >
                    <View style={[styles.cardPurchaseTitle, { backgroundColor: "#219ebc" }]}>
                        <Text style={{ textTransform: "capitalize", color: "#fff", fontFamily: "Poppins-SemiBold" }}>keuntungan</Text>
                    </View>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
                        {props.isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: "45%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <Text style={{ textTransform: "capitalize", color: "#219ebc", fontFamily: "Poppins-Bold", fontSize: 16 }}>{props.cashflow && convertToIDR(parseInt(props.cashflow.margin))}</Text>
                        )}
                    </View>
                </Ripple>
            </Swiper>
        </View>
    )
}

export default SliderCard