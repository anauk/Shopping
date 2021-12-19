// import { NavigationContainer, DrawerActions } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import {createDrawerNavigator} from "@react-navigation/drawer";
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import ProductsOverviewScreen from "../screens/shop/ProductsOwerviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-italic'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}
// const Stack = createNativeStackNavigator()
// const ProductNavigator = () => {
//  return (
//      <Stack.Navigator>
//          <Stack.Group
//              screenOptions={defaultNavOptions}
//          >
//        <Stack.Screen
//            name='ProductsOverview'
//            component={ProductsOverviewScreen}
//            options={{headerTitle: 'All products'}}
//        />
//        <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
//        <Stack.Screen name='Cart' component={CartScreen} />
//          </Stack.Group>
//      </Stack.Navigator>
// )
// }
// const OrdersNavigator = () => {
//   return (
//       <Stack.Navigator>
//           <Stack.Group
//               screenOptions={defaultNavOptions}
//           >
//         <Stack.Screen name='Orders' component={OrdersScreen} />
//           </Stack.Group>
//       </Stack.Navigator>
//   )
// }

// const OrdersNavigator = createStackNavigator({
//   Orders: OrdersScreen
// }, {
//   defaultNavigationOptions: defaultNavOptions
// })

// const Drawer = createDrawerNavigator()
//
// const ShopNavigator = () => {
//   return <NavigationContainer>
//     <Drawer.Navigator>
//     <Drawer.Screen name='Products' component={ProductNavigator} />
//     <Drawer.Screen name='Orders' component={OrdersNavigator} />
//   </Drawer.Navigator>
//   </NavigationContainer>
// }
const ProductNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons
        name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
        size={23}
        color={drawerConfig.tintColor}
    />
  },
  defaultNavigationOptions: {
    defaultNavOptions
  }
})
const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons
        name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
        size={23}
        color={drawerConfig.tintColor}
    />
  },
  defaultNavigationOptions: {
    defaultNavOptions
  }
})
const ShopNavigator = createDrawerNavigator({
  Products: ProductNavigator,
  Orders: OrdersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primaryColor
  }
})
export default createAppContainer(ShopNavigator)
