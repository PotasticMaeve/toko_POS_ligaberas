import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
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
import { setRefreshToken } from '../Helper'
import ShimmerKeranjang from '../components/ShimmerKeranjang'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LottieView from 'lottie-react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']
const { height } = Dimensions.get("screen")

const Keranjang = (props) => {
  const { backend_url } = useContext(MainContext)
  const [backendURL] = backend_url
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [cartId, setCartId] = useState(0)
  const [customerId, setCustomerId] = useState(0)
  const [loadTotal, setLoadTotal] = useState(false)

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
                    }
                  })
              } else {
                setRefreshToken()
              }
            })
            .catch(err => {
              console.log(err);
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
            cart_list.map(el => {
              if (el.product.id === id_produk) {
                let cart_items_id = el.id
                axios.delete(`${backendURL}/api/v1/cart_item/${cart_items_id}/`)
                  .then(res => {
                    toast("Produk Berhasil Dihapus", "danger")
                    getData()
                    getTotal()
                  })
              }
            })
          })
      }
    })
  }

  const checkoutCart = () => {
    Actions.Checkout({responsiveProductCheckout: responsiveProductCheckout, responsiveDeleteKeranjangFromCheckout: props.responsiveDeleteKeranjangFromCheckout})
  }

  const responsiveProductCheckout = () => {
    getData()
    getTotal()
  }

  useEffect(() => {
    getData();
    getTotal()
  }, [])

  return (
    <>
      <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Keranjang</Text>
      </LinearGradient>
      <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <>
            <ShimmerKeranjang />
            <ShimmerKeranjang />
          </>
        ) : (
          data && data.length > 0 ? data.map((el, i) => (
            <KeranjangCard responsiveDeleteKeranjang={props.responsiveDeleteKeranjang} key={i} exist={true} data={el} calculate={calculateTotal} remove={removeItem} />
          )) : (
            <>
              <LottieView
                source={require('../animations/empty-cart.json')}
                autoPlay
                loop
                style={{
                  marginTop: 80,
                  height: height / 2.6,
                  flex: 1,
                }}
              />
              <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: "-3%" }}>Keranjang Kosong</Text>
              <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Ayo segera isi keranjang belanjamu!</Text>
            </>
          )
        )}
        <Space />
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
              backgroundColor: '#eb8937',
              overflow: 'hidden',
              width: "100%",
              justifyContent: "center",
              alignItems: 'center',
            }}
            onPress={() => checkoutCart()}
          >
            <Text style={{ fontFamily: "Poppins-SemiBold", color: "#fff", textTransform: "capitalize", fontSize: 13.5, marginTop: 5 }}>checkout sekarang</Text>
          </Ripple>
        </View>
      )}
    </>
  )
}

export default Keranjang