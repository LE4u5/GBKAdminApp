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

export const fetchProducts = (dispatch) => {
    fetch(baseURL + 'products')
    .then(respons => respons.json())
    .then(data => dispatch(addProducts(data)))
}