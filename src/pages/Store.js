import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class Store extends Component {
    render() {
        return (
            <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Text>Store</Text>
            </View>
        )
    }
}

export default Store