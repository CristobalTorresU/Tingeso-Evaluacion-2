import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/repairs/');
}

const get = id => {
    return httpClient.get(`/api/repairs/${id}`);
}

const calculate = (plate,checkinDate,checkinHour,repair,exitDate,exitHour,collectDate,collectHour) => {
    return httpClient.get("/api/repairs/calculate",{params:{plate,checkinDate,checkinHour,repair,exitDate,exitHour,collectDate,collectHour}});
}

const calculateCheckin = (plate,checkinDate,checkinHour,repair) => {
    return httpClient.post("/api/repairs/calculate-checkin", {params:{plate,checkinDate,checkinHour,repair}})
}

const calculateExit = data => {
    return httpClient.put('/api/repairs/calculate-exit', data);
}

const calculateCollect = data => {
    return httpClient.put('/api/repairs/calculate-collect', data);
}

const getVehicle = plate => {
    return httpClient.get(`/api/repairs/vehicles/${plate}`);
}

export default { getAll, get, calculate, calculateCheckin, calculateExit, calculateCollect, getVehicle };