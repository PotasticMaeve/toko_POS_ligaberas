import React from 'react'
import { FlatList, SafeAreaView, View, Text, Dimensions } from 'react-native'
import styles from '../stylesheets/Main'
import CardItem from './CardItem'
import LottieView from "lottie-react-native"

const { height } = Dimensions.get("screen")

const Card = (props) => {
    const formatFlatList = (data, numColumns) => {
        const dataList = data
        const totalRows = Math.floor(dataList.length / numColumns)
        let totalLastRow = dataList.length - (totalRows * numColumns)
        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ id: "blank", empty: true })
            totalLastRow++
        }
        return dataList
    }

    const renderCard = ({ item }) => {
        if (item.empty) {
            return (
                <View style={[styles.cardBlank, styles.blankCard]} />
            )
        }
        return (
            <CardItem
                id={item.id}
                photo={item.photo}
                nama_barang={item.nama_barang}
                harga={item.harga}
                qty={item.qty}
            />
        )
    }

    return (
        <SafeAreaView style={styles.cardWrap}>
            {props.empty ? (
                <>
                    <LottieView
                        source={require('../animations/empty-product.json')}
                        autoPlay
                        loop
                        style={{
                            marginTop: 70,
                            height: height / 2.4,
                            flex: 1,
                            alignSelf: "center"
                        }}
                    />
                    <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: "-10%" }}>Produk Kosong</Text>
                    <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Maaf ya! saat ini produk belum tersedia</Text>
                </>
            ) : (
                <FlatList
                    data={formatFlatList(props.data, 2)}
                    renderItem={renderCard}
                    keyExtractor={(item, i) => i.toString()}
                    numColumns={2}
                />
            )}
        </SafeAreaView >
    )
}

export default Card