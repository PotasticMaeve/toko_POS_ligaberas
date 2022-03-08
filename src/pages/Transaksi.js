import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class Transaksi extends Component {
  render() {
    return (
      <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Text>Transaksi</Text>
      </View>
    )
  }
}

export default Transaksi