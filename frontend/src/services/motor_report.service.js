import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/motorreports/');
}

const generate = () => {
    return httpClient.get('/api/motorreports/generate');
}

const getOrder = () => {
    return httpClient.get('/api/motorreports/ordered');
}

export default { getAll, generate, getOrder };