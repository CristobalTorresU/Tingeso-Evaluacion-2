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
    return httpClient.get("/api/repairs/calculate-checkin", {params:{plate,checkinDate,checkinHour,repair}})
}

const calculateExit = (id, exitDate, exitHour) => {
    return httpClient.put(`/api/repairs/calculate-exit/${id}`, null, {params:{exitDate: exitDate, exitHour: exitHour}});
}

const calculateCollect = (id, collectDate, collectHour) => {
    return httpClient.put(`/api/repairs/calculate-collect/${id}`, null, {params:{collectDate: collectDate, collectHour: collectHour}});
}

const getVehicle = plate => {
    return httpClient.get(`/api/repairs/vehicles/${plate}`);
}

const remove = id => {
    return httpClient.delete(`/api/repairs/${id}`);
}

export default { getAll, get, calculate, calculateCheckin, calculateExit, calculateCollect, getVehicle, remove };