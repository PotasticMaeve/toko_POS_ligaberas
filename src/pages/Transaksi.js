import React from 'react'
import { useWindowDimensions, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import PesananDikirim from '../components/PesananDikirim';
import PesananTiba from '../components/PesananTiba';
import PesananDiproses from '../components/PesananDiproses';

const colorHeader = ['#f3a337', '#eb8937']

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
        indicatorStyle={styles.indicatorTab}
        style={styles.tabbar}
        tabStyle={styles.tab}
        renderLabel={({ route }) => (
            <Text style={styles.labelTab}>
                {route.title}
            </Text>
        )}
    />;

const Transaksi = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'diproses' },
        { key: 'second', title: 'dikirim' },
        { key: 'third', title: 'selesai' },
    ]);
    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Transaksi</Text>
      </LinearGradient>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </>
    )
}

export default Transaksi