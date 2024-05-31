const getAll = () => {
    return httpClient.get('/api/type-reports/comparative-reports/list');
}

const generate = () => {
    return httpClient.get('/api/type-reports/comparative-reports/generate');
}

export default { getAll, generate};