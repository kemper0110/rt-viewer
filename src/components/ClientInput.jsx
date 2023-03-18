import {useId, useState} from "react";
import {makeAutoObservable, observe} from "mobx";
import {observer} from "mobx-react-lite";

export class ClientInputStore {
    id
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

const ClientInput = observer(function ClientInput({store}) {
    return (
        <>
            <input type='text' placeholder='Номер заявки' value={store.id}
                   onChange={e => store.setId(e.target.value)}/>
            <button onClick={() => store.onSubmit()}>Найти</button>
        </>
    )
})


export default ClientInput