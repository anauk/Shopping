import React from 'react'
import {Button, Image,
    StyleSheet, Text,
    TouchableOpacity,
    View, TouchableWithoutFeedback,
    Platform
} from 'react-native'
import Colors from "../../constants/Colors";

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity
    if(Platform.OS === 'android'  && Platform.Version >= 21){
        TouchableCmp = TouchableWithoutFeedback
    }
    return (
            <View style={styles.product}>
                <View style={styles.touchable}>
                <TouchableCmp
                    useForeground
                    onPress={props.onSelect}>
                    <View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: props.image}}
                    />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>

                    <Text style={styles.price}>$ {props.price.toFixed(2)}</Text>

                </View>
                <View style={styles.actions}>
                    <Button
                        title='View Details'
                        onPress={props.onSelect}
                    />
                    <Button
                        color={Colors.primary}
                        title='To Cart'
                        onPress={props.onSelect}
                    />

                </View>
                    </View>
                </TouchableCmp>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 10,

    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        overflow: 'hidden',
    },
    image: {

        width: '100%',
        height: '100%'
    },
    title: {
        fontFamily: 'open-bold',
        fontSize: 10,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }

})

export default ProductItem
