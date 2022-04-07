import React, { useContext } from 'react'
import { Text, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Space from '../components/Space'
import WishlistCard from '../components/WishlistCard'
import styles from '../stylesheets/Main'
import { MainContext } from "../context/MainContext"

const colorHeader = ['#f3a337', '#eb8937']

const Wishlist = () => {
    const { data_wishlist } = useContext(MainContext)
    const [ wishlist ] = data_wishlist

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Wishlist</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                {wishlist.map((el, i) => (
                    <WishlistCard key={i} exist={true} title={el.title} price={el.price} stock={el.stock} nama={el.nama} />
                )
                )}
                <Space />
            </ScrollView>
        </>
    )
}

export default Wishlist