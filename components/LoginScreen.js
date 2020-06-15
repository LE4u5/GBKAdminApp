import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

export default function LoginScreen(props) {

    const [state, setState] = useState({
        loginValue: false
    })
    const TabBody = props.children
    const loginBody = <View style={{
        backgroundColor: 'palevioletred', height: '100%', width: '100%', padding: 40, display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Image style={{ resizeMode: "contain", width: "90%", }} source={require('../assets/logo.png')} />
        <Text>Username</Text>
        <Input></Input>
        <Text>Password</Text>
        <Input></Input>
        <Button
            raised title='Sign In'
            buttonStyle={{ backgroundColor: 'black', width: 150, borderRadius: 25 }}
            onPress={() => toggleLogin()}
        />
    </View>
    let contentBody = loginBody;

    const toggleLogin = () => setState({...state, loginValue: !state.loginValue});
    
    if(state.loginValue)
        contentBody = TabBody;
    //useEffect(()=>{toggleLogin()},[state.loginValue] );
    return contentBody;
}

const styles = StyleSheet.create({

})