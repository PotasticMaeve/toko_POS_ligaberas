import React, { Component } from "react"
import { Router, Scene } from "react-native-router-flux";
import {
    View,
    Text,
} from 'react-native';
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Transaksi from "./pages/Transaksi";
import Store from "./pages/Store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const tabIcon = ({ name, focused, title }) => {
    if (focused) {
        return (
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FontAwesome5 name={name} solid size={18} color='#d63031'/>
                <Text style={{ color: '#d63031', fontSize: 11 }}>{title}</Text>
            </View>
        );
    } else {
        return (
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FontAwesome5 name={name} solid size={18} color='grey'/>
                <Text style={{ color: 'grey', fontSize: 11 }}>{title}</Text>
            </View>
        );
    }
};

export class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key="tabbar" tabs={true} tabBarStyle={{ height: 54, paddingBottom: 5, paddingTop: 7 }} showLabel={false}>
                        <Scene key="Home" name="home" title="Home" icon={tabIcon} >
                            <Scene key="Home" component={Home} hideNavBar initial />
                        </Scene>
                        <Scene key="Store" name="store" title="Store" icon={tabIcon} hideNavBar>
                            <Scene key="Store" component={Store} title="Store" />
                        </Scene>
                        <Scene key="Wishlist" name="heart" title="Wishlist" icon={tabIcon} hideNavBar>
                            <Scene key="Wishlist" component={Wishlist} title="Wishlist" />
                        </Scene>
                        <Scene key="Transaksi" name="receipt" title="Transaksi" icon={tabIcon} hideNavBar>
                            <Scene key="Transaksi" component={Transaksi} title="Transaksi" />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

export default Routes