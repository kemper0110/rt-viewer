import {makeAutoObservable} from "mobx";

export class StatusTableStore {
    data = []
    parent

    constructor(parent) {
        this.parent = parent
        makeAutoObservable(this)
    }

    setData(data) {
        this.data = data;
    }
}