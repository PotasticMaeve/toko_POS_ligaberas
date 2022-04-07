import React, { useState } from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { convertToIDR } from '../Helper'
import styles from '../stylesheets/Main'

const WishlistCard = (props) => {
    const [existWishlist, setExistWishlist] = useState(props.exist)

    const getImage = (imgName) => {
        if (imgName === "kecap") {
            return require("../../assets/images/kecap.jpg")
        }
        if (imgName === "gula") {
            return require("../../assets/images/gula.jpg")
        }
        if (imgName === "susu") {
            return require("../../assets/images/susu.jpeg")
        }
    }

    if (existWishlist) {
        return (
            <View style={[styles.cardItemWrap, {
                flexDirection: 'column',
                height: "auto",
                borderRadius: 5,
                backgroundColor: '#fff',
                marginHorizontal: 0,
                marginVertical: 5,
            }]}>
                <TouchableHighlight style={{ padding: 10, borderRadius: 5 }}>
                    <>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ height: "100%", width: 100 }} >
                                <Image
                                    source={getImage(props.nama)}
                                    style={{ height: 80, width: "auto" }}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, justifyContent: 'space-around' }}>
                                <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{props.title}</Text>
                                <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{convertToIDR(props.price)}</Text>
                                <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#f5576c' }}>Stok {props.stock}</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: "space-around" }}>
                            <Ripple
                                rippleColor="red"
                                style={{ height: 40, borderRadius: 8, borderWidth: 1, borderColor: 'red', overflow: 'hidden', justifyContent: "center", alignItems: "center" }}
                                onPress={() => setExistWishlist(false)}
                            >
                                <View style={{ padding: 8, margin: 10 }}>
                                    <FontAwesome5 name={"trash"} size={16} color="red" />
                                </View>
                            </Ripple>
                            <Ripple rippleColor="#27ae60" style={{ height: 40, borderRadius: 10, borderWidth: 1, borderColor: '#27ae60', overflow: 'hidden', marginLeft: 10, width: "80%", justifyContent: "center", alignItems: 'center' }}>
                                <Text style={{ color: '#27ae60', fontFamily: "Poppins-SemiBold", marginTop: 5, fontSize: 13 }}>Tambah ke Keranjang</Text>
                            </Ripple>
                        </View>
                    </>
                </TouchableHighlight>
            </View>
        )
    } else {
        return <></>
    }
}

export default WishlistCard