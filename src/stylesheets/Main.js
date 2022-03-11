import { StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width
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
    imgMenu: {
        flex: 1,
        height: WIDTH / 6,
        width: WIDTH / 5,
        backgroundColor: "#eaeaea",
        marginHorizontal: 6.5,
        marginVertical: 15,
        borderRadius: 10,
        display: 'flex',
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
        marginTop: 15,
        height: 70,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardWrap: {
        height: "auto",
        paddingHorizontal: 10
    },
    cardItemWrap: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        height: WIDTH / 1.5,
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#eaeaea',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 3,
    },
    cardBlank: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        height: WIDTH / 1.5,
        margin: 5,
        borderRadius: 10    
    },
    space: {
        height: 30
    },
    blankCard: {
        backgroundColor: "transparent"
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