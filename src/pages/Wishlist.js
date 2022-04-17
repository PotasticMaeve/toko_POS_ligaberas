import React, { useContext, useEffect, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Space from '../components/Space'
import WishlistCard from '../components/WishlistCard'
import styles from '../stylesheets/Main'
import { MainContext } from "../context/MainContext"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setStorage, setRefreshToken } from '../Helper'
import ShimmerWishlist from '../components/ShimmerWishlist'

const colorHeader = ['#f3a337', '#eb8937']

const Wishlist = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])
    const [cartId, setCartId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {
        AsyncStorage.getItem("tokenAccess").then(data => {
            if (data !== null) {
                let tokenAccess = JSON.parse(data)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerUsername").then(result => {
                    let username = JSON.parse(result)
                    if (username !== null) {
                        axios.get(`${backendURL}/api/v1/customer/?username=${username}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    let customer_id = res.data.data.customer_id
                                    setStorage("customerID", customer_id)
                                    axios.get(`${backendURL}/api/v1/wishlist/?customer_id=${customer_id}`, key)
                                        .then((res) => {
                                            if (res.status === 200) {
                                                let wishlist_data = res.data.data.items
                                                setData(wishlist_data);
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
                                    console.log("no customer ID [wishlist]");
                                }
                            })
                    } else {
                        console.log("no customer username [wishlist]");
                    }
                })
            } else {
                console.log("no access [wishlist]");
            }
        })
    }

    useEffect(() => {
        getData()
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Wishlist</Text>
                <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }} onPress={() => getData()}>Refresh</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <>
                        <ShimmerWishlist />
                        <ShimmerWishlist />
                    </>
                ) : [
                    data.map((el, i) => {
                        return (
                            <WishlistCard cartId={cartId} key={i} exist={true} id={el.id} nama={el.nama} harga={el.harga} qty={el.qty} photo={el.photo} />
                        )
                    })
                ]}
                <Space />
            </ScrollView>
        </>
    )
}

export default Wishlist