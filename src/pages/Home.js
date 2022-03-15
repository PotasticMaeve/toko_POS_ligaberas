import { View, ScrollView } from "react-native"
import React, { useEffect, useContext } from "react"
import { MainContext } from "../context/MainContext"
import Header from "../components/Header"
import Slider from "../components/Slider"
import Menu from "../components/Menu"
import Label from "../components/Label"
import styles from "../stylesheets/Main"
import Card from "../components/Card"
import Space from "../components/Space"

const Home = () => {
  return (
    <View style={styles.homeWrap}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Slider />
        <Menu />
        <Label />
        <Card />
        <Space />
      </ScrollView>
    </View>
  )
}

export default Home