import * as React from 'react';
import { View, useWindowDimensions, Text, Image, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Actions } from 'react-native-router-flux'
import Deskripsi from '../components/Deskripsi';
import Ulasan from '../components/Ulasan';
import styles from '../stylesheets/Main'

const renderScene = SceneMap({
    first: Deskripsi,
    second: Ulasan,
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

export default function DetailCard() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'deskripsi' },
        { key: 'second', title: 'ulasan' },
    ]);
    return (
        <>
            <TouchableOpacity
                onPress={() => Actions.pop()}
                style={{
                    position: "absolute",
                    left: "5%",
                    top: "5.5%",
                    zIndex: 999
                }}
            >
                <FontAwesome5 name={"angle-left"} size={29} color='#fafafa' />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.Keranjang()}
                style={{
                    position: "absolute",
                    right: "5%",
                    top: "6.1%",
                    zIndex: 999,
                }}
            >
                <FontAwesome5 name={"shopping-cart"} solid size={19} color='#fafafa' />
            </TouchableOpacity>
            <Image
                source={require("../../assets/images/sepatu1.jpg")}
                style={{ height: 300, width: "auto" }}
                resizeMode='cover'
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </>
    );
}