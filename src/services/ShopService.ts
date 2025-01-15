import { MinimalShop } from './../types/shop';
import axios, { AxiosResponse } from 'axios';
import { Shop } from '../types';
import { ResponseArray } from '../types/response';

export function getShops(page: number, size: number): Promise<ResponseArray<Shop>> {
    let retryAttempts = 0;
    const maxRetries = 5;  // Maximum de tentatives de reconnexion avant de renoncer
    const retryInterval = 5000;  // Intervalle de 5 secondes entre chaque tentative

    return new Promise<ResponseArray<Shop>>((resolve, reject) => {
        // Fonction qui fait la requête et vérifie si le serveur est disponible
        const tryRequest = () => {
            axios
                .get(`${process.env.REACT_APP_API}/shops?page=${page}&size=${size}`)
                .then(resolve)  // Si la requête réussit, on renvoie les données
                .catch((error) => {
                    if (!error.response) {
                        // Erreur de réseau, ce qui veut dire que la connexion est impossible
                        if (retryAttempts < maxRetries) {
                            
                            retryAttempts++;
                            window.location.href = '/maintenance';
                            console.log(`Tentative de reconnexion (${retryAttempts}/${maxRetries})...`);
                            setTimeout(tryRequest, retryInterval);
                        } else {
                            // Si l'API est toujours inaccessible après plusieurs tentatives, rediriger vers maintenance
                            console.error('Le serveur est toujours hors ligne après plusieurs tentatives.');
                            window.location.href = '/maintenance';
                            reject(new Error('Le serveur est hors ligne.'));
                        }
                    } else if (error.response && error.response.status >= 500) {
                        // Si le serveur retourne une erreur 500 ou supérieure (erreur serveur)
                        console.error('Erreur serveur', error.response.status);
                        if (retryAttempts < maxRetries) {
                            retryAttempts++;
                            setTimeout(tryRequest, retryInterval);
                        } else {
                            window.location.href = '/maintenance'; // Rediriger vers la page de maintenance après échec
                            reject(new Error('Erreur de serveur (500+).'));
                        }
                    } else {
                        // Si l'erreur vient de quelque chose d'autre (par exemple une mauvaise réponse du serveur), la rejeter directement
                        reject(error);
                    }
                });
        };

        // Lancer la première tentative de requête
        tryRequest();
    });
}




export function getShopsWithSearch(page: number, size: number, search: string): Promise<ResponseArray<Shop>> {
    console.log("search=>",search)
    return axios.get(`${process.env.REACT_APP_API}/shops?page=${page}&size=${size}&name=${search}`).catch((error) => {
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

export function getShopsSorted(page: number, size: number, sort: string): Promise<ResponseArray<Shop>> {
    return axios.get(`${process.env.REACT_APP_API}/shops?page=${page}&size=${size}&sortBy=${sort}`).catch((error) => {
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

export function getShopsFiltered(page: number, size: number, urlFilters: string): Promise<ResponseArray<Shop>> {
    return axios.get(`${process.env.REACT_APP_API}/shops?page=${page}&size=${size}${urlFilters}`).catch((error) => {
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

export function getShop(id: string): Promise<AxiosResponse<Shop>> {
    return axios.get(`${process.env.REACT_APP_API}/shops/${id}`).catch((error) => {
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

export function createShop(shop: MinimalShop): Promise<AxiosResponse<Shop>> {
    return axios.post(`${process.env.REACT_APP_API}/shops`, shop).catch((error) => {
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

export function editShop(shop: MinimalShop): Promise<AxiosResponse<Shop>> {
    return axios.put(`${process.env.REACT_APP_API}/shops`, shop).catch((error) => {
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

export function deleteShop(id: string): Promise<AxiosResponse<Shop>> {
    return axios.delete(`${process.env.REACT_APP_API}/shops/${id}`).catch((error) => {
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
