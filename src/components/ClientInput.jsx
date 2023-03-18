import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";
import {useSearcherStore} from "../contexts/SearcherStoreContext";
import SearchParamList from "./SearchParamList";

export class ClientInputStore {
    paramName
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

// TODO param
const ClientInput = observer(function ClientInput() {
    const {clientInputStore: store} = useSearcherStore();
    return (
        <>
            <input type='text' placeholder={store.paramName} value={store.id}
                   onChange={e => store.setParamValue(e.target.value)}/>
            <SearchParamList onChoice={param => store.setParamName(param)}/>
            <button onClick={() => store.onSubmit()}>Найти</button>
        </>
    )
})


export default ClientInput