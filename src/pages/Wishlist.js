import React from 'react'
import { Text, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Space from '../components/Space'
import WishlistCard from '../components/WishlistCard'
import styles from '../stylesheets/Main'

const colorHeader = ['#f3a337', '#eb8937']

const dataDummy = [
    {
        nama: "kecap",
        title: "bango kecap manis refil 550 ml",
        price: 23000,
        stock: 5
    },
    {
        nama: "gula",
        title: "gulaku hijau 1 kg premium",
        price: 15000,
        stock: 8
    },
    {
        nama: "susu",
        title: "susu diamond uht full cream 1 liter / susu UHT diamond",
        price: 15000,
        stock: 4
    },
]

const Wishlist = () => {
    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.textBold, { fontSize: 17, color: "#fff" }]}>Wishlist</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                {dataDummy.map((el, i) => (
                    <WishlistCard key={i} exist={true} title={el.title} price={el.price} stock={el.stock} nama={el.nama} />
                )
                )}
                <Space />
            </ScrollView>
        </>
    )
}

export default Wishlist