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
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
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
    menuWrap: {
        height: 100,
        width: "100%",
        paddingHorizontal: 10,
        paddingTop: 20,
        display: "flex",
        flexDirection: "row"
    },
    imgMenu: {
        height: 60,
        width: 60,
        borderRadius: 10,
        marginHorizontal: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
    },
    labelWrap: {
        height: 50,
        width: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 100,
    },
    homeWrap: {
        backgroundColor: "#fafafa",
        height: "100%"
    },
    labelRow: {
        height: 90,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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