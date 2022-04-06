import React from 'react'
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native'
import Ripple from 'react-native-material-ripple'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { convertToIDR } from '../Helper'
import styles from '../stylesheets/Main'

class KeranjangCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            amount: this.props.data.qty,
            existCart: this.props.exist,
        }
    }

    updateAmount = (id, type) => {
        let { amount } = this.state
        if (type === 'min') {
            if(amount > 1){
                amount -= 1
            }
        }
        if (type === 'plus') {
            if(amount < this.props.data.stock){
                amount += 1
            }
        }
        this.setState({ amount })
        this.props.calculate && this.props.calculate(id, amount)
    }

    displaySubTotal = () => {
        let subtotal = this.props.data.price * this.state.amount
        return convertToIDR(subtotal)
    }

    getImage = (imgName) => {
        if (imgName === "kecap") {
            return require("../../assets/images/kecap.jpg")
        }
        if (imgName === "gula") {
            return require("../../assets/images/gula.jpg")
        }
        if (imgName === "susu") {
            return require("../../assets/images/susu.jpeg")
        }
    }

    render(){
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
                                        source={this.getImage(this.props.data.nama)}
                                        style={{ height: 80, width: "auto" }}
                                    />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around' }}>
                                    <Text numberOfLines={1} style={[styles.textSemiBold, { width: 200, fontSize: 13, textTransform: "capitalize" }]}>{this.props.data.title}</Text>
                                    <Text style={[styles.textSemiBold, { fontSize: 13, color: '#60a3bc' }]}>{convertToIDR(this.props.data.price)}</Text>
                                    <Text style={[styles.textSemiBold, { fontSize: 13, color: '#e54b4b' }]}>Stok {this.props.data.stock}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: "flex-end" }}>
                                <View style={{ flexDirection: "row", width: "40%", justifyContent: 'space-around' }}>
                                    <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => this.updateAmount(this.props.data.id, "min")}>
                                        <FontAwesome5 name={"minus"} size={14} color="#fff" />
                                    </Ripple>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", width: 30, justifyContent: 'center', alignItems: "center" }}>
                                        <Text style={[styles.textSemiBold, { fontSize: 15 }]}>{this.state.amount}</Text>
                                    </View>
                                    <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => this.updateAmount(this.props.data.id, "plus")}>
                                        <FontAwesome5 name={"plus"} size={14} color="#fff" />
                                    </Ripple>
                                </View>
                            </View>
                            <View style={{ display: 'flex', justifyContent: "space-between", flexDirection: 'row', marginTop: 10, justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "#ccc", width: "100%", paddingTop: 10 }}>
                                <Text style={[styles.textBold, { color: "#e36414" }]}>Subtotal</Text>
                                <Text style={[styles.textBold, { color: "#e36414" }]}>{this.displaySubTotal()}</Text>
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