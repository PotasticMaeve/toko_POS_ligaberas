import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tabTitle: {
        fontSize: 11,
        fontFamily: "Nunito-Bold"
    },
    initPage: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    headerWrap : {
        display: "flex",
        backgroundColor: "#1C3165",
        height: 95,
        paddingHorizontal: "4%",
        paddingTop: "13%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    cartIcon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: 38,
        width: "25%"
    },
    textField: {
        paddingHorizontal: "3%",
        backgroundColor: "#eee",
        width: "73%",
        height: 40,
        borderRadius: 6,
    },
    eraseText: {
        position: "absolute",
        top: 10,
        right: 15
    },
    bannerWrap: {
        height: 175,
        width: "100%",
        paddingTop: 10,
    },
    slideItem: {
        height: "100%",
        width: "auto"
    },
    dotWrap: {
        flexDirection: "row",
        alignSelf: "flex-start",
        position: "absolute",
        bottom: 0,
        left: 10,
        zIndex: 99
    },
    dotActive: {
        width: 15,
        height: 15,
        margin: 1,
        color: "#e8791c",
    },
    dot: {
        width: 15,
        height: 15,
        margin: 1,
        color: "#c1c1c1"
    },
    textBold: {
        fontFamily: "Nunito-Bold"
    },
    textLight: {
        fontFamily: "Nunito-Light"
    },
    textMedium: {
        fontFamily: "Nunito-Medium"
    },
    textRegular: {
        fontFamily: "Nunito-Regular"
    },
    textSemiBold: {
        fontFamily: "Nunito-SemiBold"
    },
})

export default styles