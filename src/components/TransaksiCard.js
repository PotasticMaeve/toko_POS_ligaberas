import React, { useContext, useState } from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from '../stylesheets/Main'
import moment from "moment"
import 'moment/locale/id'
import { convertToIDR } from "../Helper"
import { MainContext } from '../context/MainContext'

const TransaksiCard = (props) => {
    const { is_admin } = useContext(MainContext)
    const [ isAdmin ] = is_admin
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
                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 14, color: "#27ae60", textTransform: "uppercase", fontFamily: "Poppins-SemiBold" }}>INV-SO00{props.id_so}</Text>
                            <TouchableOpacity style={{ height: 30, width: 60, borderColor: "#f5576c", borderWidth: 1, justifyContent: "center", alignItems: "center" }} onPress={() => props.print(props.id_so)}>
                                <Text style={{ fontSize: 12, color: "#f5576c", textTransform: "uppercase", fontFamily: "Poppins-SemiBold" }}>cetak</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <Text style={{ fontSize: 13, color: '#333', textTransform: "capitalize", fontFamily: "Poppins-Medium" }}>tanggal : </Text>
                                <Text style={{ fontSize: 13, color: '#0185e5', fontFamily: "Poppins-SemiBold" }}>{displayDate(props.tgl)}</Text>
                            </View>
                            {isAdmin && (
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                    <Text style={{ fontSize: 13, color: '#333', textTransform: "capitalize", fontFamily: "Poppins-Medium" }}>Pelanggan : </Text>
                                    <Text style={{ fontSize: 13, color: '#0185e5', fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{props.customer}</Text>
                                </View>
                            )}
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
                                <Text style={{ fontSize: 13, color: "#27ae60", fontFamily: "Poppins-SemiBold" }}>{convertToIDR(props.grandtotal + 10000)}</Text>
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