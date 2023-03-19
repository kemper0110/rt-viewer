import {makeAutoObservable} from "mobx";

export class ColumnSelectorStore {
    selected = new Set(['Номер заявки', 'Клиент*', 'ИНН', 'Статус', 'Дата входа заявки в статус', 'Услуга'])
    filter = ""
    columns = []
    parent

    constructor(parent, columns) {
        this.columns = columns
        this.parent = parent
        makeAutoObservable(this)
    }

    setSelected(label, state = true) {
        if (state)
            this.selected.add(label)
        else
            this.selected.delete(label)
    }

    isSelected(label) {
        return this.selected.has(label)
    }

    setFilter(filter) {
        this.filter = filter
    }
}