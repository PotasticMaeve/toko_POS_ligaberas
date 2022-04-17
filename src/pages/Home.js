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

const Home = () => {
  const { backend_url } = useContext(MainContext)
  const [backendURL] = backend_url
  const [data, setData] = useState([])

  const getData = () => {
    axios.get(`${backendURL}/api/v1/product/`)
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        toast("Gagal Memuat Data Produk", "danger")
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