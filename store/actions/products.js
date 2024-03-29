import Product from "../../models/product";

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(`https://rn-shopping-80c3a.firebaseio.com/products.json`)
            const resData = await response.json()
            if(!response.ok){
                throw new Error('Something went wrong!')
            }
            const loadedProducts = []
            for(const key in resData){
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,
                ))
            }
            dispatch({type: SET_PRODUCTS, products: loadedProducts})
        } catch (e) {
            throw e
        }
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        await fetch(`https://rn-shopping-80c3a.firebaseio.com/products/${productId}.json`, {
            method: 'POST',
        })
        dispatch({type: DELETE_PRODUCT, pid: productId})
    }
}

export const creatProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        //any async code
        try {
            const response = await fetch(`https://rn-shopping-80c3a.firebaseio.com/products.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price
                })
            })
            const resData = await response.json()
            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name,
                    title,
                    description,
                    imageUrl,
                    price
                }
            })
        } catch (e) {

        }
    }
}
export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch =>  {
        try {
            await fetch(`https://rn-shopping-80c3a.firebaseio.com/products/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                })
            })
            dispatch({
                type: UPDATE_PRODUCT,
                pid: id,
                productData: {
                    title,
                    description,
                    imageUrl,
                }
            })
        } catch (e) {
            throw e
        }
    }

}
