import ClientInput from "./ClientInput";
import StatusTable from "./StatusTable";
import {useState} from "react";
import {useFile} from "../contexts/FileContext";
import {Workbook} from "exceljs";


const Searcher = () => {
    const {file} = useFile();
    const [data, setData] = useState([]);
    const onClick = id => {
        const d = [];
        for(const row of file)
            if(row['Номер заявки'] == id)
                d.push(row);
        setData(d)
    };
    return (
        <>
            <ClientInput onClick={onClick}/>
            <StatusTable data={data}/>
        </>
    )
}

export default Searcher;