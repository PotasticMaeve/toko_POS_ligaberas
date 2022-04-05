import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import KeranjangCard from '../components/KeranjangCard'
import Space from '../components/Space'
import { convertToIDR } from '../Helper'

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

const Keranjang = () => {
  return (
    <>
      <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.textBold, { fontSize: 17, color: "#fff" }]}>Keranjang</Text>
      </LinearGradient>
      <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
        {dataDummy.map((el, i) => (
          <KeranjangCard key={i} exist={true} title={el.title} price={el.price} stock={el.stock} nama={el.nama} />
        )
        )}
        <View style={{height: 50 }} />
      </ScrollView>
      <View style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-around',
        backgroundColor: "#fff"
      }}>
        <Text style={[styles.textBold, {fontSize: 15, color: "#27ae60"}]}>Total Belanja</Text>
        <Text style={[styles.textBold, {fontSize: 15, color: "#27ae60"}]}>{convertToIDR(150000)}</Text>
      </View>
    </>
  )
}

export default Keranjang