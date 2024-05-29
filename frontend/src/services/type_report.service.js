import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/typereports/');
}

const generate = () => {
    return httpClient.get('/api/typereports/generate');
}

const getOrder = () => {
    return httpClient.get('/api/typereports/ordered');
}

export default { getAll, generate, getOrder };