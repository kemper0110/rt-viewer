import React, {useContext, useEffect, useState} from "react";
import * as Excel from "exceljs";

const context = React.createContext(null);

export const FileContextProvider = ({children}) => {
    const [file, setFile] = useState(null);
    useEffect(() => {
        console.log(file)
    }, [file])
    return (
        <context.Provider value={{file, setFile}}>
            {children}
        </context.Provider>
    )
}

export const useFile = () => {
    return useContext(context)
}

