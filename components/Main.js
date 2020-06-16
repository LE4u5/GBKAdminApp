import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';
import LoginScreen from './LoginScreen';
import ProductList from './ProductList';
import Content from './Content';

const Tab = createMaterialBottomTabNavigator();


export default function Main() {
  return (
    <LoginScreen>
      <NavigationContainer>
        <Tab.Navigator barStyle={{ backgroundColor: '#000', }}>
          <Tab.Screen name='Product List'
            options={{
              tabBarLabel: 'Products',
              tabBarIcon: ({ color }) => (<Icon
                size={22}
                name='list'
                type='font-awesome'
                color='pink'
              />),
            }}
            component={ProductList} />
          <Tab.Screen name='Content'
            options={{
              tabBarLabel: 'Content',
              tabBarIcon: ({ color }) => (<Icon
                size={22}
                name='sliders'
                type='font-awesome'
                color='pink'
              />),
            }}
            component={Content} />

        </Tab.Navigator>
      </NavigationContainer>
    </LoginScreen>
  );
}
