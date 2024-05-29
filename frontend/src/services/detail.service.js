import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/details/');
}

const get = id => {
    return httpClient.get(`/api/details/${id}`);
}

const create = data => {
    return httpClient.post("/api/details/", data);
}

export default { getAll, get, create };