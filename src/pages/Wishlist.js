import React, { useContext, useEffect, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Space from '../components/Space'
import WishlistCard from '../components/WishlistCard'
import styles from '../stylesheets/Main'
import { MainContext } from "../context/MainContext"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const colorHeader = ['#f3a337', '#eb8937']

const Wishlist = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])
    const [cartId, setCartId] = useState(0)

    const getData = () => {
        AsyncStorage.getItem("customerID").then(data => {
            if (data !== null) {
                let id = data
                axios.get(`${backendURL}/api/v1/wishlist/?customer_id=${id}`)
                    .then((res) => {
                        let wishlist_data = res.data.data.items
                        setData(wishlist_data);
                    })
                axios.get(`${backendURL}/api/v1/cart/?customer_id=${id}`)
                    .then((res) => {
                        if(res.status === 200){
                            let cart_id = res.data.data.id 
                            setCartId(cart_id)
                        }
                    })
            }
        })
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Wishlist</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                {data.map((el, i) => {
                    let url = backendURL
                    let photo = url + el.photo
                    return (
                        <WishlistCard cartId={cartId} key={i} exist={true} id={el.id} nama={el.nama} harga={el.harga} qty={el.qty} photo={photo} />
                    )
                }
                )}
                <Space />
            </ScrollView>
        </>
    )
}

export default Wishlist