import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import { ListItem, Icon, Button, Overlay, Image } from 'react-native-elements';
import * as actions from './ActionCreators';
import { StyleSheet } from 'react-native';
import { baseURL } from '../baseURL';
import ProductEdit from './ProductEditOverlay';
import { ProductContext } from '../ProductContext';

export default function ProductList(props) {

    const [pState, pDispatch] = useContext(ProductContext);
    useEffect(() => actions.fetchProducts(pDispatch), []);

    const [overlayState, setOverlayState] = useState({ isVisibleOverlay: false, id: null });
    const toggleOverlay = (id) => setOverlayState({
        isVisibleOverlay: !overlayState.isVisibleOverlay,
        id: id
    });

    const deleteProduct = (item) => Alert.alert(
        'Delete',
        'Are you sure you want to delete product? This will remove item from your webpage.',
        [
            {
                text: 'Ok',
                onPress: () => pDispatch(actions.deleteProduct(item.id))
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }
        ]
    );

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
                        onPress={() => deleteProduct(item)}
                    />}
                    onLongPress={() => deleteProduct(item)}
                    badge= { item.id >= 18 ? { status: "success"}: false}
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
                ListFooterComponentStyle={{backgroundColor: 'palevioletred', height: 47}}
                
            />
            <Icon
                containerStyle={styles.addButton}
                raised
                reverse
                name='plus'
                type='font-awesome'
                color='black'
                onPress={() => pDispatch(actions.addProduct({ name: 'Ball', type: 'Toy', price: '3.99' }))}
            />
            <Overlay
                isVisible={overlayState.isVisibleOverlay}
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.overlay}>
                <ProductEdit id={overlayState.id} toggle={toggleOverlay} />
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
        height: '70%',
        borderRadius: 25,
        padding: 20
    }
})