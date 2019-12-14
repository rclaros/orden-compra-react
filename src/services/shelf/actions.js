import { FETCH_PRODUCTS } from './actionTypes';
import axios from 'axios';

import { productsAPI, productsRemoteAPI } from '../util';

const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  }
};

export const fetchProductsRemote = (filters, sortBy, callback) => dispatch => {
  return axios
    .get(productsAPI)
    .then(res => {
      let { products } = res.data;
      if (!!filters && filters.length > 0) {
        products = products.filter(p =>
          filters.find(f => p.availableSizes.find(size => size === f))
        );
      }

      if (!!sortBy) {
        products = products.sort(compare[sortBy]);
      }

      if (!!callback) {
        callback();
      }
      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });
      
    })
    .catch(err => {
      console.log('Could not fetch products. Try again later.');
    });
};

export const fetchProducts = (filters, sortBy, callback) => dispatch => {
  return axios
    .get(productsRemoteAPI)
    .then(res => {
      let products_data = [];
      if (res.data.total > 0) {
        res.data.data.forEach(item => {
          products_data.push({
            id: item.id,
            sku: item.id,
            title: item.title,
            description: item.description,
            availableSizes: ['X', 'L', 'XL'],
            style: item.style,
            price: item.price,
            installments: item.stock,
            currencyId: 'USD',
            currencyFormat: '$',
            isFreeShipping: true,
            image:item.image
          });
        });
      }
      let products= products_data;
      if (!!filters && filters.length > 0) {
        products = products.filter(p =>
          filters.find(f => p.availableSizes.find(size => size === f))
        );
      }

      if (!!sortBy) {
        products = products.sort(compare[sortBy]);
      }

      if (!!callback) {
        callback();
      }
      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });
      
    })
    .catch(err => {
      console.log('Could not fetch products. Try again later.');
    });
};