import React from 'react'
import { View } from 'react-native'
import styles from "../stylesheets/Main"
import MenuItem from './MenuItem'

const Menu = () => {
    return (
        <>
            <View style={styles.menuWrap}>
                <MenuItem color="#F2E1AD" imgName="swimwear" text="Pakaian"/>
                <MenuItem color="#EDDCC8" imgName="meal" text="Makanan" />
                <MenuItem color="#E8CFC8" imgName="iphone" text="Gadget" />
                <MenuItem color="#BDE2E4" imgName="bag" text="Tas" />
            </View>
            <View style={styles.menuWrap}>
                <MenuItem color="#DEE3FC" imgName="sneakers" text="Sepatu" />
                <MenuItem color="#E0E7D7" imgName="chair" text="Perabotan" />
                <MenuItem color="#E5EFC9" imgName="badminton" text="Olahraga" />
                <MenuItem color="#F6D8B6" imgName="lotion" text="Kecantikan" />
            </View>
        </>
    )
}

export default Menu