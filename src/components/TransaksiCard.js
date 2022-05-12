import React, { useState } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from '../stylesheets/Main'
import moment from "moment"
import 'moment/locale/id'
import { convertToIDR } from "../Helper"

const TransaksiCard = (props) => {
    const [ existTransaksi ] = useState(props.exist)

    const displayDate = (tgl) => {
        return moment(tgl).format('LL')
    }

    if (existTransaksi) {
        return (
            <View style={[styles.cardItemWrap, {
                flexDirection: 'column',
                height: "auto",
                borderRadius: 5,
                backgroundColor: '#fff',
                marginHorizontal: 0,
                marginVertical: 5,
            }]}>
                <TouchableHighlight style={{ padding: 10, borderRadius: 5 }}>
                    <View style={{ height: '100%', width: '100%', position: 'relative' }}>
                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                            <Text style={{ fontSize: 14, color: "#27ae60", textTransform: "uppercase", fontFamily: "Poppins-SemiBold" }}>INV-SO00{props.id_so}</Text>
                        </View>
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <Text style={{ fontSize: 13, color: '#333', textTransform: "capitalize", fontFamily: "Poppins-Medium" }}>tanggal : </Text>
                                <Text style={{ fontSize: 13, color: '#0185e5', fontFamily: "Poppins-SemiBold" }}>{displayDate(props.tgl)}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <Text style={{ fontSize: 13, color: '#333', textTransform: "capitalize", fontFamily: "Poppins-Medium" }}>Pelanggan : </Text>
                                <Text style={{ fontSize: 13, color: '#0185e5', fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{props.customer}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <Text style={{ fontSize: 13, color: '#333', textTransform: "capitalize", fontFamily: "Poppins-Medium" }}>Status Pembayaran : </Text>
                                <Text style={{ fontSize: 13, color: '#0185e5', fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{props.lunas ? "lunas" : "belum dibayar"}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <Text style={{ fontSize: 13, color: '#333', textTransform: "capitalize", fontFamily: "Poppins-Medium" }}>Status Pengiriman : </Text>
                                <Text style={{ fontSize: 13, color: '#0185e5', fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{props.kirim ? "selesai" : "belum dikirim"}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <Text style={{ fontSize: 13, color: '#333', textTransform: "capitalize", fontFamily: "Poppins-Medium" }}>jumlah item : </Text>
                                <Text style={{ fontSize: 13, color: '#0185e5', fontFamily: "Poppins-SemiBold" }}>{props.data} item</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <Text style={{ fontSize: 13, color: "#27ae60", textTransform: "capitalize", fontFamily: "Poppins-Medium" }}>total transaksi : </Text>
                                <Text style={{ fontSize: 13, color: "#27ae60", fontFamily: "Poppins-SemiBold" }}>{convertToIDR(props.grandtotal)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    } else {
        return <></>
    }
}

export default TransaksiCard