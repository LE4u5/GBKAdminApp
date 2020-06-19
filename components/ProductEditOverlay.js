import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, Switch, StyleSheet } from 'react-native';
import { Image, Input, Button, Icon } from 'react-native-elements';
import { baseURL } from '../baseURL';
import { ProductContext } from '../ProductContext';
import { updateProduct } from './ActionCreators';

export default function ProductEdit(props) {
    const [pState, pDispatch] = useContext(ProductContext);
    const product = pState.products.filter(item => item.id === props.id)[0];

    const [formState, setFormState] = useState({
        formToggle: true,
        disableSave: true,
        product: {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            type: product.type,
            catagory: product.catagory,
            image: product.image,
            sold_out: product.sold_out,
            sale: product.sale,
            sale_price: product.sale_price,
            disable: product.disable,
            options: product.options
        }
    });

    const saveForm = () => pDispatch(updateProduct(formState.product));

    const toggleForm = () => setFormState({ ...formState, formToggle: !formState.formToggle });

    return (
        <View style={styles.container}>
            <ScrollView style={{ borderRadius: 20, }} >
                <Image
                    source={{ uri: baseURL + formState.product.image }}
                    style={styles.image}
                />
                <Input label='Name' value={formState.product.name}
                    disabled={formState.formToggle} onChangeText={text => setFormState({ ...formState, product: { ...formState.product, name: text } })}
                />
                <Input label='Description' multiline style={{ fontSize: 10 }} value={formState.product.description}
                    disabled={formState.formToggle} onChangeText={text => setFormState({ ...formState, product: { ...formState.product, description: text } })}
                />
                <Input label='Price' value={formState.product.price}
                    disabled={formState.formToggle} onChangeText={text => setFormState({ ...formState, product: { ...formState.product, price: text } })}
                />
                <Input label='Type' value={formState.product.type}
                    disabled={formState.formToggle} onChangeText={text => setFormState({ ...formState, product: { ...formState.product, type: text } })}
                />
                <Input label='Catagory' value={formState.product.catagory}
                    disabled={formState.formToggle} onChangeText={text => setFormState({ ...formState, product: { ...formState.product, catagory: text } })}
                />
                <Input label='Sale Price' value={formState.product.sale_price}
                    disabled={formState.formToggle} onChangeText={text => setFormState({ ...formState, product: { ...formState.product, sale_price: text } })}
                />
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Sale</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "pink" }}
                        thumbColor={formState.product.sale ? "palevioletred" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        disabled={formState.formToggle}
                        value={formState.product.sale} onValueChange={value => setFormState({ ...formState, product: { ...formState.product, sale: value } })}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Sold Out</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "pink" }}
                        thumbColor={formState.product.sold_out ? "palevioletred" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        disabled={formState.formToggle}
                        value={formState.product.sold_out} onValueChange={value => setFormState({ ...formState, product: { ...formState.product, sold_out: value } })}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Disabled</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "pink" }}
                        thumbColor={formState.product.disable ? "palevioletred" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        disabled={formState.formToggle}
                        value={formState.product.disable} onValueChange={value => setFormState({ ...formState, product: { ...formState.product, disable: value } })}
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
                    onPress={saveForm, props.toggle}
                    title='Save'
                    type='outline'
                    titleStyle={{ color: 'black' }}
                    buttonStyle={{ borderColor: 'black', borderWidth: 2 }}
                    containerStyle={{ width: 100, margin: 0 }}
                    disabled
                />
                <Icon
                    name='edit'
                    type='font-awesome'
                    color='#000'
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