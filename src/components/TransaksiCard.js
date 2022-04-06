import React, { useState } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from '../stylesheets/Main'
import moment from "moment"
import 'moment/locale/id'

const TransaksiCard = (props) => {
    const [ existTransaksi ] = useState(props.exist)

    const displayDate = () => {
        const date = new Date()
        return moment(date).format('LL')
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
                            <Text style={[styles.textBold, { fontSize: 15, color: "#27ae60", textTransform: "uppercase" }]}>INV-asdjdakw27482433</Text>
                        </View>
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
                                <Text style={[styles.textSemiBold, { color: '#333', textTransform: "capitalize" }]}>tanggal : </Text>
                                <Text style={[styles.textBold, { color: '#0185e5' }]}>{displayDate()}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
                                <Text style={[styles.textSemiBold, { color: '#333', textTransform: "capitalize" }]}>jenis item : </Text>
                                <Text style={[styles.textBold, { color: '#0185e5' }]}>2 varian</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
                                <Text style={[styles.textSemiBold, { color: '#333', textTransform: "capitalize" }]}>jumlah item : </Text>
                                <Text style={[styles.textBold, { color: '#0185e5' }]}>3 item</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
                                <Text style={[styles.textSemiBold, { color: "#27ae60", textTransform: "capitalize" }]}>total transaksi : </Text>
                                <Text style={[styles.textBold, { color: "#27ae60" }]}>Rp 150.000</Text>
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