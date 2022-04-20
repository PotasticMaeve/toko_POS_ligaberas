import React, { useContext, useEffect, useState } from 'react'
import { Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Space from '../components/Space'
import WishlistCard from '../components/WishlistCard'
import styles from '../stylesheets/Main'
import { MainContext } from "../context/MainContext"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setRefreshToken, toast } from '../Helper'
import ShimmerWishlist from '../components/ShimmerWishlist'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux'
import LottieView from 'lottie-react-native';

const colorHeader = ['#f3a337', '#eb8937']
const { height, width } = Dimensions.get("screen")
const Wishlist = (props) => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])
    const [cartId, setCartId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {
        setIsLoading(true)
        AsyncStorage.getItem("tokenAccess").then(data => {
            if (data !== null) {
                let tokenAccess = JSON.parse(data)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerID").then(result => {
                    let customer_id = JSON.parse(result)
                    if (customer_id !== null) {
                        axios.get(`${backendURL}/api/v1/wishlist/?customer_id=${customer_id}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    setData(res.data.data)
                                    setIsLoading(false)
                                } else {
                                    setRefreshToken()
                                }
                            })

                        axios.get(`${backendURL}/api/v1/cart/?customer_id=${customer_id}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    let cart_id = res.data.data.id
                                    setCartId(cart_id)
                                } else {
                                    setRefreshToken()
                                }
                            })
                    } else {
                        setRefreshToken()
                    }
                })
            } else {
                setRefreshToken()
            }
        })
    }

    const removeItem = (id) => {
        let id_produk = id
        AsyncStorage.getItem("customerID").then(value => {
            if (value !== null) {
                let customer_id = JSON.parse(value)
                axios.get(`${backendURL}/api/v1/wishlist/?customer_id=${customer_id}`)
                    .then(res => {
                        let wishlist_data = res.data.data
                        wishlist_data.map(el => {
                            if (el.product.id === id_produk) {
                                let wishlist_id = el.wishlist_id
                                axios.delete(`${backendURL}/api/v1/wishlist/${wishlist_id}/`)
                                    .then(res => {
                                        toast("Produk Berhasil Dihapus", "danger")
                                        getData()
                                    })
                            }
                        })
                    })
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Wishlist</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <>
                        <ShimmerWishlist />
                        <ShimmerWishlist />
                    </>
                ) : (
                    data && data.length > 0 ? data.map((el, i) => {
                        return (
                            <WishlistCard responsiveDeleteWishlist={props.responsiveDeleteWishlist} responsiveAddKeranjang={props.responsiveAddKeranjang} cartId={cartId} key={i} exist={true} id={el.product.id} nama={el.product.nama_barang} harga={el.product.harga} qty={el.product.qty} photo={el.product.photo} removeItem={removeItem} />
                        )
                    }) : (
                        <>
                            <LottieView
                                source={require('../animations/empty-wishlist.json')}
                                autoPlay
                                loop
                                style={{
                                    marginTop: 40,
                                    height: height / 2.1,
                                    flex: 1,
                                }}
                            />
                            <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: "-10%" }}>Wishlist Kosong</Text>
                            <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Ayo tambahkan barang favoritmu!</Text>
                        </>
                    )
                )}
                <Space />
            </ScrollView>
        </>
    )
}

export default Wishlist