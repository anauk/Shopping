import React, {useState} from 'react'
import {FlatList, View, Text, Button, StyleSheet} from "react-native";
import {removeFromCart} from "../../store/actions/cart";
import {useDispatch, useSelector} from "react-redux";
import {addOrder} from "../../store/actions/orders";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import {ActivityIndicator} from "react-native-web";


const CartScreen = () => {
    const [loading, setLoading] = useState(false)
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
            return transformedCartItems.sort((a, b) => a.productId > b.productId
                ? 1 : -1)
        }
    })
    const dispatch = useDispatch()
    const sendOrderHandler = async () => {
        setLoading(true)
        await dispatch(addOrder(cartItems, cartTotalAmount))
        setLoading(false)
    }

    return (
        <View>
            <Card>
                <Text>
                    Total: {' '}
                    <Text>
                        ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
                    </Text>
                </Text>
                {
                    loading
                        ? <ActivityIndicator size='small' color='red'/>
                        : <Button
                            color='red'
                            title='Order now'
                            disabled={cartItems.length === 0}
                            onPress={sendOrderHandler}
                        />
                }
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(removeFromCart(itemData.item.productId))
                        }}
                    />
                }
            />
        </View>
    )
}
CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}
const styles = StyleSheet.create({
    screen: {

    },
    summary: {

    },
    summaryText: {

    },
    amount: {

    }

})
export default CartScreen
