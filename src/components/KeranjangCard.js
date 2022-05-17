import React from 'react'
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native'
import Ripple from 'react-native-material-ripple'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { convertToIDR } from '../Helper'
import styles from '../stylesheets/Main'

class KeranjangCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: this.props.data.qty,
            existCart: this.props.exist,
        }
    }

    updateAmount = (id, type) => {
        let { amount } = this.state
        if (type === 'min') {
            if (amount > 1) {
                amount -= 1
            }
        }
        if (type === 'plus') {
            if (amount < this.props.data.product.qty) {
                amount += 1
            }
        }
        this.setState({ amount })
        this.props.calculate && this.props.calculate(id, amount)
    }

    removeCartItem = (id) => {
        this.props.remove && this.props.remove(id)
    }

    displaySubTotal = () => {
        let subtotal = this.props.data.product.harga * this.state.amount
        return convertToIDR(subtotal)
    }

    removeKeranjang = (id) => {
        this.removeCartItem && this.removeCartItem(id)
        this.props.responsiveDeleteKeranjang && this.props.responsiveDeleteKeranjang(id)
    }

    render() {
        if (this.state.existCart) {
            return (
                <View style={[styles.cardItemWrap, {
                    flexDirection: 'column',
                    height: "auto",
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    marginHorizontal: 0,
                    marginVertical: 5,
                }]}>
                    <TouchableHighlight style={{ padding: 10, borderRadius: 5 }}>
                        <>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ height: "100%", width: 100, backgroundColor: "#eee" }} >
                                    <Image
                                        source={{ uri: this.props.data.product.photo }}
                                        style={{ height: 80, width: "auto" }}
                                    />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around' }}>
                                    <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{this.props.data.product.nama}</Text>
                                    <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{convertToIDR(this.props.data.product.harga)}</Text>
                                    <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#e54b4b' }}>Stok {this.props.data.product.qty}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: "flex-end" }}>
                                <View style={{ flexDirection: "row", width: "40%", justifyContent: 'space-around' }}>
                                    <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => this.updateAmount(this.props.data.product.id, "min")}>
                                        <FontAwesome5 name={"minus"} size={14} color="#fff" />
                                    </Ripple>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", width: 30, justifyContent: 'center', alignItems: "center" }}>
                                        <Text style={{ fontSize: 14, fontFamily: "Poppins-SemiBold" }}>{this.state.amount}</Text>
                                    </View>
                                    <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => this.updateAmount(this.props.data.product.id, "plus")}>
                                        <FontAwesome5 name={"plus"} size={14} color="#fff" />
                                    </Ripple>
                                </View>
                            </View>
                            <View style={{ display: 'flex', justifyContent: "space-between", flexDirection: 'row', marginTop: 10, justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "#ccc", width: "100%", paddingTop: 10, alignItems: "center" }}>
                                <Ripple
                                    rippleColor="#FC573B"
                                    style={{ height: 30, width: 50, borderRadius: 8, borderWidth: 1, borderColor: 'red', overflow: 'hidden', justifyContent: "center", alignItems: "center" }}
                                    onPress={() => this.removeKeranjang(this.props.data.product.id)}
                                >
                                    <FontAwesome5 name={"trash"} size={16} color="red" />
                                </Ripple>
                                <Text style={{ color: "#e36414", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Subtotal</Text>
                                <Text style={{ color: "#e36414", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>{this.displaySubTotal()}</Text>
                            </View>
                        </>
                    </TouchableHighlight>
                </View>
            )
        } else {
            return <></>
        }
    }
}

const s = StyleSheet.create({
    buttonAmount: {
        height: 30,
        width: 30,
        backgroundColor: "#fb8b24",
        borderRadius: 50,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
    }
})

export default KeranjangCard