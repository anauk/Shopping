import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Text, View, ActivityIndicator, FlatList, StyleSheet, Button} from 'react-native'
import {fetchProducts} from "../../store/actions/products";
import ProductItem from "../../components/shop/ProductItem";


const ProductsOverviewScreen = props => {
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setRefreshing(true)
        try {
            await dispatch(fetchProducts())
        } catch (e) {
            setError(e.message)
        }
        setRefreshing(false)
    }, [dispatch, setRefreshing, setError])

    useEffect(() => {
        const wilFocusSub = props.navigation.addListener('willFocus', loadProducts)
        return () => {
            wilFocusSub.remove()
        }
    }, [loadProducts])

    useEffect(() => {
        setLoading(true)
        loadProducts().then(() => {
            setLoading(false)
        })
    }, [dispatch, loadProducts])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    }
    if(loading){
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={'red'}/>
        </View>
    }
    if(!loading && products.length === 0) {
        return <View style={styles.centered}>
            <Text> No eny data </Text>
        </View>
    }
    if(error) {
       return  <View style={styles.centered}>
           <Text> Error </Text>
           <Button title='Try again' onPress={loadProducts} />
       </View>
    }
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={refreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                // console.log(itemData, 'itemData')
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => { selectItemHandler(itemData.item.id,itemData.item.title)}}
                />
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}
const styles = StyleSheet.create({
    centered: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default ProductsOverviewScreen
