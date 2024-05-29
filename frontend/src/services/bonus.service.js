import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/bonuses/');
}

const get = id => {
    return httpClient.get(`/api/bonuses/${id}`);
}

const create = data => {
    return httpClient.post("/api/bonuses/", data);
}

const update = data => {
    return httpClient.put('/api/bonuses/', data);
}

const remove = id => {
    return httpClient.delete(`/api/bonuses/${id}`);
}
export default { getAll, get, create, update, remove };