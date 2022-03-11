import React from 'react'
import { View, FlatList, SafeAreaView } from 'react-native'
import Ripple from 'react-native-material-ripple'
import MenuItem from './MenuItem'

const dataMenu = [
    { key: "1", imgName: "swimwear", text: "Pakaian", color: "#F2E1AD" },
    { key: "2", imgName: "meal", text: "Makanan", color: "#EDDCC8" },
    { key: "3", imgName: "iphone", text: "Gadget", color: "#E8CFC8" },
    { key: "4", imgName: "bag", text: "Tas", color: "#BDE2E4" },
    { key: "5", imgName: "sneakers", text: "Sepatu", color: "#DEE3FC" },
    { key: "6", imgName: "chair", text: "Perabotan", color: "#E0E7D7" },
    { key: "7", imgName: "badminton", text: "Olahraga", color: "#E5EFC9" },
    { key: "8", imgName: "lotion", text: "Kecantikan", color: "#F6D8B6" },
]

const _renderMenu = ({ item }) => {
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

const formatMenu = (dataMenu) => {
    let numColumns = 4
    const totalRows = Math.floor(dataMenu.length / numColumns)
    let totalLastRow = dataMenu.length - (totalRows * numColumns)
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
        dataMenu.push({ key: "blank", empty: true })
        totalLastRow++
    }
    return dataMenu
}

const Menu = () => {
    return (
        <SafeAreaView style={{ paddingHorizontal: 10 }}>
            <FlatList
                data={formatMenu(dataMenu)}
                renderItem={_renderMenu}
                keyExtractor={(item, i) => i.toString()}
                numColumns={4}
            />
        </SafeAreaView>
    )
}

export default Menu