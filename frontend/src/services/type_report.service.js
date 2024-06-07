import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/type-reports/');
}

const generate = (month,year) => {
    return httpClient.get("/api/type-reports/generate",{params:{month,year}});
}

const getOrder = () => {
    return httpClient.get('/api/type-reports/ordered');
}

export default { getAll, generate, getOrder };