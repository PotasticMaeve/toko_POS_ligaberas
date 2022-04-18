import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { View, Text, TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import Ripple from 'react-native-material-ripple'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { MainContext } from '../context/MainContext'
import { convertToIDR, toast } from '../Helper'
import styles from '../stylesheets/Main'

const WishlistCard = (props) => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)

    const addToCart = () => {
        setIsLoading(true)
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerID").then(value => {
                    if (value !== null) {
                        let customer_id = JSON.parse(value)
                        axios.get(`${backendURL}/api/v1/cart/?customer_id=${customer_id}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    let cart_id = res.data.data.id
                                    axios.post(`${backendURL}/api/v1/cart_item/`, {
                                        cart: cart_id,
                                        product: props.id,
                                        qty: 1
                                    })
                                        .then(res => {
                                            props.responsiveAddKeranjang && props.responsiveAddKeranjang()
                                            setIsLoading(false)
                                            toast("Keranjang Berhasil Ditambahkan", "success")
                                        })
                                        .catch((err) => {
                                            setIsLoading(false)
                                            toast("Keranjang Gagal Ditambahkan", "danger")
                                        })
                                } else {
                                    setRefreshToken()
                                }
                            })
                    }
                })
            } else {
                console.log("no access [detailcard]");
            }
        })
    }

    const deleleWishlist = (id) => {
        props.removeItem(id)
        props.responsiveDeleteWishlist(id)
    }

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
                                source={{ uri: props.photo }}
                                style={{ height: 80, width: "auto" }}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, justifyContent: 'space-around' }}>
                            <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{props.nama}</Text>
                            <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{props.harga && convertToIDR(props.harga)}</Text>
                            <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#f5576c' }}>Stok {props.qty}</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: "space-around" }}>
                        <Ripple
                            rippleColor="#FC573B"
                            style={{ height: 40, borderRadius: 8, borderWidth: 1, borderColor: 'red', overflow: 'hidden', justifyContent: "center", alignItems: "center" }}
                            onPress={() => deleleWishlist(props.id)}
                        >
                            <View style={{ padding: 8, margin: 10 }}>
                                <FontAwesome5 name={"trash"} size={16} color="red" />
                            </View>
                        </Ripple>
                        <Ripple
                            rippleColor="#27ae60" style={{ height: 40, borderRadius: 10, borderWidth: 1, borderColor: '#27ae60', overflow: 'hidden', marginLeft: 10, width: "80%", justifyContent: "center", alignItems: 'center' }}
                            onPress={() => addToCart()}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#27ae60" />
                            ):(
                                <Text style={{ color: '#27ae60', fontFamily: "Poppins-SemiBold", marginTop: 5, fontSize: 13 }}>Tambah ke Keranjang</Text>
                            )}
                        </Ripple>
                    </View>
                </>
            </TouchableHighlight>
        </View>
    )
}

export default WishlistCard