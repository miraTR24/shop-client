import axios, { AxiosResponse } from 'axios';
import { MinimalProduct, Product, ResponseArray } from '../types';
import {handleError} from '../utils/axiosUtils'

export function getProducts(page: number, size: number): Promise<ResponseArray<Product>> {
    return axios.get(`${process.env.REACT_APP_API}/products?page=${page}&size=${size}`).catch(handleError);
}

export function getProductsbyShop(shopId: string, page: number, size: number): Promise<ResponseArray<Product>> {
    return axios.get(`${process.env.REACT_APP_API}/products?shopId=${shopId}&page=${page}&size=${size}`).catch(handleError);
}

export function getProductsbyShopAndCategory(
    shopId: string,
    categoryId: number,
    page: number,
    size: number,
): Promise<ResponseArray<Product>> {
    return axios.get(
        `${process.env.REACT_APP_API}/products?shopId=${shopId}&categoryId=${categoryId}&page=${page}&size=${size}`,
    ).catch(handleError);
}

export function getProduct(id: string): Promise<AxiosResponse<Product>> {
    return axios.get(`${process.env.REACT_APP_API}/products/${id}`).catch(handleError);
}

export function createProduct(product: MinimalProduct): Promise<AxiosResponse<Product>> {
    // Multiplier le prix par 100 avant de créer le produit
    const updatedProduct = {
        ...product,
        price: product.price * 100
    };

    return axios
        .post(`${process.env.REACT_APP_API}/products`, updatedProduct)
        .catch(handleError);
}


export function editProduct(product: MinimalProduct): Promise<AxiosResponse<Product>> {
    const updatedProduct = {
        ...product,
        price: product.price * 100
    };
    return axios.put(`${process.env.REACT_APP_API}/products`, updatedProduct).catch(handleError);
}

export function deleteProduct(id: string): Promise<AxiosResponse<Product>> {
    return axios.delete(`${process.env.REACT_APP_API}/products/${id}`).catch(handleError);
}
