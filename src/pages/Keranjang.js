import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import KeranjangCard from '../components/KeranjangCard'
import { convertToIDR } from '../Helper'
import { MainContext } from "../context/MainContext"

const colorHeader = ['#f3a337', '#eb8937']

const Keranjang = () => {
  const { data_cart } = useContext(MainContext)
  const [ cart, setCart ] = data_cart
  const [ total, setTotal ] = useState(0)

  const calculateTotal = useCallback((id, amount) => {
      let list_cart = cart
      let total = 0
      let qty = 0
      list_cart.map((el) => {
        if(el.id === id){
          qty = amount
        }else{
          qty = el.qty
        }
        total = qty * el.price
        el.qty = qty
        el.total = total
      })
      setCart(list_cart)
      displayTotal()
  })

  const displayTotal = () => {
    let total = 0
    cart.map((el) => {
      total += el.total
    })
    setTotal(total)
  }

  useEffect(() => {
    calculateTotal()
  }, [])


  return (
    <>
      <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.textBold, { fontSize: 17, color: "#fff" }]}>Keranjang</Text>
      </LinearGradient>
      <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
        {cart.length > 0 && cart.map((el, i) => (
          <KeranjangCard key={i} exist={true} data={el} calculate={calculateTotal} />
        )
        )}
        <View style={{ height: 50 }} />
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
        <Text style={[styles.textBold, { fontSize: 15, color: "#27ae60" }]}>Total Belanja</Text>
        <Text style={[styles.textBold, { fontSize: 15, color: "#27ae60" }]}>{convertToIDR(total)}</Text>
      </View>
    </>
  )
}

export default Keranjang