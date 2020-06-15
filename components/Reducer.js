import * as ActionTypes from './ActionTypes';

export function productReducer(state, action){
    switch(action.type){
        case ActionTypes.ADD_PRODUCT: 
            action.payload.id = (state.products[state.products.length-1].id + 1)
            return {...state, products: [...state.products, action.payload]}
        case ActionTypes.ADD_PRODUCTS: 
        console.log(action.payload)
            return {...state, products: action.payload}
        case ActionTypes.DELETE_PRODUCT:
            return {...state, products: state.products.filter(product => (product.id !== action.payload))}
        default:
            return state;
    }
}