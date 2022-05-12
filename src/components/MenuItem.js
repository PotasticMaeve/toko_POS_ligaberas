import React from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import { Actions } from 'react-native-router-flux'
import styles from "../stylesheets/Main"

const getImage = (name) => {
    if (name === "beras") {
        return require("../../assets/images/flour.png")
    }
    if (name === "tepung") {
        return require("../../assets/images/wheat.png")
    }
    if (name === "daging") {
        return require("../../assets/images/beef.png")
    }
    if (name === "minyak") {
        return require("../../assets/images/cooking-oil.png")
    }
    if (name === "susu") {
        return require("../../assets/images/milk.png")
    }
    if (name === "telur") {
        return require("../../assets/images/eggs.png")
    }
    if (name === "teh") {
        return require("../../assets/images/coffee.png")
    }
    if (name === "bumbu") {
        return require("../../assets/images/seasoning.png")
    }
}

const getRoute = (path, text) => {
    Actions.Kategori({ path: path, text: text })
}

const MenuItem = (props) => {
    return (
        <View>
            <Ripple
                style={[styles.imgMenu, { backgroundColor: props.color }]}
                rippleColor="#fff"
                onPress={() => getRoute(props.path, props.text)}
            >
                <Image
                    source={getImage(props.path)}
                    style={{
                        height: 50,
                        width: 50,
                        position: "absolute",
                        top: -25,
                    }}
                />
            </Ripple>
            <View style={{ display: "flex", alignItems: "center", height: 18 }}>
                <Text style={{ fontSize: 11, marginTop: -10, color: "#595959", fontFamily: "Poppins-SemiBold" }}>{props.text}</Text>
            </View>
        </View>
    )
}

export default MenuItem