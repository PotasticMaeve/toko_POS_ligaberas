import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import KeranjangCard from '../components/KeranjangCard'
import { convertToIDR } from '../Helper'
import { MainContext } from "../context/MainContext"
import Ripple from 'react-native-material-ripple'
import { Actions } from 'react-native-router-flux'
import Space from '../components/Space'

const colorHeader = ['#f3a337', '#eb8937']

const { height } = Dimensions.get("window")

const Keranjang = () => {
  const { data_cart } = useContext(MainContext)
  const [cart, setCart] = data_cart
  const [total, setTotal] = useState(0)

  const calculateTotal = useCallback((id, amount) => {
    let list_cart = cart
    let total = 0
    let qty = 0
    list_cart.map((el) => {
      if (el.id === id) {
        qty = amount
      } else {
        qty = el.qty
      }
      total = qty * el.price
      el.qty = qty
      el.total = total
    })
    setCart(list_cart)
    displayTotal()
  })

  const removeItem = (id) => {
    let list_cart = cart
    let updatedCart = []
    list_cart.map((el) =>
      el.id !== id && updatedCart.push(el)
    )
    setCart(updatedCart)
  }

  const displayTotal = () => {
    let total = 0
    cart.map((el) => {
      total += el.total
    })
    setTotal(total)
  }

  useEffect(() => {
    calculateTotal()
  }, [cart])


  return (
    <>
      <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.textBold, { fontSize: 17, color: "#fff" }]}>Keranjang</Text>
      </LinearGradient>
      <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
        {cart.length > 0 && cart.map((el, i) => (
          <KeranjangCard key={i} exist={true} data={el} calculate={calculateTotal} remove={removeItem} />
        )
        )}
        <Space />
      </ScrollView>
      <View style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 90,
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
          <Text style={[styles.textBold, { fontSize: 15, color: "#27ae60" }]}>Total Belanja</Text>
          <Text style={[styles.textBold, { fontSize: 15, color: "#27ae60" }]}>{convertToIDR(total)}</Text>
        </View>
        <Ripple
          rippleColor="#fff"
          style={{
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#eb8937",
            overflow: 'hidden',
            width: "100%",
            justifyContent: "center",
            alignItems: 'center',
          }}
          onPress={() => Actions.Checkout()}
        >
          <Text style={[styles.textBold, { color: "#eb8937", textTransform: "capitalize", fontSize: 15 }]}>checkout sekarang</Text>
        </Ripple>
      </View>
    </>
  )
}

export default Keranjang