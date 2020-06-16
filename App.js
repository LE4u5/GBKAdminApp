import 'react-native-gesture-handler';
import React from 'react';
import Main from './components/Main';
import { ProductProvider } from './ProductContext';



export default function App() {
  return (
    <ProductProvider>
      <Main />
    </ProductProvider>
  );
}

