import React, { useContext, useEffect } from "react"
import { Drawer, Router, Scene } from "react-native-router-flux";
import {
    View,
    Text,
} from 'react-native';
import Home from "./pages/Home";
import Keranjang from "./pages/Keranjang";
import Wishlist from "./pages/Wishlist";
import Transaksi from "./pages/Transaksi";
import DetailCard from "./pages/DetailCard";
import Auth from "./pages/Auth";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from "./stylesheets/Main";
import SideMenu from "./components/SideMenu";
import Search from "./components/Search";
import Beras from "./pages/Beras";
import Tepung from "./pages/Tepung";
import Daging from "./pages/Daging";
import Minyak from "./pages/Minyak";
import Susu from "./pages/Susu";
import Telur from "./pages/Telur";
import Teh from "./pages/Teh";
import Bumbu from "./pages/Bumbu";
import Checkout from "./pages/Checkout";
import Profil from "./pages/Profil";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import { MainContext } from "./context/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmKeranjang from "./pages/ConfirmKeranjang";

const tabIcon = ({ name, focused, title }) => {
    if (focused) {
        return (
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FontAwesome5 name={name} solid size={18} color="#e8791c" />
                <Text style={[styles.tabTitle, { color: "#e8791c" }]}>{title}</Text>
            </View>
        );
    } else {
        return (
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FontAwesome5 name={name} solid size={18} color='#c1c1c1' />
                <Text style={[styles.tabTitle, { color: "#c1c1c1" }]}>{title}</Text>
            </View>
        );
    }
};

const Routes = () => {
    const { authorized } = useContext(MainContext)
    const [isAuthorized, setIsAuthorized] = authorized

    useEffect(() => {
        AsyncStorage.getItem("customerUsername").then(res => {
            let data = JSON.parse(res)
            if (data !== null) {
                setIsAuthorized(true)
            }
        })
    }, [])

    return (
        <Router backAndroidHandler={() => false}>
            <Scene key="root" hideNavBar={true}>
                <Drawer key="drawerMenu" contentComponent={SideMenu} drawerPosition="left" drawerWidth={250} hideNavBar>
                    <Scene key="tabbar" tabs={true} tabBarStyle={{ height: 54, paddingBottom: 5, paddingTop: 7 }} showLabel={false}>
                        <Scene key="Home" name="home" title="Home" icon={tabIcon} >
                            <Scene key="Home" name="Home" component={Home} hideNavBar />
                        </Scene>
                        <Scene key="Transaksi" name="receipt" title="Transaksi" icon={tabIcon} hideNavBar>
                            <Scene key="Transaksi" name="Transaksi" component={isAuthorized ? Transaksi : Auth} title="Transaksi" />
                        </Scene>
                        <Scene key="Profil" name="user-alt" title="Profil" icon={tabIcon} hideNavBar>
                            <Scene key="Profil" name="Profil" component={isAuthorized ? Profil : Auth} title="Profil" />
                        </Scene>
                    </Scene>
                </Drawer>
                <Scene key="Auth" component={Auth} title="Auth" />
                <Scene key="Transaksi" component={isAuthorized ? Transaksi : Auth} title="Transaksi" />
                <Scene key="DetailCard" component={DetailCard} title="DetailCard" />
                <Scene key="Search" component={Search} title="Search" />
                <Scene key="Keranjang" component={isAuthorized ? Keranjang : Auth} title="Keranjang" />
                <Scene key="Wishlist" component={isAuthorized ? Wishlist : Auth} title="Wishlist" />
                <Scene key="Beras" component={Beras} title="Beras" />
                <Scene key="Tepung" component={Tepung} title="Tepung" />
                <Scene key="Daging" component={Daging} title="Daging" />
                <Scene key="Minyak" component={Minyak} title="Minyak" />
                <Scene key="Susu" component={Susu} title="Susu" />
                <Scene key="Telur" component={Telur} title="Telur" />
                <Scene key="Teh" component={Teh} title="Teh" />
                <Scene key="Bumbu" component={Bumbu} title="Bumbu" />
                <Scene key="Checkout" component={Checkout} title="Checkout" />
                <Scene key="Profil" component={isAuthorized ? Profil : Auth} title="Profil" />
                <Scene key="Customers" component={isAuthorized ? Customers : Auth} title="Customers" />
                <Scene key="Products" component={isAuthorized ? Products : Auth} title="Products" />
                <Scene key="ConfirmKeranjang" component={isAuthorized ? ConfirmKeranjang : Auth} title="ConfirmKeranjang" />
            </Scene>
        </Router>
    )
}

export default Routes