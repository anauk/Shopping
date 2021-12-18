import React, {useEffect, useState} from 'react'
import {FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders} from "../../store/actions/orders";
import {ActivityIndicator} from "react-native-web";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen =(props) => {
    const [loading, setLoading] = useState(false)
    const orders = useSelector( state => state.orders.orders)
    const dispatch = useDispatch()
    useEffect(() => {
        setLoading(true)
        dispatch(fetchOrders())
            .then(() => {
                setLoading(false)
            })
    }, [dispatch])

    if(loading) {
        return <ActivityIndicator size='large' color='red' />
    }
    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={itemData => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                    />
            )}
        />
    )
}

export default OrdersScreen
