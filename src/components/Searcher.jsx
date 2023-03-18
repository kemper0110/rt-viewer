import ClientInput, {ClientInputStore} from "./ClientInput";
import StatusTable, {StatusTableStore} from "./StatusTable";
import {useEffect, useRef, useState} from "react";
import {useFile} from "../contexts/FileContext";
import {Workbook} from "exceljs";
import ColumnSelector, {ColumnSelectorStore} from "./ColumnSelector";
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";
import {findByRequest} from "../utils/algo";

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
        const id = this.clientInputStore.id;
        const data = findByRequest(id);
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