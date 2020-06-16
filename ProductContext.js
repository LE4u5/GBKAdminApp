import React, { useContext, useReducer, createContext } from 'react';
import * as Reducer from './components/Reducer';

export const ProductContext = createContext();

export const ProductProvider = (props) => {
    const [productsState, dispatch] = useReducer(Reducer.productReducer, {isLoading: true, products:[]});
    return (
        <ProductContext.Provider value={[productsState, dispatch]}>
            {props.children}
        </ProductContext.Provider>
    );
}