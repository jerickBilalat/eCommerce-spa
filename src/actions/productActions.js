import axios from 'axios';
import * as api from '../api';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
    FETCH_PRODUCTS_FAILED,
    FETCH_PRODUCTS_SUCCEEDED,
    FETCH_PRODUCTS_STARTED
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

function fetchProductsSucceeded(data) {
    
    return {
        type: FETCH_PRODUCTS_SUCCEEDED,
        payload: {
        products: data.articles,
        size: data.size
    },
};
}

function fetchProductsFailed(error) {
    return {
        type: FETCH_PRODUCTS_FAILED,
        payload: {
        error,
        },
    };
}

function fetchProductsStarted() {
    return {
        type: FETCH_PRODUCTS_STARTED,
    };
}

export function fetchProducts(skip, limit, filters = [], prevState = []) {
    return dispatch => {

        dispatch(fetchProductsStarted());

        api
            .fetchProducts({skip, limit, filters})
            .then(resp => {
                const data ={
                    articles: [...prevState, ...resp.data.articles],
                    size: resp.data.size
                }
                dispatch(fetchProductsSucceeded(data));
            })
            .catch(err => {
                dispatch(fetchProductsFailed(err.message));
            });
    };
}


////////////////////
// OLD CODE
//////////////////////

export function getProductDetail(id){

    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}


export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}


export function getProductsBySell(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }

}

export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function getProductsToShop(skip, limit,filters =[], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.articles
                    ];
                    return {
                        size: response.data.size,
                        articles: newState
                    }
                });

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }

}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}




////////////////////////////////////
//////        CATEGORIES
////////////////////////////////////


export function getBrands(){

    const request = axios.get(`${PRODUCT_SERVER}/brands`)
                .then(response => response.data );

    return {
        type: GET_BRANDS,
        payload: request
    }

}

export function getWoods(){
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data );

    return {
        type: GET_WOODS,
        payload: request
    }
}