import React from 'react'
import { View, Text } from 'react-native'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient';

const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
const Label = () => {
    return (
        <View style={styles.labelRow}>
            <LinearGradient colors={['#f4ab18', '#e2880d']} style={styles.labelWrap}>
                <Text style={[styles.textBold, { color: "#fff", fontSize: 15.5 }]}>Produk Terlaris {bulan[new Date().getMonth()]} {new Date().getUTCFullYear()}</Text>
            </LinearGradient>
        </View>
    )
}

export default Label