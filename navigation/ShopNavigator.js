import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ProductsOverviewScreen from "../screens/shop/ProductsOwerviewScreen";
import Colors from '../constants/Colors'
import { Platform } from 'react-native'

const ProductNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  }
})

export default createAppContainer(ProductNavigator)
