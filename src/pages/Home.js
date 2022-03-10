import { View, ScrollView } from "react-native"
import React from "react"
import Header from "../components/Header"
import Slider from "../components/Slider"
import Menu from "../components/Menu"
import Label from "../components/Label"
import styles from "../stylesheets/Main"

const Home = () => {
  return (
    <View style={styles.homeWrap}>
      <Header />
      <ScrollView>
        <Slider />
        <Menu />
        <Label />
      </ScrollView>
    </View>
  )
}

export default Home