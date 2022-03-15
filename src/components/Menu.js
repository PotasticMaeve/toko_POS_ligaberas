import React from 'react'
import { FlatList, View } from 'react-native'
import MenuItem from './MenuItem'

const dataMenu = [
    { key: "1", imgName: "swimwear", text: "Pakaian", color: "#F2E1AD" },
    { key: "2", imgName: "meal", text: "Bahan Pangan", color: "#EDDCC8" },
    { key: "3", imgName: "iphone", text: "Elektronik", color: "#E8CFC8" },
    { key: "4", imgName: "bag", text: "Tas", color: "#BDE2E4" },
    { key: "5", imgName: "sneakers", text: "Sepatu", color: "#DEE3FC" },
    { key: "6", imgName: "chair", text: "Perabotan", color: "#E0E7D7" },
    { key: "7", imgName: "badminton", text: "Olahraga", color: "#E5EFC9" },
    { key: "8", imgName: "lotion", text: "Kecantikan", color: "#F6D8B6" },
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

const renderMenu = ({ item }) => {
    if (item.empty) {
        return (
            <View>
                <Ripple
                    style={{ backgroundColor: "transparent" }}
                    rippleColor="#fff"
                />
            </View>
        )
    }
    return (
        <MenuItem imgName={item.imgName} text={item.text} color={item.color} />
    )
}

const Menu = () => {
    return (
        <View style={{ flex: 1, width: "100%", paddingHorizontal: 5 }}>
            <FlatList
                data={formatFlatList(dataMenu, 4)}
                renderItem={renderMenu}
                keyExtractor={(item, i) => i.toString()}
                numColumns={4}
            />
        </View>
    )
}

export default Menu