import {useId, useState} from "react";
import {makeAutoObservable, observe} from "mobx";
import {observer} from "mobx-react-lite";
import {useSearcherStore} from "../contexts/SearcherStoreContext";

export class ClientInputStore {
    id = ""
    onSubmit
    parent
    constructor(parent, onSubmit) {
        this.onSubmit = onSubmit
        this.parent = parent
        makeAutoObservable(this)
    }
    setId(id) {
        this.id = id
    }
}

// TODO param
const ClientInput = observer(function ClientInput() {
    const numId = useId();
    const innId = useId();
    const {clientInputStore: store} = useSearcherStore();
    return (
        <>
            <input type='text' placeholder='Номер заявки' value={store.id}
                   onChange={e => store.setId(e.target.value)}/>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id={numId}/>
                <label className="form-check-label" htmlFor={numId}>
                    Номер заявки
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id={innId}/>
                <label className="form-check-label" htmlFor={innId}>
                    ИНН
                </label>
            </div>
            <button onClick={() => store.onSubmit()}>Найти</button>
        </>
    )
})


export default ClientInput