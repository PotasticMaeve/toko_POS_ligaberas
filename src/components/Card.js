import React from 'react'
import { View, FlatList } from 'react-native'
import styles from '../stylesheets/Main'
import CardItem from "./CardItem"

const dataList = [{key: "1"},{key: "2"},{key: "3"},{key: "4"},{key: "5"}]
const _renderItem = ({ item }) => {
    if(item.empty){
        return(
            <View style={[styles.cardItemWrap, styles.blankCard]} />
        )
    }
    return(
        <CardItem />
    )
}

const formatCard = (dataList) => {
    let numColumns = 2
    const totalRows = Math.floor(dataList.length / numColumns)
    let totalLastRow = dataList.length - (totalRows * numColumns)
    while(totalLastRow !== 0 && totalLastRow !== numColumns){
        dataList.push({key: "blank", empty: true})
        totalLastRow++
    }
    return dataList
} 

const Card = () => {
    return (
        <View style={styles.cardWrap}>
            <FlatList 
                data={formatCard(dataList)}
                renderItem={_renderItem}
                keyExtractor={(item, i) => i.toString()}
                numColumns={2}
            />
        </View>
    )
}

export default Card