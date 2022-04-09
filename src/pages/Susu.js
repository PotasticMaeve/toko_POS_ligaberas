import { Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux'
import Card from '../components/Card'
import Space from '../components/Space'
import axios from 'axios'

const colorHeader = ['#f3a337', '#eb8937']

const Susu = () => {
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
    <>
      <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginTop: 5, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold"}}>Kategori Susu</Text>
      </LinearGradient>
      <ScrollView style={{ paddingTop: 10 }} showsVerticalScrollIndicator={false}>
        <Card data={data} />
        <Space />
      </ScrollView>
    </>
  )
}

export default Susu