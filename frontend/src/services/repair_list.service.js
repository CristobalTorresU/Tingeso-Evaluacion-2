import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/repair-list/');
}

const get = id => {
    return httpClient.get(`/api/repair-list/${id}`);
}

const getNames = () => {
    return httpClient.get('/api/repair-list/names');
}

const getByName = name => {
    return httpClient.get(`/api/repair-list/by-repair/${name}`);
}

const create = data => {
    return httpClient.post("/api/repair-list/", data);
}

const update = data => {
    return httpClient.put('/api/repair-list/', data);
}

const remove = id => {
    return httpClient.delete(`/api/repair-list/${id}`);
}

export default { getAll, get, getNames, getByName, create, update, remove };