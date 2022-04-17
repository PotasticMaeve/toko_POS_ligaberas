import { View, Text, ScrollView } from 'react-native'
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
import { setStorage, setRefreshToken } from '../Helper'
import ShimmerKeranjang from '../components/ShimmerKeranjang'

const colorHeader = ['#f3a337', '#eb8937']

const Keranjang = () => {
  const { backend_url } = useContext(MainContext)
  const [backendURL] = backend_url
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const [cartItem, setCartItem] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
                  axios.get(`${backendURL}/api/v1/cart_item/?customer_id=${customer_id}`, key)
                    .then((res) => {
                      if (res.status === 200) {
                        let cart_item_data = res.data.data
                        setData(cart_item_data);
                      } else {
                        setRefreshToken()
                      }
                    })
                } else {
                  console.log("no customer ID [cart]");
                }
              })
          } else {
            console.log("no customer username [cart]");
          }
        })
      } else {
        console.log("no access [cart]");
      }
    })
  }

  const calculateTotal = useCallback((id, amount) => {
    let list_cart = data
    let total = 0
    let jumlah = 0
    list_cart.map((el) => {
      if (el.product.id === id) {
        jumlah = amount
      } else {
        jumlah = el.qty
      }
      total = jumlah * el.product.harga
      setTotal(total);
    })
    setCartItem({ ...cartItem, id_product: id, qty: jumlah })
  })

  const removeItem = (id) => {
    // let cart_box = []
    // let id_produk = id
    // AsyncStorage.getItem("customerID").then(value => {
    //   if(value !== null){
    //     let customer_id = JSON.parse(value)
    //     axios.get(`${backendURL}/api/v1/cart_item/?customer_id=${customer_id}`)
    //     .then(res => {
    //       let cart_list = res.data.data
    //       cart_list.map(el => {
    //         if(el.product.id === id_produk){
    //           let cart_items_id = el.id
    //           axios.delete(`${backendURL}/api/v1/cart_item/${cart_items_id}/`)
    //           .then(res => {
    //             toast("Produk Berhasil Dihapus", "danger")
    //           })
    //         }else{
    //           cart_box.push(el)
    //         }
    //       })
    //     })
    //   }
    // })
    // console.log(cart_box);
  }

  const checkoutCart = () => {
    // axios.get(`${backendURL}/api/v1/cart/?customer_id=${customer_id}`)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       let cart_id = res.data.data.id
    //       let updatedQty = {
    //         cart: cart_id,
    //         product: cartItem.id_product,
    //         qty: cartItem.qty
    //       }

    //       let body = JSON.stringify(updatedQty)
    //       axios
    //         .put(`${backendURL}/api/v1/customer/${profil.customer_id}/`, body, {
    //           headers: {
    //             'Content-Type': 'application/json'
    //           }
    //         })
    //         .then((res) => {
    //           let nama = res.data.nama
    //           let gender = res.data.gender
    //           let phone = res.data.phone
    //           let alamat = res.data.alamat

    //           setProfil({ ...profil, nama: nama, gender: gender, phone: phone, alamat: alamat });
    //         })
    //         .catch((err) => {
    //           alert("Gagal Menyimpan Data Profil")
    //         });

    //     } else {
    //       setRefreshToken()
    //     }
    //   })
  }

  useEffect(() => {
    // getData()
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
    calculateTotal()
  }, [])

  return (
    <>
      <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Keranjang</Text>
        <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }} onPress={() => getData()}>Refresh</Text>
      </LinearGradient>
      <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <>
            <ShimmerKeranjang />
            <ShimmerKeranjang />
          </>
        ) : [
          data.length > 0 && data.map((el, i) => (
            <KeranjangCard key={i} exist={true} data={el} calculate={calculateTotal} remove={removeItem} />
          ))
        ]}
        <Space />
      </ScrollView>
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
          <Text style={{ fontSize: 14, color: "#27ae60", fontFamily: "Poppins-SemiBold" }}>{convertToIDR(total)}</Text>
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
    </>
  )
}

export default Keranjang