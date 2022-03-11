import React from 'react'
import { View, FlatList, Image, Text } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from "../stylesheets/Main"

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
        <View>
            <Ripple
                style={[styles.imgMenu, { backgroundColor: item.color }]}
                rippleColor="#fff"
            >
                <Image
                    source={getImage(item.imgName)}
                    style={{ height: 35, width: 35 }}
                />
            </Ripple>
            <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={[styles.textSemiBold, { fontSize: 12, marginTop: -10, color: "#595959" }]}>{item.text}</Text>
            </View>
        </View>
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

const getImage = (imgName) => {
    if (imgName === "swimwear") {
        return require("../../assets/images/swimwear.png")
    }
    if (imgName === "meal") {
        return require("../../assets/images/meal.png")
    }
    if (imgName === "iphone") {
        return require("../../assets/images/iphone.png")
    }
    if (imgName === "bag") {
        return require("../../assets/images/bag.png")
    }
    if (imgName === "sneakers") {
        return require("../../assets/images/sneakers.png")
    }
    if (imgName === "chair") {
        return require("../../assets/images/chair.png")
    }
    if (imgName === "lotion") {
        return require("../../assets/images/lotion.png")
    }
    if (imgName === "badminton") {
        return require("../../assets/images/badminton.png")
    }
}

const Menu = () => {
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <FlatList
                data={formatMenu(dataMenu)}
                renderItem={_renderMenu}
                keyExtractor={(item, i) => i.toString()}
                numColumns={4}
            />
        </View>
    )
}

export default Menu