import React, { useContext, useEffect } from 'react'
import { useWindowDimensions, Text, BackHandler, View, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient'
import styles from '../stylesheets/Main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import PesananDikirim from '../components/PesananDikirim';
import PesananTiba from '../components/PesananTiba';
import PesananDiproses from '../components/PesananDiproses';
import * as OpenAnything from "react-native-openanything"
import { MainContext } from '../context/MainContext';
import Ripple from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const colorHeader = ['#f3a337', '#eb8937']

const Transaksi = (props) => {
    const { back_to_shop, is_admin, backend_url } = useContext(MainContext)
    const [backtoShop, setBacktoShop] = back_to_shop
    const [backendURL] = backend_url
    const [isAdmin] = is_admin

    const pesanan_diproses = () => <PesananDiproses isAdmin={isAdmin} />
    const pesanan_dikirim = () => <PesananDikirim isAdmin={isAdmin} />
    const pesanan_tiba = () => <PesananTiba isAdmin={isAdmin} />

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

    const print = () => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                if (isAdmin) {
                    axios.get(`${backendURL}/report/so_download`, key)
                        .then(res => {
                            if (res.status === 200) {
                                let path = res.data.url
                                OpenAnything.Pdf(path)
                            }
                        })
                        .catch(err => {
                            toast("Gagal Mencetak Data SO", "danger")
                        })
                } else {
                    AsyncStorage.getItem("customerID").then(val => {
                        let customer_id = JSON.parse(val)
                        if (customer_id !== null) {
                            axios.get(`${backendURL}/report/so_download?customer_id=${customer_id}`, key)
                                .then(res => {
                                    if (res.status === 200) {
                                        let path = res.data.url
                                        OpenAnything.Pdf(path)
                                    }
                                })
                                .catch(err => {
                                    toast("Gagal Mencetak Data SO", "danger")
                                })
                        }
                    })
                }
            }
        })
    }

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Transaksi</Text>
            </LinearGradient>
            {isAdmin ? (
                <>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        renderTabBar={renderTabBar}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                    />
                </>
            ) : (
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
            {props.backToShopping ? (
                <Ripple style={[s.buttonAmount, { bottom: "5%" }]} rippleColor="#fff" onPress={() => print()}>
                    <FontAwesome5 name={"file"} size={20} color="#fff" />
                </Ripple>
            ) : (
                <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => print()}>
                    <FontAwesome5 name={"file"} size={20} color="#fff" />
                </Ripple>
            )}
        </>
    )
}

const s = StyleSheet.create({
    buttonAmount: {
        position: "absolute",
        bottom: "3%",
        right: 20,
        height: 55,
        width: 55,
        backgroundColor: "#fb8b24",
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
})

export default Transaksi