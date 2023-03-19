// Ищет заявки, в которых не было изменений статуса более N дней
import Fuse from 'fuse.js'

export const status_states = {
    liquid: new Set(['Создание договоров', 'Отложена (нет тех. возможности)', 'Назначено тех. обследование',
        'В работе', 'Заведение заявки', 'Обработка в СУС', 'Отложена по просьбе клиента',
        'Назначение тех. данных', 'Отсутствие ТВП ШПД по запрашиваемой технологии', 'Закрытие наряда', 'Не подтверждена'
    ]),
    final: new Set(['Закрыт (нет тех. возможности)', 'Закрыт (отказ клиента)', 'Закрыт', 'Закрыт (не удалось связаться с клиентом)']),
    nonLiquid: new Set(['Удалена (ошибка ввода)', 'Удалена (абонент уже подключен)', 'Удалена (Смена ТП)', 'Удалена', 'Тест'])
}

// выбор алгоритма поиска по названию параметра
export function findRequests(rows, name, arg) {
    switch (name) {
        case 'Номер заявки':
            return findByRequest(rows, arg);
        case 'ИНН':
            return findByInn(rows, arg);
        case 'Клиент*':
            return findRequestsByName(rows, arg);
        case 'Нарушение SLA':
            return findUnchangedRequests(rows, arg === "" ? 5 : arg);
        default:
            console.log("error argument")
            return [];
    }
}

// implement searching by name
export function findRequestsByName(rows, name) {
    const fuse = new Fuse(rows, {
        keys: ['Клиент*'],
        shouldSort: true,
        ignoreLocation: true,
        threshold: 0.3
    });
    const result = fuse.search(name)
    console.log(result)
    return result.map(res => res.item)
}

export function differenceInDays(date1, date2) {
    const difftime = Math.abs(new Date(date1) - new Date(date2));
    return Math.ceil(difftime / 1000 / 60 / 60 / 24);
}
export function findUnchangedRequests(rows, N = 5) {
    const ids_latest_row = new Map();
    const current_date = new Date();
    for (const row of rows) {
        const id = row['Номер заявки']
        if (!status_states.liquid.has(row['Статус']))
            continue;
        const new_date = new Date(row['Дата входа заявки в статус']);

        if (!ids_latest_row.has(id))
            ids_latest_row.set(id, row)
        else {
            const {'Дата входа заявки в статус': latest_date} = ids_latest_row.get(id);
            if (new Date(latest_date) < new_date)
                ids_latest_row.set(id, row);
        }
    }

    const result = []
    for(const row of ids_latest_row.values()) {
        const new_date = new Date(row['Дата входа заявки в статус'])
        const difference_days = differenceInDays(new_date, current_date);
        if (difference_days >= N)
            result.push(row);
    }
    // const data = [...ids_latest_row.values()]
    return result;
}

/*
    const ids_latest_date = new Map();
    const current_date = new Date();
    for(const row of rows) {
        const id = row['Номер заявки']
        if (!status_states.liquid.has(row['Статус']))
            continue;
        const new_date = new Date(row['Дата входа заявки в статус']);
        if (current_date - new_date < N)
            continue;
        if(!ids_latest_date.has(id))
            ids_latest_date.set(id, new_date)
        else {
            const latest_date = ids_latest_date.get(id);
            if(latest_date < new_date)
                ids_latest_date.set(id, new_date);
        }
    }
 */
export function findByRequest(rows, request) {
    return findByParam(rows, 'Номер заявки', request)
}

export function findByInn(rows, inn) {
    return findByParam(rows, 'ИНН', inn)
}

export function findByParam(rows, paramName, paramValue) {
    return rows.filter(row => row[paramName] === paramValue);
}