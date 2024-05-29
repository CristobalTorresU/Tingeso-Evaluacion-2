import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/timereports/');
}

const generate = () => {
    return httpClient.get('/api/timereports/generate');
}

const getOrder = () => {
    return httpClient.get('/api/timereports/ordered');
}

const create = data => {
    return httpClient.post("/api/timereports/", data);
}

export default { getAll, generate, getOrder, create };