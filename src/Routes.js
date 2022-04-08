import React, { useContext } from "react"
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
import DetailPengiriman from "./pages/DetailPengiriman";
import Config from "./pages/Config";
import { MainContext } from "./context/MainContext";

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
    const { token_access } = useContext(MainContext)
    const [tokenAccess] = token_access
    return (
        <Router backAndroidHandler={() => false}>
            <Scene key="root" hideNavBar={true}>
                <Drawer key="drawerMenu" contentComponent={SideMenu} drawerPosition="left" drawerWidth={250} hideNavBar>
                    <Scene key="tabbar" tabs={true} tabBarStyle={{ height: 54, paddingBottom: 5, paddingTop: 7 }} showLabel={false}>
                        <Scene key="Home" name="home" title="Home" icon={tabIcon} >
                            <Scene key="Home" name="Home" component={Home} hideNavBar />
                        </Scene>
                        <Scene key="Wishlist" name="heart" title="Wishlist" icon={tabIcon} hideNavBar>
                            <Scene key="Wishlist" name="Wishlist" component={tokenAccess ? Wishlist : Auth} title="Wishlist" />
                        </Scene>
                        <Scene key="Keranjang" name="shopping-cart" title="Keranjang" icon={tabIcon} hideNavBar>
                            <Scene key="Keranjang" name="Keranjang" component={tokenAccess ? Keranjang : Auth} title="Keranjang" />
                        </Scene>
                    </Scene>
                </Drawer>
                <Scene key="Config" component={Config} title="Config" />
                <Scene key="Auth" component={Auth} title="Auth"  />
                <Scene key="Transaksi" component={tokenAccess ? Transaksi : Auth} title="Transaksi" />
                <Scene key="DetailCard" component={DetailCard} title="DetailCard" />
                <Scene key="Search" component={Search} title="Search" />
                <Scene key="Keranjang" component={tokenAccess ? Keranjang : Auth} title="Keranjang" />
                <Scene key="Wishlist" component={tokenAccess ? Wishlist : Auth} title="Wishlist" />
                <Scene key="Beras" component={Beras} title="Beras" />
                <Scene key="Tepung" component={Tepung} title="Tepung" />
                <Scene key="Daging" component={Daging} title="Daging" />
                <Scene key="Minyak" component={Minyak} title="Minyak" />
                <Scene key="Susu" component={Susu} title="Susu" />
                <Scene key="Telur" component={Telur} title="Telur" />
                <Scene key="Teh" component={Teh} title="Teh" />
                <Scene key="Bumbu" component={Bumbu} title="Bumbu" />
                <Scene key="Checkout" component={Checkout} title="Checkout" />
                <Scene key="DetailPengiriman" component={tokenAccess ? DetailPengiriman : Auth} title="DetailPengiriman" />
            </Scene>
        </Router>
    )
}

export default Routes