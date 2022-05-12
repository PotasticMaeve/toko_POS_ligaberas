import { Text, ScrollView, View, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux'
import Card from "../components/Card"
import Space from '../components/Space'
import axios from 'axios'
import { MainContext } from '../context/MainContext'
import ShimmerCard from "../components/ShimmerCard"
import LottieView from "lottie-react-native"

const colorHeader = ['#f3a337', '#eb8937']
const { height } = Dimensions.get("screen")

const Beras = (props) => {
  const [data, setData] = useState([])
  const { backend_url } = useContext(MainContext)
  const [backendURL] = backend_url
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getData = () => {
    setIsLoading(true)
    axios.get(`${backendURL}/api/v1/product_category/?search=${props.path}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.product.length > 0) {
            setData(res.data.data.product);
          } else {
            setIsEmpty(true)
          }
          setIsLoading(false)
        }
      })
      .catch(err => {
        setIsEmpty(true)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginTop: 5, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>kategori {props.text}</Text>
      </LinearGradient>
      <ScrollView style={{ paddingTop: 10 }} showsVerticalScrollIndicator={false}>
        {isEmpty ? (
          <>
            <LottieView
              source={require('../animations/empty-product.json')}
              autoPlay
              loop
              style={{
                marginTop: 70,
                height: height / 2.4,
                flex: 1,
                alignSelf: "center"
              }}
            />
            <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: "-10%" }}>Produk Kosong</Text>
            <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Maaf ya! saat ini produk belum tersedia</Text>
          </>
        ) : (
          isLoading ? (
            <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <ShimmerCard />
                <ShimmerCard />
              </View>
              <View style={{ flexDirection: "row" }}>
                <ShimmerCard />
                <ShimmerCard />
              </View>
            </View>
          ) : (
            <Card data={data} />
          )
        )}
        <Space height={100} />
      </ScrollView>
    </>
  )
}

export default Beras