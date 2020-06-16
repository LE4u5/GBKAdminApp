import React, { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {  } from 'react-native-elements';

export default function Content(props) {

    const loadingRender = <View style={{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: "#000"
    }}>
        <ActivityIndicator size="large" color="#fff" />
    </View>;

    return loadingRender;
}