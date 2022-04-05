import { StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width
const styles = StyleSheet.create({
    tabTitle: {
        fontSize: 11,
        fontFamily: "Nunito-Bold"
    },
    headerWrap : {
        display: "flex",
        backgroundColor: "#1C3165",
        height: 50,
        paddingHorizontal: "4%",
        paddingTop: "2%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    cartIcon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 38,
        width: "100%"
    },
    textField: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: "3%",
        backgroundColor: "#eee",
        width: "73%",
        height: 35,
        borderRadius: 6,
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
    },
    eraseText: {
        position: "absolute",
        top: 10,
        right: 15
    },
    bannerWrap: {
        height: 180,
        width: "100%",
        paddingTop: 10,
    },
    imgMenu: {
        flex: 1,
        height: 30,
        width: WIDTH / 4.8,
        backgroundColor: "#eaeaea",
        marginHorizontal: 6.5,
        marginTop: 40,
        marginBottom: 15,
        borderRadius: 50,
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
        paddingLeft: 15,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 100,
    },
    homeWrap: {
        backgroundColor: "#fafafa",
        height: "100%"
    },
    labelRow: {
        height: 65,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        marginVertical: 8,
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
    imgCardWrap: {
        height: "55%",
        width: "100%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: "hidden",
        backgroundColor: '#eaeaea',
    },
    imgCard: { 
        height: "100%", 
        width: '100%', 
        resizeMode: 'cover' 
    },
    titleCard: { 
        textTransform: "capitalize", 
        fontSize: 12 
    },
    priceCard: { 
        textTransform: "capitalize", 
        fontSize: 13, 
        marginVertical: 5 
    },
    ratingWrap: {
        position: "absolute",
        bottom: -30,
        display: "flex",
        flexDirection: "row",
        width: '75%',
        justifyContent: "space-evenly"
    },
    containerTab: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: "#fff",
    },
    tab: {
        height: 45,
    },
    indicatorTab: {
        backgroundColor: "#eb8937",
    },
    labelTab: {
        color: "#eb8937",
        alignSelf: 'center',
        fontFamily: "Nunito-Bold",    
        textTransform: "uppercase"
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