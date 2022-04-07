import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    tabTitle: {
        fontSize: 11,
        fontFamily: "Poppins-SemiBold"
    },
    headerWrap : {
        display: "flex",
        backgroundColor: "#1C3165",
        height: 82,
        paddingHorizontal: "4%",
        paddingTop: 38,
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
        width: width / 4.8,
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
        height: width / 1.5,
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
        height: width / 1.5,
        margin: 5,
        borderRadius: 10    
    },
    space: {
        height: height / 5
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
        fontSize: 11 
    },
    priceCard: { 
        textTransform: "capitalize", 
        fontSize: 12, 
        marginVertical: 5 
    },
    ratingWrap: {
        position: "absolute",
        bottom: 5,
        display: "flex",
        flexDirection: "row",
        left: 10, 
        justifyContent: "flex-start"
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
        fontFamily: "Poppins-SemiBold",    
        textTransform: "uppercase"
    }
})

export default styles