import React, {useState} from 'react';
import AppLoading from 'expo-app-loading'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider} from 'react-redux'
import * as Font from 'expo-font'
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
const fetchFonts = async () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-medium': require('./assets/fonts/OpenSans-Medium.ttf'),
    'open-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
  })
}

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false)
  if (!fontLoaded) {
    return <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
    />
  }
  return (
      <Provider store={store}>
        <ShopNavigator/>
      </Provider>
  );
}
export default App
