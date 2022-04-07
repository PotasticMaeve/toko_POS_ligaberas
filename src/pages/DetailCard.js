import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'

const colorHeader = ['#f3a337', '#eb8937']

const DetailCard = () => {
    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", fontFamily: "Poppins-SemiBold", marginTop: 5 }}>DetailCard</Text>
                <TouchableOpacity onPress={() => Actions.Search()}>
                    <FontAwesome5 name={"search"} size={20} color='#fff' />
                </TouchableOpacity>
            </LinearGradient>
        </>
    )
}

export default DetailCard