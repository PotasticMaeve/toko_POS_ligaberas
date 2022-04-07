import React from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import { Actions } from 'react-native-router-flux'
import styles from "../stylesheets/Main"

const getImage = (imgName) => {
    if (imgName === "beras") {
        return require("../../assets/images/flour.png")
    }
    if (imgName === "tepung") {
        return require("../../assets/images/wheat.png")
    }
    if (imgName === "daging") {
        return require("../../assets/images/beef.png")
    }
    if (imgName === "minyak") {
        return require("../../assets/images/cooking-oil.png")
    }
    if (imgName === "susu") {
        return require("../../assets/images/milk.png")
    }
    if (imgName === "telur") {
        return require("../../assets/images/eggs.png")
    }
    if (imgName === "teh") {
        return require("../../assets/images/coffee.png")
    }
    if (imgName === "bumbu") {
        return require("../../assets/images/seasoning.png")
    }
}

const getRoute = (imgName) => {
    if (imgName === "beras") {
        Actions.Beras()
    }
    if (imgName === "tepung") {
        Actions.Tepung()
    }
    if (imgName === "daging") {
        Actions.Daging()
    }
    if (imgName === "minyak") {
        Actions.Minyak()
    }
    if (imgName === "susu") {
        Actions.Susu()
    }
    if (imgName === "telur") {
        Actions.Telur()
    }
    if (imgName === "teh") {
        Actions.Teh()
    }
    if (imgName === "bumbu") {
        Actions.Bumbu()
    }
}

const MenuItem = (props) => {
    return (
        <View>
            <Ripple
                style={[styles.imgMenu, { backgroundColor: props.color }]}
                rippleColor="#fff"
                onPress={() => getRoute(props.imgName)}
            >
                <Image
                    source={getImage(props.imgName)}
                    style={{
                        height: 50,
                        width: 50,
                        position: "absolute",
                        top: -25,
                    }}
                />
            </Ripple>
            <View style={{ display: "flex", alignItems: "center", height: 18 }}>
                {(() => {
                    if (props.text.length > 10) {
                        return (
                            <Text style={{ fontSize: 11, marginTop: -10, color: "#595959", fontFamily: "Poppins-SemiBold" }}>{props.text}</Text>
                        )
                    } else {
                        return (
                            <Text style={{ fontSize: 11.5, marginTop: -10, color: "#595959", fontFamily: "Poppins-SemiBold" }}>{props.text}</Text>
                        )
                    }
                })()}
            </View>
        </View>
    )
}

export default MenuItem