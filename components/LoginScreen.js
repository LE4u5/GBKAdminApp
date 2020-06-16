import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

export default function LoginScreen(props) {

    const [state, setState] = useState({
        loginValue: false
    })
    const TabBody = props.children
    const loginBody = <View style={styles.loginStyle}>
        <Image style={{ resizeMode: "contain", width: "90%", }} source={require('../assets/logo.png')} />
        <Input label='Username' inputStyle={styles.inputStyle} ></Input>
        <Input label='Password' ></Input>
        <Button
            raised title='Sign In'
            buttonStyle={{ backgroundColor: 'black', width: 150, borderRadius: 25 }}
            onPress={() => toggleLogin()}
        />
    </View>

    const toggleLogin = () => setState({...state, loginValue: !state.loginValue});
    
    return state.loginValue ? TabBody:loginBody;
}

const styles = StyleSheet.create({
    loginStyle: {
        backgroundColor: 'palevioletred', 
        height: '100%', 
        width: '100%', 
        padding: 40, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inputStyle: {
        color: 'black',
        borderBottomColor: 'black'
    }
})