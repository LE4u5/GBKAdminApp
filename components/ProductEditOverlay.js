import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, Switch, StyleSheet, Alert } from 'react-native';
import { Image, Input, Button, Icon } from 'react-native-elements';
import { baseURL } from '../baseURL';
import { ProductContext } from '../ProductContext';
import { updateProduct, addProduct, addToNewList } from './ActionCreators';

export default function ProductEdit(props) {
    const [pState, pDispatch] = useContext(ProductContext);
    let product = {}
    if (props.id || (props.id === 0)) {
        product = pState.products.filter(item => item.id === props.id)[0];
    }

    const [formState, setFormState] = useState({
        formToggle: props.id ? true : (props.id === 0) ? true : false,
        disableSave: true,
        product: {
            id: props.id ? product.id : (props.id === 0) ? product.id : null,
            name: props.id ? product.name : (props.id === 0) ? product.name : '',
            description: props.id ? product.description : (props.id === 0) ? product.description : '',
            price: props.id ? product.price : (props.id === 0) ? product.price : '',
            type: props.id ? product.type : (props.id === 0) ? product.type : '',
            catagory: props.id ? product.catagory : (props.id === 0) ? product.catagory : '',
            image: props.id ? product.image : (props.id === 0) ? product.image : '',
            sold_out: props.id ? product.sold_out : (props.id === 0) ? product.sold_out : false,
            sale: props.id ? product.sale : (props.id === 0) ? product.sale : false,
            sale_price: props.id ? product.sale_price : (props.id === 0) ? product.sale_price : '',
            disable: props.id ? product.disable : (props.id === 0) ? product.disable : false,
            options: props.id ? product.options : (props.id === 0) ? product.options : [],
        }
    });

    const saveForm = () => pDispatch(updateProduct(formState.product));
    const addForm = () => pDispatch(addProduct(formState.product));

    const toggleForm = () => setFormState({ ...formState, formToggle: !formState.formToggle });
    const toggleSave = () => setFormState({ ...state, disableSave: !formState.disableSave });

    return (
        <View style={styles.container}>
            <ScrollView style={{ borderRadius: 20, }} >
                <Image
                    source={{ uri: baseURL + formState.product.image }}
                    style={styles.image}
                />
                <Input label='Name' value={formState.product.name}
                    disabled={formState.formToggle} onChangeText={text => {
                        setFormState({ ...formState, disableSave: false, product: { ...formState.product, name: text } });
                        console.log(JSON.stringify(formState.disableSave));                                     //Consol Log
                    }}
                />
                <Input label='Description' multiline style={{ fontSize: 10 }} value={formState.product.description}
                    disabled={formState.formToggle} onChangeText={text => {
                        setFormState({ ...formState, disableSave: false, product: { ...formState.product, description: text } });
                    }}
                />
                <Input label='Price' value={formState.product.price}
                    disabled={formState.formToggle} onChangeText={text => {
                        setFormState({ ...formState, disableSave: false, product: { ...formState.product, price: text } });
                    }}
                />
                <Input label='Type' value={formState.product.type}
                    disabled={formState.formToggle} onChangeText={text => {
                        setFormState({ ...formState, disableSave: false, product: { ...formState.product, type: text } });
                    }}
                />
                <Input label='Catagory' value={formState.product.catagory}
                    disabled={formState.formToggle} onChangeText={text => {
                        setFormState({ ...formState, disableSave: false, product: { ...formState.product, catagory: text } });
                    }}
                />
                <Input label='Sale Price' value={formState.product.sale_price}
                    disabled={formState.formToggle} onChangeText={text => {
                        setFormState({ ...formState, disableSave: false, product: { ...formState.product, sale_price: text } });
                    }}
                />
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Sale</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "pink" }}
                        thumbColor={formState.product.sale ? "palevioletred" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        disabled={formState.formToggle}
                        value={formState.product.sale} onValueChange={value => {
                            setFormState({ ...formState, disableSave: false, product: { ...formState.product, sale: value } });
                        }}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Sold Out</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "pink" }}
                        thumbColor={formState.product.sold_out ? "palevioletred" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        disabled={formState.formToggle}
                        value={formState.product.sold_out} onValueChange={value => {
                            setFormState({ ...formState, disableSave: false, product: { ...formState.product, sold_out: value } });
                        }}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Disabled</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "pink" }}
                        thumbColor={formState.product.disable ? "palevioletred" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        disabled={formState.formToggle}
                        value={formState.product.disable} onValueChange={value => {
                            setFormState({ ...formState, disableSave: false, product: { ...formState.product, disable: value } });
                        }}
                    />
                </View>
            </ScrollView>
            <View style={{ backgroundColor: null, width: "100%", height: 80, display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
                <Button
                    onPress={props.toggle}
                    title='Close'
                    type='outline'
                    titleStyle={{ color: 'black' }}
                    buttonStyle={{ borderColor: 'black', borderWidth: 2 }}
                    containerStyle={{ width: 100, margin: 0 }}
                />
                <Button
                    onPress={() => {
                        
                        if(pState.newProduct.includes(formState.product.name)){
                            Alert.alert('Invalid','You Already added an item with same name. Try a different product name',[{text: 'Ok', style: "cancel"}])
                        } else {
                            props.id ? saveForm() : (props.id === 0) ? saveForm() : addForm();
                            props.id ? null : (props.id === 0 ) ? null : pDispatch(addToNewList(formState.product.name));
                            props.toggle();
                        }
                        
                        console.log(pState.newProduct)                                  //Console Log
                        console.log(formState.product.name)
                    }}
                    title={props.id ? 'Save' : (props.id === 0) ? 'Save' : 'Add'}
                    type='outline'
                    titleStyle={{ color: 'black' }}
                    buttonStyle={{ borderColor: 'black', borderWidth: 2 }}
                    containerStyle={{ width: 100, margin: 0 }}
                    disabled={formState.disableSave}
                />
                <Icon
                    name='edit'
                    type='font-awesome'
                    color={formState.formToggle ? 'lightgrey' : 'black'}
                    onPress={() => toggleForm()}
                    size={32}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        marginBottom: 20
    },
    switchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 10,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    switchLabel: {
        fontSize: 16, fontWeight: '700', color: 'grey', width: 100
    }
})