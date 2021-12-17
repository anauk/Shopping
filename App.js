import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import productsReducer from './store/reducers/products'
import ShopNavigator from "./navigation/ShopNavigator"

import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders'

const rootReducer = combineReducers({
  products: productsReducer,
    cart: cartReducer,
    orders: orderReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

export default App
