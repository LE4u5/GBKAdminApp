import React, { useContext } from 'react';
import { ScrollView, View, Text, Switch } from 'react-native';
import { Image, Input, Button } from 'react-native-elements';
import { baseURL } from '../baseURL';
import { ProductContext } from '../ProductContext';

export default function ProductEdit(props) {
    const [pState, pDispatch] = useContext(ProductContext);
    const product = pState.products.filter(item => item.id === props.id)[0];
    console.log(product);

    return (
        <View style={{height: '100%', borderRadius: 20, overflow:'hidden'}}>
            <ScrollView style={{borderRadius: 20,}} >
                <Image
                    source={{ uri: baseURL + product.image }}
                    style={{ width: '100%', height: 200, borderRadius: 20, marginBottom: 20 }}
                />
                <Input label='Name' value={product.name}
                    disabled
                />
                <Input label='Description' multiline style={{ fontSize: 10 }} value={product.description}
                    disabled numberOfLines={6}
                />
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'pink', justifyContent: 'space-between' }}>
                    <Text>Sold Out</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={product.sold_out ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        disabled
                        value={product.sold_out}
                    />
                </View>
            </ScrollView>
            <Button
                onPress={props.toggle}
                title='Close'
                type='outline'
                containerStyle={{ width: 100, margin: 20 }}
            />
        </View>
    );
}