import { View, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Slider from "../components/Slider"
import Menu from "../components/Menu"
import Label from "../components/Label"
import styles from "../stylesheets/Main"
import Card from "../components/Card"
import axios from "axios"

const Home = () => {
  const [ data, setData ] = useState([])

  const getData = () => {
    axios.get("http://192.168.18.48:8000/api/v1/product/")
    .then((res) => {
      setData(res.data.data);
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
        <View style={{ height: 30 }}/>
      </ScrollView>
    </View>
  )
}

export default Home