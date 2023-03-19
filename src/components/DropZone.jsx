import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useFile} from "../contexts/FileContext";
import * as XLSX from "xlsx";
import '../ui/dropzone.css';
import {useNavigate} from "react-router";
// import Exceljs from "exceljs";

const DropZone = ({onLoad}) => {
    const navigate = useNavigate();
    const {setFile} = useFile();
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async () => {
                console.time("loading")
                const wb = XLSX.read(reader.result, {type: 'binary', cellDates: true, cellHTML: true, cellNF: false,})
                const ws = wb.Sheets[wb.SheetNames[0]]
                // , { header: 1 }
                const rows = XLSX.utils.sheet_to_json(ws, {raw: false})
                Object.keys(ws).forEach(function(s) {
                    if(ws[s].t === 'n') {
                        ws[s].z = '0';
                        ws[s].t = 's';
                    }
                });
                for(const row of rows) {
                    if(row['Клиент*'][0] === '<') {
                        const div = document.createElement('span');
                        div.innerHTML = row['Клиент*'];
                        row['Клиент*'] = div.innerText;
                        div.remove();
                    }
                }
                const sample = rows[0];
                console.log(sample);
                const columns = Object.keys(sample);
                setFile({rows, columns});
                console.timeEnd("loading");
                navigate("/contents");
            }
            reader.readAsArrayBuffer(file);
        })
    }, [onLoad, setFile])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div {...getRootProps({className: 'dropzone'})} style={{width: "100%", height: "100%"}}>
            <input  {...getInputProps() } />
            <svg width="100" height="100" viewBox="0 0 143 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M107.25 122.146H35.75C34.1047 122.146 32.7709 120.812 32.7709 119.167V23.8333C32.7709 22.188 34.1047 20.8542 35.75 20.8542H80.2808C81.0566 20.8542 81.8014 21.1566 82.3579 21.6973L109.327 47.9171C109.904 48.478 110.229 49.2485 110.229 50.0531V119.167C110.229 120.812 108.895 122.146 107.25 122.146ZM23.8334 23.8333C23.8334 17.2519 29.1686 11.9167 35.75 11.9167H80.2808C83.3833 11.9167 86.3637 13.1266 88.5879 15.2891L115.557 41.509C117.865 43.7526 119.167 46.8345 119.167 50.0531V119.167C119.167 125.748 113.832 131.083 107.25 131.083H35.75C29.1686 131.083 23.8334 125.748 23.8334 119.167V23.8333ZM95.3334 62.5625H47.6667V53.625H95.3334V62.5625ZM47.6667 81.9271H95.3334V72.9896H47.6667V81.9271ZM47.6667 101.292H95.3334V92.3541H47.6667V101.292Z" fill="black"/>
            </svg>
            <h4>Ожидание файла</h4>
            <h6>Перетащите файл формата .xlsx</h6>
        </div>
    )
};

export default DropZone;