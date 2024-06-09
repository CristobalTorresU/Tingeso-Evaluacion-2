import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/comparative-reports/');
}

const generate = (month,year) => {
    return httpClient.get("/api/comparative-reports/generate",{params:{month,year}});
}

export default { getAll, generate};