import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Text, View, ActivityIndicator, FlatList, StyleSheet, Button} from 'react-native'
import {fetchProducts} from "../../store/actions/products";


const ProductsOverviewScreen = props => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setLoading(true)
        try {
            await dispatch(fetchProducts())
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }, [dispatch, setLoading, setError])

    useEffect(() => {
        const wilFocusSub = props.navigation.addListener('willFocus', loadProducts)
        return () => {
            wilFocusSub.remove()
        }
    }, [loadProducts])

    useEffect(() => {
        loadProducts()
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
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                // console.log(itemData, 'itemData')
                <Text>{itemData.item.title}</Text>
            }
        />
    )
}

const styles = StyleSheet.create({
    centered: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default ProductsOverviewScreen
