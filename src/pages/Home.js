import { View, ScrollView } from "react-native"
import React from "react"
import Header from "../components/Header"
import Slider from "../components/Slider"
import Menu from "../components/Menu"
import Label from "../components/Label"
import styles from "../stylesheets/Main"
import Card from "../components/Card"

const Home = () => {
  return (
    <View style={styles.homeWrap}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Slider />
        <Menu />
        <Label />
        <Card />
        <View style={{ height: 30 }}/>
      </ScrollView>
    </View>
  )
}

export default Home