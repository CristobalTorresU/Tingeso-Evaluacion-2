import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/type-reports/');
}

const generate = () => {
    return httpClient.get('/api/type-reports/generate');
}

const getOrder = () => {
    return httpClient.get('/api/type-reports/ordered');
}

export default { getAll, generate, getOrder };