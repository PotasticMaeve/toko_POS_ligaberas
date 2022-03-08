import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class Wishlist extends Component {
  render() {
    return (
      <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Text>Wishlist</Text>
      </View>
    )
  }
}

export default Wishlist