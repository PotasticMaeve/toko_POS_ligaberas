import React from "react"
import { Router, Scene } from "react-native-router-flux";
import {
    View,
    Text,
} from 'react-native';
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Transaksi from "./pages/Transaksi";
import Keranjang from "./pages/Keranjang";
import DetailCard from "./pages/DetailCard";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from "./stylesheets/Main";

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
    return (
        <Router backAndroidHandler={() => false}>
            <Scene key="root" hideNavBar={true}>
                <Scene key="tabbar" tabs={true} tabBarStyle={{ height: 54, paddingBottom: 5, paddingTop: 7 }} showLabel={false}>
                    <Scene key="Home" name="home" title="Home" icon={tabIcon} >
                        <Scene key="Home" name="Home" component={Home} hideNavBar initial />
                    </Scene>
                    <Scene key="Feed" name="th-large" title="Feed" icon={tabIcon} hideNavBar>
                        <Scene key="Feed" name="Feed" component={Feed} title="Feed" />
                    </Scene>
                    <Scene key="Transaksi" name="receipt" title="Transaksi" icon={tabIcon} hideNavBar>
                        <Scene key="Transaksi" name="Transaksi" component={Transaksi} title="Transaksi" />
                    </Scene>
                </Scene>
                <Scene key="Keranjang" component={Keranjang} title="Keranjang" />
                <Scene key="DetailCard" component={DetailCard} title="DetailCard" />
                <Scene key="Wishlist" component={Wishlist} title="Wishlist" />
                <Scene key="Login" component={Login} title="Login" />
            </Scene>
        </Router>
    )
}

export default Routes