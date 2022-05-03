import { Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux'
import Card from '../components/Card'
import Space from '../components/Space'
import axios from 'axios'
import { MainContext } from '../context/MainContext'

const colorHeader = ['#f3a337', '#eb8937']

const Tepung = () => {
  const [data, setData] = useState([])
  const { backend_url } = useContext(MainContext)
  const [backendURL] = backend_url
  const [isEmpty, setIsEmpty] = useState(false)

  const getData = () => {
    axios.get(`${backendURL}/api/v1/product_category/?search=tepung`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.product.length > 0) {
            setData(res.data.data.product);
          } else {
            setIsEmpty(true)
          }
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
        <Text style={{ fontSize: 16, marginTop: 5, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold" }}>Kategori Tepung</Text>
      </LinearGradient>
      <ScrollView style={{ paddingTop: 10 }} showsVerticalScrollIndicator={false}>
        <Card data={data} empty={isEmpty} />
        <Space />
      </ScrollView>
    </>
  )
}

export default Tepung