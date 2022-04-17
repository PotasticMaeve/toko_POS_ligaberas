import React, { useState, useEffect, useContext } from 'react'
import { Text, TouchableOpacity, Image, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Ripple from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from '../stylesheets/Main'
import { convertToIDR, toast } from '../Helper';
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage'

const colorHeader = ['#f3a337', '#eb8937']

const DetailCard = (props) => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState({})
    const [fav, setFav] = useState(false)
    const [cartId, setCartId] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const getData = () => {
        axios.get(`${backendURL}/api/v1/product/${props.id}/`)
            .then((res) => {
                if (res.status == 200) {
                    setData(res.data);
                } else {
                    AsyncStorage.getItem("tokenRefresh").then(data => {
                        if (data !== null) {
                            let tokenRefresh = JSON.parse(data)
                            axios
                                .post(`${backendURL}/api/v1/token/refresh/`, {
                                    refresh: tokenRefresh
                                })
                                .then(res => {
                                    tokenAccess = res.data.access
                                    AsyncStorage.setItem("tokenAccess", JSON.stringify(tokenAccess))
                                    console.log("access baru [detail card]");
                                })
                        }
                    })
                }
            })

        AsyncStorage.getItem("tokenAccess").then(data => {
            if (data !== null) {
                let tokenAccess = JSON.parse(data)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }

                AsyncStorage.getItem("customerID").then(id => {
                    if (id !== null) {
                        axios.get(`${backendURL}/api/v1/wishlist/?customer_id=${id}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    let data_wishlist = res.data.data.items
                                    let products_id = []
                                    if (data_wishlist.length > 0) {
                                        data_wishlist.map(el => {
                                            products_id.push(el.id)
                                        })
                                    }
                                    if (products_id.includes(props.id)) {
                                        setFav(true)
                                    } else {
                                        setFav(false)
                                    }
                                } else {
                                    AsyncStorage.getItem("tokenRefresh").then(data => {
                                        if (data !== null) {
                                            let tokenRefresh = JSON.parse(data)
                                            axios
                                                .post(`${backendURL}/api/v1/token/refresh/`, {
                                                    refresh: tokenRefresh
                                                })
                                                .then(res => {
                                                    tokenAccess = res.data.access
                                                    AsyncStorage.setItem("tokenAccess", JSON.stringify(tokenAccess))
                                                    console.log("access baru [detail card]");
                                                })
                                        }
                                    })
                                }
                            })
                            .catch(err => {
                                console.log("400 nih");
                                console.log(err);
                            })
                    } else {
                        Actions.Auth()
                    }
                })
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const addToWishlist = () => {
        AsyncStorage.getItem("customerID").then(data => {
            if (data !== null) {
                let id = data
                axios.post(`${backendURL}/api/v1/wishlist/`, {
                    customer: id,
                    product: props.id
                }).then((res) => {
                    setFav(true)
                    toast("Wishlist Berhasil Ditambahkan", "info")
                })
            }
        })
    }

    const removeFromWishlist = () => {
        AsyncStorage.getItem("customerID").then(data => {
            if (data !== null) {
                let id = JSON.parse(data)
                axios.get(`${backendURL}/api/v1/wishlist/?customer_id=${id}`)
                .then((res) => {
                    let wishlist_id = res.data.wishlist_id
                    axios.delete(`${backendURL}/api/v1/wishlist/${wishlist_id}/`)
                    .then(res => {
                        setFav(false)
                        toast("Wishlist Berhasil Dihapus", "danger")
                    })
                })
            }
        })
    }

    const addToKeranjang = () => {
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
                                    setCartId(cart_id)
                                    axios.post(`${backendURL}/api/v1/cart_item/`, {
                                        cart: cart_id,
                                        product: props.id,
                                        qty: 1
                                    })
                                    .then(res => {
                                        setIsLoading(false)
                                        toast("Keranjang Berhasil Ditambahkan", "success")
                                    })
                                    .catch((err) => {
                                        console.log(err);
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

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <View style={{ width: "38%", flexDirection: "row" }}>
                    <TouchableOpacity style={{ marginHorizontal: 11 }} onPress={() => Actions.Search()}>
                        <FontAwesome5 name={"search"} size={19} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 11 }} onPress={() => Actions.Wishlist()}>
                        <Icon name={"heart"} size={19} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 11 }} onPress={() => Actions.Keranjang()}>
                        <FontAwesome5 name={"shopping-cart"} size={19} color='#fff' />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
                <Image source={{ uri: data.photo }} resizeMode="stretch" style={{ height: 350, width: "100%" }} />
                <View style={{
                    width: "100%",
                    minHeight: 300,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    top: -10,
                    paddingHorizontal: 15,
                    paddingTop: 10,
                    backgroundColor: "#fafafa",
                }}>
                    <Text style={[{ fontFamily: "Poppins-Medium", fontSize: 15, textTransform: "capitalize" }]}>{data.nama}</Text>
                    <Text style={[{ marginVertical: 10, fontFamily: "Poppins-SemiBold", fontSize: 15, textTransform: "capitalize", color: '#60a3bc' }]}>{data.harga && convertToIDR(data.harga)}</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold", fontSize: 14.5, textTransform: "capitalize", color: '#27ae60' }]}>Deskripsi Produk</Text>
                        <Text style={[{ fontFamily: "Poppins-Medium", fontSize: 13.5, textTransform: "capitalize", color: "#6b705c" }]}>{data.deskripsi}</Text>
                    </View>
                </View>
                <View style={{ height: 100, backgroundColor: "#fafafa", top: -10 }} />
            </ScrollView>
            <View style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 70,
                backgroundColor: "#fafafa",
                paddingHorizontal: 20,
                shadowColor: '#eaeaea',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 1,
                elevation: 3,
            }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                    {fav ? (
                        <Ripple
                            rippleColor="#fff"
                            style={{ height: 40, borderRadius: 8, borderWidth: 1, borderColor: 'red', overflow: 'hidden', justifyContent: "center", alignItems: "center" }}
                            onPress={() => removeFromWishlist()}
                        >
                            <View style={{ padding: 8, margin: 10 }}>
                                <Icon name={"heart"} size={20} color="red" onPress={() => setFav(false)} />
                            </View>
                        </Ripple>
                    ) : (
                        <Ripple
                            rippleColor="#fff"
                            style={{ height: 40, borderRadius: 8, borderWidth: 1, borderColor: 'red', overflow: 'hidden', justifyContent: "center", alignItems: "center" }}
                            onPress={() => addToWishlist()}
                        >
                            <View style={{ padding: 8, margin: 10 }}>
                                <FontAwesome5 name={"heart"} size={20} color="red" onPress={() => setFav(true)} />
                            </View>
                        </Ripple>
                    )}
                    <Ripple
                        onPress={() => addToKeranjang()}
                        rippleColor="#fff"
                        style={{ height: 40, borderRadius: 10, backgroundColor: '#eb8937', overflow: 'hidden', marginLeft: 10, width: "80%", justifyContent: "center", alignItems: 'center' }}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={{ color: '#fff', fontFamily: "Poppins-SemiBold", marginTop: 5, fontSize: 13 }}>Tambah ke Keranjang</Text>
                        )}
                    </Ripple>
                </View>
            </View>
        </>
    )
}

export default DetailCard