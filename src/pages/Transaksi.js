import React, { useContext, useEffect } from 'react'
import { useWindowDimensions, Text, BackHandler, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient'
import styles from '../stylesheets/Main'
import PesananDikirim from '../components/PesananDikirim';
import PesananTiba from '../components/PesananTiba';
import PesananDiproses from '../components/PesananDiproses';
import { MainContext } from '../context/MainContext';
import Ripple from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux';
import Maintenance from '../components/Maintenance';

const colorHeader = ['#f3a337', '#eb8937']

const Transaksi = (props) => {
    const { back_to_shop, is_admin } = useContext(MainContext)
    const [backtoShop, setBacktoShop] = back_to_shop
    const [isAdmin] = is_admin

    const pesanan_diproses = () => <PesananDiproses />
    const pesanan_dikirim = () => <PesananDikirim />
    const pesanan_tiba = () => <PesananTiba />

    const renderScene = SceneMap({
        first: pesanan_diproses,
        second: pesanan_dikirim,
        third: pesanan_tiba,
    });

    const renderTabBar = props =>
        <TabBar {...props}
            onPress={() => updateFetchData()}
            indicatorStyle={styles.indicatorTab}
            style={styles.tabbar}
            tabStyle={styles.tab}
            renderLabel={({ route }) => (
                <Text style={styles.labelTab}>
                    {route.title}
                </Text>
            )}
        />;
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'diproses' },
        { key: 'second', title: 'dikirim' },
        { key: 'third', title: 'selesai' },
    ]);

    const backHome = () => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress", () => true
        );
        return () => backHandler.remove();
    }

    useEffect(() => {
        props.backToShopping && Actions.currentScene === "Transaksi" && backHome()
    }, [])

    const backHomeReload = () => setBacktoShop(true)

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Transaksi</Text>
            </LinearGradient>
            {isAdmin ? (
                <Maintenance />
            ):(
                <>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
                {props.backToShopping && (
                    <View style={{ position: "absolute", left: 0, bottom: 0, height: 80, paddingTop: 10, paddingBottom: 10, width: "100%", paddingHorizontal: 15, backgroundColor: "#fafafa", justifyContent: "center", alignItems: "center" }}>
                        <Ripple
                            rippleColor="#fff"
                            style={{
                                height: 40,
                                borderRadius: 10,
                                backgroundColor: '#eb8937',
                                overflow: 'hidden',
                                width: "100%",
                                justifyContent: "center",
                                alignItems: 'center',
                            }}
                            onPress={() => backHomeReload()}
                        >
                            <Text style={{ fontFamily: "Poppins-SemiBold", color: "#fff", textTransform: "capitalize", fontSize: 13.5, marginTop: 5 }}>Kembali Berbelanja</Text>
                        </Ripple>
                    </View>
                )}
                </>
            )}
        </>
    )
}

export default Transaksi