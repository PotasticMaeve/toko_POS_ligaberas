import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get("screen")

const DelayTransaksi = () => {
    return (
        <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center", backgroundColor: "#fafafa" }}>
            <LottieView
                source={require('../animations/delay-transaction.json')}
                autoPlay
                loop
                style={{
                    height: 300,
                }}
            />
            <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: "-3%" }}>Harap Menunggu ya!</Text>
            <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Notifikasi pembayaran akan segera kami kirim</Text>
        </View>
    )
}

export default DelayTransaksi