export function handleError(error: any): never {
    if (!error.response || error.response.status >= 500) {
        // Redirige vers la page de maintenance en cas de problème réseau ou serveur
        window.location.href = '/maintenance';
    }
    throw error;
}
