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
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const { data_profil, backend_url } = useContext(MainContext)
  const [profil, setProfil] = data_profil
  const [backendURL] = backend_url
  const [data, setData] = useState([])

  const getData = () => {
    axios.get(`${backendURL}/api/v1/product/`)
      .then((res) => {
        setData(res.data.data);
      })
    AsyncStorage.getItem("tokenAccess").then(data => {
      if (data !== null) {
        let tokenAccess = JSON.parse(data)
        let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
        axios.get(`${backendURL}/api/v1/customer/?username=${profil.username}`, key)
          .then((res) => {
            if (res.data.status !== 204) {
              let customer_id = res.data.data.customer_id

              AsyncStorage.setItem("customerID", JSON.stringify(customer_id)).then(() => (
                console.log("customer id saved")
              ))
            } else {
              console.log("belum login lu");
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              AsyncStorage.getItem("tokenRefresh").then(data => {
                if (data !== null) {
                  let tokenRefresh = JSON.parse(data)
                  axios
                    .post(`${backendURL}/api/v1/token/refresh/`, {
                      refresh: tokenRefresh
                    })
                    .then(res => {
                      tokenAccess = res.data.access
                      AsyncStorage.setItem("tokenAccess", JSON.stringify(tokenAccess))
                    })
                }
              })
            }
          })
      }
    })
  }

  useEffect(async () => {
    const getProducts = await getData()
    getProducts
  }, [])

  return (
    <View style={styles.homeWrap}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Slider />
        <Menu />
        <Label />
        <Card
          data={data}
        />
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  )
}

export default Home