import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, Text, Dimensions } from 'react-native'
import ShimmerTransaksi from './ShimmerTransaksi'
import Space from './Space'
import TransaksiCard from "./TransaksiCard"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MainContext } from '../context/MainContext'
import LottieView from 'lottie-react-native';
import * as OpenAnything from "react-native-openanything"
import { toast } from '../Helper'

const { height } = Dimensions.get("screen")

const PesananTiba = (props) => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [admin] = useState(props.isAdmin)

    const getData = () => {
        setIsLoading(true)
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                if (admin) {
                    axios.get(`${backendURL}/api/v1/sales_order/?status=selesai`, key)
                        .then(res => {
                            if (res.status === 200) {
                                if (res.data.data.length > 0) {
                                    setData(res.data.data);
                                } else {
                                    setIsEmpty(true)
                                }
                            }
                            setIsLoading(false)
                        })
                        .catch(err => {
                            setIsEmpty(true)
                        })
                } else {
                    AsyncStorage.getItem("customerID").then(value => {
                        let customer_id = JSON.parse(value)
                        if (customer_id !== null) {
                            axios.get(`${backendURL}/api/v1/sales_order/?customer_id=${customer_id}&status=selesai`, key)
                                .then(res => {
                                    if (res.status === 200) {
                                        if (res.data.data.length > 0) {
                                            setData(res.data.data);
                                        } else {
                                            setIsEmpty(true)
                                        }
                                    }
                                    setIsLoading(false)
                                })
                                .catch(err => {
                                    setIsEmpty(true)
                                })
                        }
                    })
                }
            }
        })
    }

    const print = (id_so) => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                axios.get(`${backendURL}/report/so_detail_download/${id_so}`, key)
                .then(res => {
                    if(res.status === 200){
                        let path = res.data.url
                        OpenAnything.Pdf(path)
                    }
                })
                .catch(err => {
                    toast("Gagal Mencetak Data SO", "danger")
                })
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
            {isLoading ? (
                <ShimmerTransaksi exist={true} />
            ) : (
                isEmpty ? (
                    <>
                        <LottieView
                            source={require('../animations/empty-transaction.json')}
                            autoPlay
                            loop
                            style={{
                                marginTop: 40,
                                height: height / 2.5,
                            }}
                        />
                        <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center" }}>Transaksi Kosong</Text>
                        <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Segala transaksimu akan direkap disini ya!</Text>
                    </>
                ) : (
                    data.map((el, i) => (
                        <TransaksiCard key={i} isAdmin={admin} data={el.cart_item.length} customer={el.customer} id_so={el.id_so} grandtotal={el.grandtotal} lunas={el.lunas} tgl={el.cart_item[0].modified_date} kirim={el.barang_dikirim} exist={true} print={print} />
                    ))
                )
            )}
            <Space height={100} />
        </ScrollView>
    )
}

export default PesananTiba