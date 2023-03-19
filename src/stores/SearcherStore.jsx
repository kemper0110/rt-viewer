import {makeAutoObservable} from "mobx";
import {findRequests} from "../utils/algo";
import {StatusTableStore} from "./StatusTableStore";
import {ColumnSelectorStore} from "./ColumnSelectorStore";
import {ClientInputStore} from "./ClientInputStore";

export class SearcherStore {
    columnSelectorStore
    clientInputStore
    statusTableStore
    file
    constructor(file) {
        this.file = file
        this.columnSelectorStore = new ColumnSelectorStore(this, file?.columns);
        this.clientInputStore = new ClientInputStore(this, () => this.onSubmit());
        this.statusTableStore = new StatusTableStore(this);
        makeAutoObservable(this)
    }

    onSubmit() {
        console.log(this.clientInputStore.paramName)
        console.log(this.clientInputStore.paramValue)
        const data = findRequests(this.file.rows, this.clientInputStore.paramName, this.clientInputStore.paramValue);
        console.log(data);
        this.statusTableStore.setData(data);
    }
}