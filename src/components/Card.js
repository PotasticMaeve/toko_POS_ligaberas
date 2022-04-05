import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import styles from '../stylesheets/Main'
import CardItem from './CardItem'

const dataList = [
    { key: "1", nama: "kecap", title: "bango kecap manis refil 550 ml", price: 23000, star: 4.8, sale: 90 },
    { key: "2", nama: "gula", title: "gulaku hijau 1 kg pPremium", price: 15000, star: 4.9, sale: 20 },
    { key: "3", nama: "susu", title: "susu diamond uht full cream 1 liter / susu UHT diamond", price: 15000, star: 4.9, sale: 25 },
    { key: "4", nama: "tepung", title: "Tepung Terigu Kunci 1kg repack low protein flour", price: 9000, star: 5, sale: 72 },
    { key: "5", nama: "teh", title: "teh celup sariwangi kantong 25 pcs", price: 8000, star: 4.6, sale: 5 },
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