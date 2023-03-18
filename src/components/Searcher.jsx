import ClientInput, {ClientInputStore} from "./ClientInput";
import StatusTable, {StatusTableStore} from "./StatusTable";
import ColumnSelector, {ColumnSelectorStore} from "./ColumnSelector";
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";
import {SearcherContextProvider} from "../contexts/SearcherStoreContext";

const Searcher = observer(function Searcher() {
    return (
        <>
            <SearcherContextProvider>
                <ClientInput/>
                <ColumnSelector/>
                <StatusTable/>
            </SearcherContextProvider>
        </>
    )
})

export default Searcher;