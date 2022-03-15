import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import styles from '../stylesheets/Main'
import CardItem from './CardItem'

const dataList = [
    { key: "1", nama: "tas3", title: "tas selempang dan jinjing tan kekinian", price: 25000, star: 4.8, sale: 90 },
    { key: "2", nama: "sepatu1", title: "Techdoo Sepatu Sneakers Pria Sepatu Olahraga Lari Casual Import MC101", price: 25000, star: 4.9, sale: 20 },
    { key: "3", nama: "lampu1", title: "Lampu Tidur si Pentol Quby Star Moly Soft Head Touch Dimmer Original", price: 355000, star: 4.9, sale: 25 },
    { key: "4", nama: "tepung1", title: "Segitiga Biru Tepung Terigu 1000gr", price: 11500, star: 5, sale: 72 },
    { key: "5", nama: "pan1", title: "Neochef Multipan 2 in 1 Masak Cepat Hemat Minyak Anti Lengket", price: 298000, star: 4.6, sale: 5 },
]

const formatFlatList = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns)
    let totalLastRow = dataList.length - (totalRows * numColumns)
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
        dataList.push({ key: "blank", empty: true })
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
            nama={item.nama}
            img={item.img}
            title={item.title}
            price={item.price}
            star={item.star}
            sale={item.sale}
        />
    )
}

const Card = () => {
    return (
        <SafeAreaView style={styles.cardWrap}>
            <FlatList
                data={formatFlatList(dataList, 2)}
                renderItem={renderCard}
                keyExtractor={(item, i) => i.toString()}
                numColumns={2}
            />
        </SafeAreaView>
    )
}

export default Card