export const ADD_TO_CARD = 'ADD_TO_CARD'
export const REMOVE_FROM_CARD = 'REMOVE_FROM_CARD'

export const addToCart = product => {
    return { type: ADD_TO_CARD, payload: product }
}

export const removeFromCart = productId => {
    return {type: REMOVE_FROM_CARD, pid: productId }
}
