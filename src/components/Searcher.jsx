import ClientInput from "./ClientInput";
import StatusTable from "./StatusTable";
import ColumnSelector from "./ColumnSelector";
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";
import {SearcherContextProvider} from "../contexts/SearcherStoreContext";
import SearchParamList from "./SearchParamList";
import {StatusTableStore} from "../stores/StatusTableStore";
import {ColumnSelectorStore} from "../stores/ColumnSelectorStore";
import {ClientInputStore} from "../stores/ClientInputStore";

const Searcher = observer(function Searcher() {
    return (
        <>
            <SearcherContextProvider>
                <ClientInput/>
                <SearchParamList/>
                <StatusTable/>
            </SearcherContextProvider>
        </>
    )
})

export default Searcher;