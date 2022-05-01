import { View, ScrollView } from "react-native"
import React, { useEffect, useState, useContext } from "react"
import Header from "../components/Header"
import Slider from "../components/Slider"
import Menu from "../components/Menu"
import Label from "../components/Label"
import styles from "../stylesheets/Main"
import Card from "../components/Card"
import axios from "axios"
import { MainContext } from "../context/MainContext"
import { toast } from "../Helper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setStorage, setRefreshToken } from "../Helper"

const Home = () => {
  const { backend_url, close_checkout, back_to_shop, is_admin } = useContext(MainContext)
  const [backendURL] = backend_url
  const [closeCheckout, setCloseCheckout] = close_checkout
  const [backtoShop, setBacktoShop] = back_to_shop
  const [isAdmin, setIsAdmin] = is_admin
  const [data, setData] = useState([])

  const getData = () => {
    setCloseCheckout(false)
    setBacktoShop(false)
    axios.get(`${backendURL}/api/v1/product/`)
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        toast("Gagal Memuat Data Produk", "danger")
      })

    AsyncStorage.getItem("tokenAccess").then(token => {
      if (token !== null) {
        let tokenAccess = JSON.parse(token)
        let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
        AsyncStorage.getItem("customerUsername").then(result => {
          let username = JSON.parse(result)
          if (username !== null) {
            axios.get(`${backendURL}/api/v1/customer/?username=${username}`, key)
              .then((res) => {
                if (res.status === 200) {
                  let customer_id = res.data.data.customer_id
                  let role_status = res.data.data.is_admin
                  if (!role_status) {
                    setStorage("customerID", customer_id)
                  } else {
                    setIsAdmin(true)
                  }
                }
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  setRefreshToken()
                }
              })
          }
        })
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.homeWrap}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Slider />
        <Menu />
        <Label />
        <Card data={data} />
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  )
}

export default Home