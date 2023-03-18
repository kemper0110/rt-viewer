
// Ищет заявки, в которых не было изменений статуса более N дней
export function getUnchangedRequests(rows, N) {
    const ids_last_req = new Map();
    for(const row of rows) {
        const id = row['Номер заявки']

    }
}


export function findByRequest(rows, request) {
    const d = [];
    for(const row of rows)
        if(row['Номер заявки'] == request)
            d.push(row);
    return d;
}