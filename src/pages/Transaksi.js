import React, { useContext, useEffect, useState } from 'react'
import { useWindowDimensions, Text, BackHandler, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../stylesheets/Main';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import PesananDikirim from '../components/PesananDikirim';
import PesananTiba from '../components/PesananTiba';
import Modal from "react-native-modal";
import PesananDiproses from '../components/PesananDiproses';
import DatePicker from 'react-native-datepicker';
import * as OpenAnything from "react-native-openanything";
import { MainContext } from '../context/MainContext';
import Ripple from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const colorHeader = ['#f3a337', '#eb8937']

const Transaksi = (props) => {
    const { back_to_shop, is_admin, backend_url } = useContext(MainContext)
    const [modalShow, setModalShow] = useState(false)
    const [backtoShop, setBacktoShop] = back_to_shop
    const [backendURL] = backend_url
    const [isAdmin] = is_admin
    const [beginDate, setBeginDate] = useState("")
    const [lastDate, setLastDate] = useState("")

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
                    if (beginDate !== "" && lastDate !== "") {
                        axios.get(`${backendURL}/report/so_download?start_date=${beginDate}&end_date=${lastDate}`, key)
                            .then(res => {
                                if (res.status === 200) {
                                    let path = res.data.url
                                    OpenAnything.Pdf(path)
                                }
                                setModalShow(false)
                                setBeginDate("")
                                setLastDate("")
                            })
                            .catch(err => {
                                toast("Gagal Mencetak Data SO", "danger")
                            })
                    } else {
                        axios.get(`${backendURL}/report/so_download`, key)
                            .then(res => {
                                if (res.status === 200) {
                                    let path = res.data.url
                                    OpenAnything.Pdf(path)
                                }
                                setModalShow(false)
                                setBeginDate("")
                                setLastDate("")
                            })
                            .catch(err => {
                                toast("Gagal Mencetak Data SO", "danger")
                            })
                    }
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
                                    setModalShow(false)
                                    setBeginDate("")
                                    setLastDate("")
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

    const filterDate = () => {
        setModalShow(true)
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
                isAdmin ? (
                    <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => filterDate()}>
                        <FontAwesome5 name={"file"} size={20} color="#fff" />
                    </Ripple>
                ) : (
                    <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => print()}>
                        <FontAwesome5 name={"file"} size={20} color="#fff" />
                    </Ripple>
                )
            )}
            {modalShow && (
                <Modal
                    isVisible={modalShow} style={{ justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            backgroundColor: "#fafafa",
                            height: 270,
                            width: 300,
                            borderRadius: 10,
                        }}>
                        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
                            <Text style={{ fontFamily: "Poppins-SemiBold" }}>Tentukan Tanggal</Text>
                        </View>
                        <View style={{ height: "100%", width: "100%", paddingHorizontal: 20 }}>
                            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13, marginTop: 10 }}>Tanggal Awal</Text>
                            <DatePicker
                                style={{ width: "100%" }}
                                date={beginDate}
                                mode="date"
                                placeholder="Pilih Tanggal"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2022-06-30"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 3,
                                        backgroundColor: "#eaeaea",
                                        width: "100%",
                                        fontFamily: "Poppins-Medium",
                                        borderRadius: 10
                                    }
                                }}
                                onDateChange={(date) => setBeginDate(date)}
                            />
                            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13, marginTop: 10 }}>Tanggal Akhir</Text>
                            <DatePicker
                                style={{ width: "100%" }}
                                mode="date"
                                date={lastDate}
                                placeholder="Pilih Tanggal"
                                format="YYYY-MM-DD"
                                minDate="2012-05-01"
                                maxDate="2022-06-30"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 3,
                                        backgroundColor: "#eaeaea",
                                        width: "100%",
                                        fontFamily: "Poppins-Medium",
                                        borderRadius: 10
                                    }
                                }}
                                onDateChange={(date) => setLastDate(date)}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            position: "absolute",
                            width: "100%",
                            height: 50,
                            bottom: 0
                        }}>
                            <TouchableOpacity
                                style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#ddd", justifyContent: "center", alignItems: "center" }}
                                onPress={() => setModalShow(false)}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Poppins-Medium" }}>Batal</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#eb8937", justifyContent: "center", alignItems: "center" }}
                                onPress={() => print()}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Poppins-Medium" }}>Cetak</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    }
})

export default Transaksi