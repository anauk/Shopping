import PRODUCTS from '../../data/dummy-data'
import {CREATE_PRODUCT, SET_PRODUCTS} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod=>prod.ownerId === 'u1')
}

export  default (state=initialState, action) => {
  switch (action.type){
    case SET_PRODUCTS: {
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter(prod=>prod.ownerId === 'u1')
      }
    }
    case CREATE_PRODUCT:
      const newProduct = new Product(
          action.productData.id,
          'u1',
          action.productData.title,
          action.productData.imageUrl,
          action.productData.description,
          action.productData.price,
      )
          return {
        ...state,
            availableProducts: state.availableProducts.concat(newProduct)
          }
    default:
      return state
  }

}
