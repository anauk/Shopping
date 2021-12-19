import React, {useEffect, useState} from 'react'
import {FlatList, Platform, Text} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders} from "../../store/actions/orders";
import {ActivityIndicator} from "react-native-web";
import OrderItem from "../../components/shop/OrderItem";
import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = (props) => {
    const [loading, setLoading] = useState(false)
    const orders = useSelector( state => state.orders.orders)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     setLoading(true)
    //     dispatch(fetchOrders())
    //         .then(() => {
    //             setLoading(false)
    //         })
    // }, [dispatch])
    //
    // if(loading) {
    //     return <ActivityIndicator size='large' color='red' />
    // }
    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={itemData => <Text>itemData.item.totalAmount</Text>}
            // renderItem={itemData => (
            //     <OrderItem
            //         amount={itemData.item.totalAmount}
            //         date={itemData.item.readableDate}
            //         items={itemData.item.items}
            //         />
            // )}
        />
    )
}
OrdersScreen.navigationOptions = navData =>  {
    return {
        headerTitle: 'YOUR Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
            title='Menu'
            iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
            onPress={() => {
                navData.navigation.toggleDrawer()
            }}
            />
        </HeaderButtons>
        )
    }
}

export default OrdersScreen
