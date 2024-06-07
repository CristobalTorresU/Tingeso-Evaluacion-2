import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/type-reports/comparative-reports/list');
}

const generate = (month,year) => {
    return httpClient.get("/api/type-reports/comparative-reports/generate",{params:{month,year}});
}

export default { getAll, generate};