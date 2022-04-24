import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import ShimmerTransaksi from './ShimmerTransaksi'
import Space from './Space'
import TransaksiCard from "./TransaksiCard"
import { setRefreshToken } from "../Helper"

const PesananTiba = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const getData = () => {
        setIsLoading(true)
        AsyncStorage.getItem("customerID").then(value => {
            let customer_id = JSON.parse(value)
            if(customer_id !== null){
                axios.get(`http://192.168.18.52:8000/api/v1/sales_order/?customer_id=${customer_id}&status=proses`)
                .then(res => {
                    setData(res.data.data);
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 500);
                })
            }else{
                setRefreshToken()
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
                data.length > 0 && data.map((el, i) => (
                    <TransaksiCard key={i} data={el.cart_item} id_so={el.id_so} grandtotal={el.grandtotal} lunas={el.lunas} tgl={el.cart_item[0].modified_date} exist={true} />
                ))
            )}
            <Space />
        </ScrollView>
    )
}

export default PesananTiba