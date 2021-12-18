import Product from "../../models/product";
import {SET_PRODUCTS} from "./products";
import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://rn-shopping-80c3a.firebaseio.com/orders/u1.json`)
            const resData = await response.json()
            if(!response.ok){
                throw new Error('Something went wrong!')
            }
            const loadedOrders = []
            for(const key in resData){
                loadedOrders.push(
                    new Order(
                    key,
                    'u1',
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ))
            }
            dispatch({type: SET_ORDERS, orders: loadedOrders})
        } catch (e) {
            throw e
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date()
        const response = await fetch(
            `https://rn-shopping-80c3a.firebaseio.com/orders/u1.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                data: date.toISOString()
            })
        })
        if(!response.or){
            throw new Error('Something went wrong!')
        }
        const resData = await response.json()
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                data: date
            }
        })
    }
}
