import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Image, Input, Button } from 'react-native-elements';
import { baseURL } from '../baseURL';

export default function ProductEdit(props) {
    const { name, description, price, options, type, catagory, image, sold_out, sale, sale_price, disable } = props.product;
    return (
        <View>
            <Image
                source={{ uri: baseURL + image }}
                style={{ width: 100, height: 100 }}
            />
            <Input value={name}
                disabled
            />
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor: 'pink', justifyContent:'space-between'}}>
                <Text>Sold Out</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={sold_out ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    disabled
                    value={sold_out}
                />
            </View>
            <Button 
                
                title='Close'
                type='outline'
                containerStyle={{width: 100, margin: 20}}
            />
        </View>
    );
}