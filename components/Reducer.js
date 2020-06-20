import * as ActionTypes from './ActionTypes';

export function productReducer(state, action){
    switch(action.type){
        case ActionTypes.ADD_PRODUCT: 
            action.payload.id = (state.products[state.products.length-1].id + 1)
            return {...state, isLoading: false, products: [...state.products, action.payload ], newProduct: state.newProduct ? state.newProduct.filter(item => item != action.payload.name): []}
        case ActionTypes.ADD_PRODUCTS: 
        console.log(action.payload)                                                                 //Console Log
            return {...state, isLoading: false, products: action.payload}
        case ActionTypes.DELETE_PRODUCT:
            return {...state, isLoading: false, products: state.products.filter(product => (product.id !== action.payload))}
        case ActionTypes.LOADING_PRODUCT:
            return {...state, isLoading: true}
        case ActionTypes.UPDATE_PRODUCT:
            return {...state, isLoading: false, products: state.products.map(item => {
                if(item.id === action.payload.id)
                    return action.payload;
                else
                    return item;
            })}
        case ActionTypes.ADD_TO_NEW:
            console.log(action.payload);                                                           //Console Log
            return {...state, newProduct: [...state.newProduct, action.payload]}
        default:
            return state;
    }
}