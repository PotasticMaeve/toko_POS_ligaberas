import React, { useContext } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import { MainContext } from '../context/MainContext'
import styles from '../stylesheets/Main'
import CardItem from './CardItem'

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
                photo={item.photo}
                nama_barang={item.nama_barang}
                harga={item.harga}
                qty={item.qty}
            />
        )
    }

    return (
        <SafeAreaView style={styles.cardWrap}>
            <FlatList
                data={formatFlatList(props.data, 2)}
                renderItem={renderCard}
                keyExtractor={(item, i) => i.toString()}
                numColumns={2}
            />
        </SafeAreaView>
    )
}

export default Card