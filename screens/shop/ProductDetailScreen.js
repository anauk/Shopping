import React from 'react'
import {View, ScrollView, StyleSheet, Image, Button, Text} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import Colors from "../../constants/Colors";
import {addToCart} from "../../store/actions/cart";

const ProductDetailScreen = props => {
    console.log('ProductDetailScreen', props)
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state=>
        state.products.availableProducts.find(product => product.id === productId)
    )
    console.log('selectedProduct', selectedProduct)
    const dispatch = useDispatch()

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{uri: selectedProduct.imageUrl}}
            />
            <Button
                color={Colors.primaryColor}
                title='Add to Card'
                onPress={() => {
                    dispatch(addToCart(selectedProduct))
                }}
            />
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>

    )
}

ProductDetailScreen.navigationOptions = navData => {
    console.log('navData', navData)
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 10
    }

})

export default ProductDetailScreen
