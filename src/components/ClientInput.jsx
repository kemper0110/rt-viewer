import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";
import SearchParamList from "./SearchParamList";

// Хук вместо заглушки
const useSearchParams = () => {
    return ["Номер заявки", "ИНН", "ФИО менеджера"];
}
const defaultParam = "Номер заявки";


export class ClientInputStore {
    onSubmit
    parent
    paramName
    paramValue

    constructor(parent, onSubmit) {
        this.onSubmit = onSubmit;
        this.parent = parent;
        this.paramName = defaultParam;
        makeAutoObservable(this);
    }
    setParamName(paramName) {
        this.paramName = paramName;
    }
    setParamValue(paramValue) {
        this.paramValue = paramValue;
    }
}

const ClientInput = observer(function ClientInput({store}) {
    return (
        <>
            {/* Тут, наверное, список в попап засунуть */}
            <SearchParamList params={useSearchParams()} onChoice={param => store.setParamName(param)} defaultParam={store.paramName}/>
            <input type='text' placeholder={store.paramName} value={store.paramValue}
                   onChange={e => store.setParamValue(e.target.value)}/>
            <button onClick={() => store.onSubmit()}>Найти</button>
        </>
    )
})

export default ClientInput