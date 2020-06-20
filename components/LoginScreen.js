import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

export default function LoginScreen(props) {

    const [state, setState] = useState({
        loginValue: false,
        un: '',
        pass: ''
    })

    const validateUser = (user,pass) => {

        const valid = ((user=='admin') && (pass === 'admin')) ? true : false;
        if(valid)
            setState({ ...state, loginValue: true });
        else
            setState({ ...state, loginValue: false });
    }

    const TabBody = props.children
    const loginBody = <View style={styles.loginStyle}>
        <Image style={{ resizeMode: "contain", width: "90%", }} source={require('../assets/logo.png')} />
        <Input label='Username' inputStyle={{ color: '#fff' }} labelStyle={{ color: '#000', marginBottom: 10 }} inputContainerStyle={styles.inputStyle} value={state.un} onChangeText={text => setState({...state, un: text})} ></Input>
        <Input label='Password' secureTextEntry={true} inputStyle={{ color: '#fff' }} labelStyle={{ color: '#000', marginBottom: 10 }} inputContainerStyle={styles.inputStyle} value={state.pass} onChangeText={text => setState({...state, pass: text})} ></Input>
        <Button
            raised title='Sign In'
            buttonStyle={{ backgroundColor: 'black', width: 150, borderRadius: 25 }}
            onPress={() => validateUser(state.un,state.pass)}
        />
    </View>

    const toggleLogin = () => setState({ ...state, loginValue: !state.loginValue });

    return state.loginValue ? TabBody : loginBody;
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
        borderWidth: 2,
        borderBottomWidth: 2,
        borderRadius: 20,
        borderColor: 'black',
        paddingHorizontal: 30,
        backgroundColor: null,

    }
})