import React from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import styles from '../stylesheets/Main'
import Ripple from 'react-native-material-ripple';

const Slider = () => {
    const images = [
        "https://t3.ftcdn.net/jpg/03/16/37/64/360_F_316376413_nYL2jpLONPQPOsy31DE86n7FPpSxPIi3.jpg",
        "https://thumbs.dreamstime.com/b/sale-banner-template-design-vector-hd-194596192.jpg",
        "https://t4.ftcdn.net/jpg/03/32/95/71/360_F_332957101_NV588R5pQUyusBU22Wvzqqhq3E7pOPwb.jpg"
    ]

    return (
        <View style={styles.bannerWrap}>
            <Swiper
                loop
                autoplay
                dotStyle={{ marginTop: 200 }}
                autoplayTimeout={7}
                paginationStyle={{
                    position: "absolute",
                    bottom: 0,
                    left: 10,
                    justifyContent: "flex-start"
                }}
                dot={
                    <View style={{ width: 8, height: 8, backgroundColor: "#c1c1c1", borderRadius: 100, marginHorizontal: 2 }}>
                    </View>
                }
                activeDot={
                    <View style={{ width: 8, height: 8, backgroundColor: "#e8791c", borderRadius: 100, marginHorizontal: 2 }}>
                    </View>
                }
            >
                {images?.map((item, i) => (
                    <Ripple
                        style={{
                            width: 340,
                            height: 150,
                            marginHorizontal: 10
                        }}
                        rippleColor="#fff"
                        key={i}
                    >
                        <Image
                            source={{ uri: item }}
                            resizeMode="stretch"
                            style={{ width: 340, height: 150, borderRadius: 5 }}
                        />
                    </Ripple>
                ))}
            </Swiper>
        </View>
    )
}

export default Slider