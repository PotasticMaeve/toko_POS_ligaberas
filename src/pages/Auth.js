import * as React from 'react';
import { View, useWindowDimensions, Text, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import styles from '../stylesheets/Main'

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
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

export default function Auth() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'login' },
        { key: 'second', title: 'register' },
    ]);

    return (
        <>
            <Image 
                source={require("../../assets/images/bg-auth.jpg")} 
                style={{ height: "25%", width: "auto" }}
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