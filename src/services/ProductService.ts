import axios, { AxiosResponse } from 'axios';
import { MinimalProduct, Product, ResponseArray } from '../types';

export function getProducts(page: number, size: number): Promise<ResponseArray<Product>> {
    return axios.get(`${process.env.REACT_APP_API}/products?page=${page}&size=${size}`).catch((error) => {
        if (!error.response) {
            // En cas d'erreur réseau (par exemple, si le serveur est éteint)
            window.location.href = '/maintenance';
        } else if (error.response.status >= 500) {
            // Si l'erreur est un problème côté serveur (codes d'erreur >= 500)
            window.location.href = '/maintenance';
        }
        throw error;
    });
}

export function getProductsbyShop(shopId: string, page: number, size: number): Promise<ResponseArray<Product>> {
    return axios.get(`${process.env.REACT_APP_API}/products?shopId=${shopId}&page=${page}&size=${size}`).catch((error) => {
        if (!error.response) {
            // En cas d'erreur réseau (par exemple, si le serveur est éteint)
            window.location.href = '/maintenance';
        } else if (error.response.status >= 500) {
            // Si l'erreur est un problème côté serveur (codes d'erreur >= 500)
            window.location.href = '/maintenance';
        }
        throw error;
    });
}

export function getProductsbyShopAndCategory(
    shopId: string,
    categoryId: number,
    page: number,
    size: number,
): Promise<ResponseArray<Product>> {
    return axios.get(
        `${process.env.REACT_APP_API}/products?shopId=${shopId}&categoryId=${categoryId}&page=${page}&size=${size}`,
    ).catch((error) => {
        if (!error.response) {
            // En cas d'erreur réseau (par exemple, si le serveur est éteint)
            window.location.href = '/maintenance';
        } else if (error.response.status >= 500) {
            // Si l'erreur est un problème côté serveur (codes d'erreur >= 500)
            window.location.href = '/maintenance';
        }
        throw error;
    });
}

export function getProduct(id: string): Promise<AxiosResponse<Product>> {
    return axios.get(`${process.env.REACT_APP_API}/products/${id}`).catch((error) => {
        if (!error.response) {
            // En cas d'erreur réseau (par exemple, si le serveur est éteint)
            window.location.href = '/maintenance';
        } else if (error.response.status >= 500) {
            // Si l'erreur est un problème côté serveur (codes d'erreur >= 500)
            window.location.href = '/maintenance';
        }
        throw error;
    });
}

export function createProduct(product: MinimalProduct): Promise<AxiosResponse<Product>> {
    return axios.post(`${process.env.REACT_APP_API}/products`, product).catch((error) => {
        if (!error.response) {
            // En cas d'erreur réseau (par exemple, si le serveur est éteint)
            window.location.href = '/maintenance';
        } else if (error.response.status >= 500) {
            // Si l'erreur est un problème côté serveur (codes d'erreur >= 500)
            window.location.href = '/maintenance';
        }
        throw error;
    });
}

export function editProduct(product: MinimalProduct): Promise<AxiosResponse<Product>> {
    return axios.put(`${process.env.REACT_APP_API}/products`, product).catch((error) => {
        if (!error.response) {
            // En cas d'erreur réseau (par exemple, si le serveur est éteint)
            window.location.href = '/maintenance';
        } else if (error.response.status >= 500) {
            // Si l'erreur est un problème côté serveur (codes d'erreur >= 500)
            window.location.href = '/maintenance';
        }
        throw error;
    });
}

export function deleteProduct(id: string): Promise<AxiosResponse<Product>> {
    return axios.delete(`${process.env.REACT_APP_API}/products/${id}`).catch((error) => {
        if (!error.response) {
            // En cas d'erreur réseau (par exemple, si le serveur est éteint)
            window.location.href = '/maintenance';
        } else if (error.response.status >= 500) {
            // Si l'erreur est un problème côté serveur (codes d'erreur >= 500)
            window.location.href = '/maintenance';
        }
        throw error;
    });
}
