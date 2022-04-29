import React from 'react'
import LottieView from "lottie-react-native"
import { View, Text, Dimensions } from 'react-native'

const { height } = Dimensions.get("screen")

const Maintenance = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
            <LottieView
                source={require('../animations/maintenance.json')}
                autoPlay
                loop
                style={{
                    height: height / 2.6,
                    alignSelf: "center"
                }}
            />
            <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: -60 }}>Dalam Perbaikan</Text>
            <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center"}}>Sementara halaman tidak bisa diakses</Text>
        </View>
    )
}

export default Maintenance