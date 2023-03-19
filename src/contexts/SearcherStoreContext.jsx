import {createContext, useContext, useRef} from "react";
import {useFile} from "./FileContext";
import {useNavigate} from "react-router";
import {SearcherStore} from "../stores/SearcherStore";


const SearcherContext = createContext(null);

export const SearcherContextProvider = ({children}) => {
    const navigate = useNavigate();
    const {file} = useFile();
    if(!file) navigate("/");
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