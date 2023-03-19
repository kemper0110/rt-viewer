import {makeAutoObservable} from "mobx";

export class ClientInputStore {
    paramName = 'Номер заявки'
    paramValue
    onSubmit
    parent

    constructor(parent, onSubmit) {
        this.onSubmit = onSubmit
        this.parent = parent
        makeAutoObservable(this)
    }

    setParamName(paramName) {
        this.paramName = paramName;
    }

    setParamValue(paramValue) {
        this.paramValue = paramValue;
    }
}