import React, { useReducer, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { ListItem, Icon, Button, Overlay, Image } from 'react-native-elements';
import * as Reducer from './Reducer';
import * as actions from './ActionCreators';
import { StyleSheet } from 'react-native';
import { baseURL } from '../baseURL';
import ProductEdit from './ProductEditOverlay';

export default function ProductList(props) {
    const [state, dispatch] = useReducer(Reducer.productReducer, { products: [] });
    const [overlayState, setOverlayState] = useState({isVisibleOverlay: false, id: null});

    const toggleOverlay = (id) => setOverlayState({isVisibleOverlay: !overlayState.isVisibleOverlay, id: id});
    
    useEffect(() => actions.fetchProducts(dispatch), []);

    const renderItem = ({ item }) => {
        return (
            <View>
                <ListItem
                    title={item.name}
                    subtitle={`Type: ${item.type}   |   Price: ${item.price}`}
                    leftAvatar={{ source: { uri: baseURL + item.image } }}
                    bottomDivider
                    onPress={() => toggleOverlay(item.id)}
                    rightIcon={<Icon
                        name='trash'
                        type='font-awesome'
                        color='#eee'
                        onPress={() => Alert.alert(
                            'Delete',
                            'Are you sure you want to delete product? This will remove item from your webpage.',
                            [
                                {
                                    text: 'Ok'
                                },
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                }
                            ]
                        )}
                    />}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Products</Text>
            <Icon
                containerStyle={styles.uploadButton}
                name='upload'
                type='font-awesome'
                color='#000'
                onPress={() => console.log('Hello!')}
            />
            <FlatList
                style={{ borderTopColor: 'palevioletred', borderTopWidth: 1 }}
                data={state.products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <Icon
                containerStyle={styles.addButton}
                raised
                reverse
                name='plus'
                type='font-awesome'
                color='black'
                onPress={() => dispatch(actions.addProduct({ name: 'Ball', type: 'toy', price: '3.99' }))} 
            />
            <Overlay
                isVisible={overlayState.isVisibleOverlay}
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.overlay}
            >
                <ProductEdit product={state.products.filter(product => product.id === overlayState.id)[0]} />
            </Overlay>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 45,
        backgroundColor: 'white',
        position: 'relative',
        paddingBottom: 37
    },
    button: {
        width: 200,
        backgroundColor: 'black'
    },
    textStyle: {
        marginHorizontal: 6,
        fontSize: 20,
        fontWeight: '700',
        paddingBottom: 10,
        textAlign: 'center'

    },
    addButton: {
        position: 'absolute',
        bottom: 50,
        right: 20,
    },
    uploadButton: {
        position: 'absolute',
        top: 45,
        right: 20
    },
    overlay: {
        width: '90%',
        height: '70%'
    }
})