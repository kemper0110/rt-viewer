import {ColumnSelectorStore} from "../components/ColumnSelector";
import {ClientInputStore} from "../components/ClientInput";
import {StatusTableStore} from "../components/StatusTable";
import {makeAutoObservable} from "mobx";
import {findByParam, findByRequest} from "../utils/algo";
import {createContext, useContext, useRef} from "react";
import {useFile} from "./FileContext";


class SearcherStore {
    columnSelectorStore
    clientInputStore
    statusTableStore
    file
    // 50905108
    constructor(file) {
        this.file = file
        this.columnSelectorStore = new ColumnSelectorStore(this, file?.columns);
        this.clientInputStore = new ClientInputStore(this,()  => this.onSubmit());
        this.statusTableStore = new StatusTableStore(this);
        makeAutoObservable(this)
    }

    onSubmit() {
        const id = this.clientInputStore.id;
        console.log(id);
        console.log(this.file.rows);
        const name = 'Номер заявки';
        // TODO param name from clientInputStore
        const data = findByParam(this.file.rows, name, id);
        console.log(data);
        this.statusTableStore.setData(data);
    }
}

const SearcherContext = createContext(null);

export const SearcherContextProvider = ({children}) => {
    const {file} = useFile();
    const store = useRef(new SearcherStore(file));
    return (
        <SearcherContext.Provider value={store.current}>
            {children}
        </SearcherContext.Provider>
    )
}

export const useSearcherStore = () => {
    return useContext(SearcherContext);
}