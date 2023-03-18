import ClientInput, {ClientInputStore} from "./ClientInput";
import StatusTable, {StatusTableStore} from "./StatusTable";
import {useRef} from "react";
import {useFile} from "../contexts/FileContext";
import ColumnSelector, {ColumnSelectorStore} from "./ColumnSelector";
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";
import {findByParam} from "../utils/algo";

class SearcherStore {
    columnSelectorStore
    clientInputStore
    statusTableStore

    constructor(file) {
        this.columnSelectorStore = new ColumnSelectorStore(this, file?.columns);
        this.clientInputStore = new ClientInputStore(this,()  => this.onSubmit());
        this.statusTableStore = new StatusTableStore(this);
        makeAutoObservable(this)
    }

    onSubmit() {
        const paramName = this.clientInputStore.paramName;
        const paramValue = this.clientInputStore.paramValue;
        if (paramValue === "Номер заявки")
            navigate(`history/${paramValue}`);

        const data = findByParam(rows, paramName, paramValue);
        this.statusTableStore.setData(data);
    }
}

const Searcher = observer(function Searcher() {
    const {file} = useFile();
    console.log("file: " + file);
    const searcherStore = useRef(new SearcherStore(file));

    return (
        <>
            <ClientInput store={searcherStore.current.clientInputStore}/>
            <ColumnSelector store={searcherStore.current.columnSelectorStore}/>
            <StatusTable store={searcherStore.current.statusTableStore}/>
        </>
    )
})

export default Searcher;