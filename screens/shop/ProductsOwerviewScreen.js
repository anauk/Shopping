import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {Text, View, ActivityIndicator, FlatList, StyleSheet, Button, Platform} from 'react-native'
import {fetchProducts} from "../../store/actions/products";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import {Ionicons} from "@expo/vector-icons";


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
        console.log('props', props)
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
                onSelect={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
                />
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = navData => {
    console.log('nD', navData)
        return {
        headerTitle: 'All Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>
        ),
            headerRight: (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
            )
        }
}

const styles = StyleSheet.create({
    centered: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default ProductsOverviewScreen
