import React from 'react'
import { useWindowDimensions, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import { View } from 'react-native';

const colorHeader = ['#f3a337', '#eb8937']

const pesanan_dikirim = () => {
    return <View style={{ flex: 1, backgroundColor: "#fafafa" }}></View>
}
const pesanan_tiba = () => {
    return <View style={{ flex: 1, backgroundColor: "#fafafa" }}></View>
}

const renderScene = SceneMap({
    first: pesanan_dikirim,
    second: pesanan_tiba,
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
        { key: 'first', title: 'Pesanan Dikirim' },
        { key: 'second', title: 'Pesanan Tiba' },
    ]);
    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 50, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={[styles.textBold, { fontSize: 18, color: "#fff", marginLeft: 30 }]}>Transaksi</Text>
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