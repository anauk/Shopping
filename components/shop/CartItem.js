import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import {Ionicons} from "@expo/vector-icons";

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.title}>{props.title}</Text>
            </Text>
            <View>
                <Text>${props.amount.toFixed(2)}</Text>
                <TouchableOpacity
                    onPress={props.onRemove}
                    style={styles.deleteButton}
                >
                    <Ionicons
                        name={Platform.OS ==='ios' ? 'ios-trash' : 'md-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',

    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888'
    },
    title: {
        fontFamily: 'open-bold',
    },
    deleteButton: {

    }
})
export default CartItem
