import React from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from "../stylesheets/Main"

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

const MenuItem = (props) => {
    return (
        <View>
            <Ripple
                style={[styles.imgMenu, { backgroundColor: props.color }]}
                rippleColor="#fff"
            >
                <Image
                    source={getImage(props.imgName)}
                    style={{ height: 35, width: 35 }}
                />
            </Ripple>
            <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={[styles.textSemiBold, { fontSize: 12, marginTop: -10, color: "#595959" }]}>{props.text}</Text>
            </View>
        </View>
    )
}

export default MenuItem