import * as ActionTypes from './ActionTypes';
import {baseURL} from '../baseURL';

export const addProduct = product => ({
    type: ActionTypes.ADD_PRODUCT,
    payload: product
});

export const addProducts = products => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

export const deleteProduct = id => ({
    type: ActionTypes.DELETE_PRODUCT,
    payload: id
});

export const updateProduct = product => ({
    type: ActionTypes.UPDATE_PRODUCT,
    payload: product
});

export const loadingProduct = () => ({
    type: ActionTypes.LOADING_PRODUCT
});

export const addToNewList = (name) => ({
    type: ActionTypes.ADD_TO_NEW,
    payload: name
});

export const fetchProducts = (dispatch) => {  
    dispatch(loadingProduct);

    fetch(baseURL + 'products')
    .then(respons => respons.json())
    .then(data => dispatch(addProducts(data)))
}