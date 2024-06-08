import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/details/');
}

const get = id => {
    return httpClient.get(`/api/details/${id}`);
}

const getByRepairId = repairId => {
    return httpClient.get(`/api/repairs/details/list/${repairId}`);
}

const create = data => {
    return httpClient.post("/api/details/", data);
}

export default { getAll, get, getByRepairId, create };