import React from 'react'
import { ScrollView } from 'react-native'
import Space from './Space'
import TransaksiCard from "./TransaksiCard"

const PesananTiba = () => {
    return (
        <ScrollView style={{ paddingTop: 5, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
            <TransaksiCard exist={true} />
            <Space />
        </ScrollView>
    )
}

export default PesananTiba