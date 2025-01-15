import axios, { AxiosResponse } from 'axios';
import { Category, MinimalCategory, ResponseArray } from '../types';

export function getCategories(page: number, size: number): Promise<ResponseArray<Category>> {
    return axios.get(`${process.env.REACT_APP_API}/categories?page=${page}&size=${size}`).catch((error) => {
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

export function getCategory(id: string): Promise<AxiosResponse<Category>> {
    return axios.get(`${process.env.REACT_APP_API}/categories/${id}`).catch((error) => {
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

export function createCategory(category: MinimalCategory): Promise<AxiosResponse<Category>> {
    return axios.post(`${process.env.REACT_APP_API}/categories`, category).catch((error) => {
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

export function editCategory(category: MinimalCategory): Promise<AxiosResponse<Category>> {
    return axios.put(`${process.env.REACT_APP_API}/categories`, category).catch((error) => {
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

export function deleteCategory(id: string): Promise<AxiosResponse<Category>> {
    return axios.delete(`${process.env.REACT_APP_API}/categories/${id}`).catch((error) => {
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
