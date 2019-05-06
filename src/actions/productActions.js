import axios from 'axios';
import * as api from '../api';
import {
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
    FETCH_PRODUCTS_FAILED,
    FETCH_PRODUCTS_SUCCEEDED,
    FETCH_PRODUCTS_STARTED
} from './types';

import { API_SERVER_BASE_URL } from '../constants';

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

export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}

export function getProductDetail(id){

    const request = axios.get(`${API_SERVER_BASE_URL}/api/product/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}