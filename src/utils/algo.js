// Ищет заявки, в которых не было изменений статуса более N дней
export function getUnchangedRequests(rows, N) {
    const ids_last_req = new Map();
    for(const row of rows) {
        const id = row['Номер заявки']

    }
}


export function findByParam(rows, paramName, paramValue) {
    return rows.filter(row => row[paramName] === paramValue);
}