import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/repairs/');
}

const get = id => {
    return httpClient.get(`/api/repairs/${id}`);
}

/*
const create = (plate,reparationType) => {
    return httpClient.post("/repairs/", {params:{plate,reparationType}})
}

const updateExit = data => {
    return httpClient.put('/repairs/exit/', data);
}

const updateCollect = data => {
    return httpClient.put('/repairs/collect/', data);
}
*/

const calculate = (plate,checkinDate,checkinHour,reparationType,exitDate,exitHour,collectDate,collectHour) => {
    return httpClient.get("/api/repairs/calculate",{params:{plate,checkinDate,checkinHour,reparationType,exitDate,exitHour,collectDate,collectHour}});
}

/*
const calculateIn = () => {
    return httpClient.get("/repairs/calculateIn");
}
*/

export default { getAll, get, calculate };