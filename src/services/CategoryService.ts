import axios, { AxiosResponse } from 'axios';
import { Category, MinimalCategory, ResponseArray } from '../types';
import {handleError} from '../utils/axiosUtils'

export function getCategories(page: number, size: number): Promise<ResponseArray<Category>> {
    return axios.get(`${process.env.REACT_APP_API}/categories?page=${page}&size=${size}`).catch(handleError);
}

export function getCategory(id: string): Promise<AxiosResponse<Category>> {
    return axios.get(`${process.env.REACT_APP_API}/categories/${id}`).catch(handleError);
}

export function createCategory(category: MinimalCategory): Promise<AxiosResponse<Category>> {
    return axios.post(`${process.env.REACT_APP_API}/categories`, category).catch(handleError);
}

export function editCategory(category: MinimalCategory): Promise<AxiosResponse<Category>> {
    return axios.put(`${process.env.REACT_APP_API}/categories`, category).catch(handleError);
}

export function deleteCategory(id: string): Promise<AxiosResponse<Category>> {
    return axios.delete(`${process.env.REACT_APP_API}/categories/${id}`).catch(handleError);
}
