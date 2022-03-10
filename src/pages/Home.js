import { View, ScrollView } from "react-native"
import React from "react"
import Header from "../components/Header"
import Slider from "../components/Slider"

const Home = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <Slider />
      </ScrollView>
    </View>
  )
}

export default Home