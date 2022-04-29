import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import { MainContext } from '../context/MainContext';
import Maintenance from "../components/Maintenance"

const colorHeader = ['#f3a337', '#eb8937']
const Customers = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])

    const getData = () => {
        axios.get(`${backendURL}/api/v1/customer/`)
            .then((res) => {
                setData(res.data.data);
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const renderList = ({ item }) => {
        let nama = item.nama
        let str = nama.split("")
        return(
            <TouchableOpacity style={{ width: "100%", paddingVertical: 10, borderBottomColor: "#ccc", borderBottomWidth: 0.5, paddingHorizontal: 7, flexDirection: "row", alignItems: "center" }}>
                <View style={{ backgroundColor: "#FC573B", borderRadius: 50, width: 40, height: 40, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontFamily: "Poppins-SemiBold", marginTop: 5 }}>{str[0]}</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontFamily: "Poppins-Medium", color: "#6b705c" }}>{item.nama}</Text>
                    <Text style={{ fontFamily: "Poppins-Medium", color: "#6b705c" }}>{item.phone}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Pelanggan</Text>
            </LinearGradient>
            <Maintenance />
            {/* <FlatList
                data={data}
                renderItem={renderList}
                keyExtractor={(item, i) => i.toString()}
                numColumns={1}
            /> */}
        </>
    )
}

export default Customers