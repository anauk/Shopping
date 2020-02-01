import React from 'react'
import { FlatList } from 'react-native'
import {useSelector} from "react-redux";
import {Text} from 'react-native'

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts)
return (
  <FlatList
    data={products}
    keyExtractor={item => item.id}
    renderItem={itemData =>
      // console.log(itemData, 'itemData')
      <Text>{itemData.item.title}</Text>
    }
  />
)
}

export default ProductsOverviewScreen
