import {ADD_TO_CARD, REMOVE_FROM_CARD} from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CARD:
            console.log('ADD_TO_CARD', action.product)
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title
            let updatedOrNewCartItem
            if(state.items[addedProduct.id]){
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)

            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewCartItem
                },
                totalAmount: state.totalAmount + prodPrice
            }
        case REMOVE_FROM_CARD:
            const selectedCartItem = state.items[action.pid]
            const currentQty = selectedCartItem.quantity
            let updatedCartItems
            if(currentQty > 1){
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity-1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum -selectedCartItem.productPrice
                    )
                updatedCartItems = {...state.items, [action.pid]: updatedCartItem}
            } else {
                updatedCartItems = {...state.items}
                delete updatedCartItems[action.pid]
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount-selectedCartItem.productPrice
            }

        default:
            return state
    }
}
