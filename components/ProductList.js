import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator, Animated } from 'react-native';
import { ListItem, Icon, Button, Overlay, Image } from 'react-native-elements';
import * as actions from './ActionCreators';
import { StyleSheet } from 'react-native';
import { baseURL } from '../baseURL';
import ProductEdit from './ProductEditOverlay';
import { ProductContext } from '../ProductContext';
import * as Animatable from 'react-native-animatable';

export default function ProductList(props) {

    const [pState, pDispatch] = useContext(ProductContext); //sets up state for product list
    useEffect(() => actions.fetchProducts(pDispatch), []);  //fetches list of products from server

    const [state, setState] = useState({                    //state to manage overlay for product info
        overlay: { isVisible: false, id: null }
    });

    const toggleOverlay = (id) => setState({
        ...state,
        overlay: {
            id: id ? id : (id === 0) ? id : null,
            isVisible: !state.overlay.isVisible
        }
    });

    const addToNew = name => {
        if (name)
            setState({ ...state, newProduct: [...state.newProduct, name] })
        else
            console.log('Invalid name for new item')
    };

    const deleteProduct = (item) => Alert.alert( //displays alert to delete product from list
        'Delete',
        'Are you sure you want to delete product? This will remove item from your webpage.',
        [
            {
                text: 'Delete',
                onPress: () => pDispatch(actions.deleteProduct(item.id))
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }
        ]
    );

    const renderItem = ({ item }) => { //render item for flat list. renders once for each item in list
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
                        onPress={() => deleteProduct(item)}
                    />}
                    onLongPress={() => deleteProduct(item)}
                    badge={pState.newProduct.includes(item.name) ? { status: "success" } : null}
                />
            </View>
        );
    }

    const loadingRender = <View style={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: "#000" }}><ActivityIndicator size="large" color="#fff" /></View>;

    const producrRender = (
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
                data={pState.products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={View}
                ListFooterComponentStyle={{ backgroundColor: 'palevioletred', height: 47 }}

            />
            <View>
            <Icon
                containerStyle={styles.addButton}
                raised
                reverse
                name='plus'
                type='font-awesome'
                color='black'
                onPress={() => toggleOverlay()}
            />
            </View>
            <Overlay
                isVisible={state.overlay.isVisible}
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.overlay}>
                <ProductEdit id={state.overlay.id} toggle={toggleOverlay} />
            </Overlay>
        </View>);

    return pState.isLoading ? loadingRender : producrRender;
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
        fontWeight: '700',
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 20
    },
    addButton: {
        position: 'absolute',
        bottom: 12,
        right: 20
    },
    uploadButton: {
        position: 'absolute',
        top: 45,
        right: 20
    },
    overlay: {
        width: '90%',
        height: '70%',
        borderRadius: 25,
        padding: 20
    }
})