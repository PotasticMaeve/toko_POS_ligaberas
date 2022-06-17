import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import styles from '../stylesheets/Main'
import Ripple from 'react-native-material-ripple';
import { convertToIDR } from "../Helper"

const SliderCard = () => {
    const [contents, setContents] = useState([
        {
            title: "pemasukan",
            color: "#0ead69",
            value: "1250000"
        },
        {
            title: "pengeluaran",
            color: "#e76f51",
            value: "400000"
        },
        {
            title: "keuntungan",
            color: "#219ebc",
            value: "850000"
        },
    ])
    return (
        <View style={styles.purchaseCardWrap}>
            <Swiper
                loop
                autoplay
                autoplayTimeout={8}
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
                {contents.map((el, i) => (
                    <Ripple
                        style={styles.cardPurchase}
                        rippleColor="#fff"
                        key={i}
                    >
                        <View style={[styles.cardPurchaseTitle, { backgroundColor: `${el.color}` }]}>
                            <Text style={{ textTransform: "capitalize", color: "#fff", fontFamily: "Poppins-SemiBold" }}>{el.title}</Text>
                        </View>
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
                            <Text style={{ textTransform: "capitalize", color: `${el.color}`, fontFamily: "Poppins-Bold", fontSize: 16 }}>{convertToIDR(el.value)}</Text>
                        </View>
                    </Ripple>
                ))}
            </Swiper>
        </View>
    )
}

export default SliderCard