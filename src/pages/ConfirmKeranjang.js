import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import KeranjangCard from '../components/KeranjangCard'
import { convertToIDR, toast } from '../Helper'
import { MainContext } from "../context/MainContext"
import Ripple from 'react-native-material-ripple'
import Space from '../components/Space'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import ShimmerKeranjang from '../components/ShimmerKeranjang'
import { Actions } from 'react-native-router-flux'
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']

const ConfirmKeranjang = (props) => {
    const { backend_url, close_checkout } = useContext(MainContext)
    const [backendURL] = backend_url
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [cartId, setCartId] = useState(0)
    const [customerId, setCustomerId] = useState(0)
    const [loadTotal, setLoadTotal] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [closeCheckout, setCloseCheckout] = close_checkout
    const [idCloseCheckout, setIdCloseCheckout] = useState(0)

    const getData = () => {
        setIsLoading(true)
        AsyncStorage.getItem("tokenAccess").then(data => {
            if (data !== null) {
                let tokenAccess = JSON.parse(data)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerID").then(result => {
                    let customer_id = JSON.parse(result)
                    if (customer_id !== null) {
                        setCustomerId(customer_id)
                        axios.get(`${backendURL}/api/v1/cart/?customer_id=${customer_id}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    let cart_item_data = res.data.data.cart_data
                                    setData(cart_item_data);
                                    setCartId(res.data.data.id)
                                    setIsLoading(false)
                                }
                            })
                    }
                })
            }
        })
    }

    const calculateTotal = useCallback((id, amount) => {
        setLoadTotal(true)
        let id_produk = id
        let qty_produk = amount
        let id_cart = cartId
        let cart_list = data
        let cart_item_id = 0
        if (cart_list.length > 0) {
            cart_list.map(el => {
                if (el.product.id === id_produk) {
                    cart_item_id = el.id
                    axios.patch(`${backendURL}/api/v1/cart_item/${cart_item_id}/`, {
                        cart: id_cart,
                        product: id_produk,
                        qty: qty_produk
                    })
                        .then(res => {
                            if (res.status === 200) {
                                axios.get(`${backendURL}/api/v1/cart/?customer_id=${customerId}`)
                                    .then(res => {
                                        if (res.status === 200) {
                                            setTotal(res.data.data.grandtotal);
                                            setLoadTotal(false)
                                            props.ResponsiveCalculateKeranjang && props.ResponsiveCalculateKeranjang()
                                        }
                                    })
                            }
                        })
                }
            })
        }
    })

    const getTotal = () => {
        setLoadTotal(true)
        AsyncStorage.getItem("customerID").then(value => {
            if (value !== null) {
                let customer_id = JSON.parse(value)
                axios.get(`${backendURL}/api/v1/cart/?customer_id=${customer_id}`)
                    .then(res => {
                        if (res.status === 200) {
                            setTotal(res.data.data.grandtotal);
                            setLoadTotal(false)
                        }
                    })
            }
        })
    }

    const removeItem = (id) => {
        let id_produk = id
        AsyncStorage.getItem("customerID").then(value => {
            if (value !== null) {
                let customer_id = JSON.parse(value)
                axios.get(`${backendURL}/api/v1/cart_item/?customer_id=${customer_id}`)
                    .then(res => {
                        let cart_list = res.data.data
                        if (cart_list.length === 1) {
                            setModalShow(true)
                            setIdCloseCheckout(id_produk)
                        } else {
                            cart_list.map(el => {
                                if (el.product.id === id_produk) {
                                    let cart_items_id = el.id
                                    axios.delete(`${backendURL}/api/v1/cart_item/${cart_items_id}/`)
                                        .then(res => {
                                            toast("Produk Berhasil Dihapus", "danger")
                                            getData()
                                            getTotal()
                                            props.ResponsiveRemoveKeranjang && props.ResponsiveRemoveKeranjang()
                                        })
                                }
                            })
                        }
                    })
            }
        })
    }

    const confirmCloseCheckout = () => {
        AsyncStorage.getItem("customerID").then(value => {
            if (value !== null) {
                let customer_id = JSON.parse(value)
                axios.get(`${backendURL}/api/v1/cart_item/?customer_id=${customer_id}`)
                    .then(res => {
                        let cart_list = res.data.data
                        cart_list.map(el => {
                            if (el.product.id === idCloseCheckout) {
                                let cart_items_id = el.id
                                axios.delete(`${backendURL}/api/v1/cart_item/${cart_items_id}/`)
                                    .then(res => {
                                        setCloseCheckout(true)
                                        toast("Sesi Checkout Berakhir", "danger")
                                        setModalShow(false)
                                    })
                            }
                        })
                    })
            }
        })
    }

    useEffect(() => {
        getData();
        getTotal()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: "#fff", fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Konfirmasi Keranjang</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <>
                        <ShimmerKeranjang />
                        <ShimmerKeranjang />
                    </>
                ) : (
                    data && data.length > 0 && data.map((el, i) => (
                        <KeranjangCard responsiveDeleteKeranjang={props.responsiveDeleteKeranjang} key={i} exist={true} data={el} calculate={calculateTotal} remove={removeItem} />
                    )))}
                <Space />
                {modalShow && (
                    <Modal
                        isVisible={modalShow} style={{ justifyContent: "center", alignItems: "center" }}>
                        <View
                            style={{
                                backgroundColor: "#fafafa",
                                height: 300,
                                width: 300,
                                borderRadius: 10,
                            }}>
                            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
                                <LottieView
                                    source={require('../animations/close-checkout.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        height: 200,
                                        width: 200
                                    }}
                                />
                                <Text style={{ fontSize: 14, fontFamily: "Poppins-Medium", marginTop: "-6%" }}>Yakin ingin menghapus barang?</Text>
                                <Text style={{ fontSize: 13, fontFamily: "Poppins-Medium", color: "#d90429" }}>Aksi ini membuat sesi checkout berakhir</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                position: "absolute",
                                width: "100%",
                                height: 50,
                                bottom: 0
                            }}>
                                <TouchableOpacity
                                    style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#ddd", justifyContent: "center", alignItems: "center" }}
                                    onPress={() => setModalShow(false)}
                                >
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: "Poppins-Medium" }}>Tidak</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#eb8937", justifyContent: "center", alignItems: "center" }}
                                    onPress={() => confirmCloseCheckout()}
                                >
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: "Poppins-Medium" }}>Ya</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
            </ScrollView>
            {data && data.length > 0 && (
                <View style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                    backgroundColor: "#fafafa",
                    paddingHorizontal: 20,
                    shadowColor: '#eaeaea',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 1,
                    elevation: 3,
                }}>
                    <View style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        marginVertical: 8,
                        justifyContent: 'space-between',
                        paddingHorizontal: 10
                    }}>
                        <Text style={{ fontSize: 14, color: "#27ae60", fontFamily: "Poppins-SemiBold" }}>Total Belanja</Text>
                        {loadTotal ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: "30%",
                                    borderRadius: 5,
                                    marginLeft: "5%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <Text style={{ fontSize: 14, color: "#27ae60", fontFamily: "Poppins-SemiBold" }}>{convertToIDR(total)}</Text>
                        )}
                    </View>
                    <Ripple
                        rippleColor="#fff"
                        style={{
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: "#eb8937",
                            overflow: 'hidden',
                            width: "100%",
                            justifyContent: "center",
                            alignItems: 'center',
                        }}
                        onPress={() => Actions.pop()}
                    >
                        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#fff", textTransform: "capitalize", fontSize: 13.5, marginTop: 5 }}>kembali</Text>
                    </Ripple>
                </View>
            )}
        </>
    )
}

export default ConfirmKeranjang