import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useFile} from "../contexts/FileContext";
import * as XLSX from "xlsx";
// import Exceljs from "exceljs";

const DropZone = () => {
    const {setFile} = useFile();
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async () => {
                console.time("loading")
                const wb = XLSX.read(reader.result, {type: 'binary'})
                const ws = wb.Sheets[wb.SheetNames[0]]
                // , { header: 1 }
                const rows = XLSX.utils.sheet_to_json(ws, {raw: false})
                const sample = rows[0];
                console.log(sample);
                const columns = Object.keys(sample);
                setFile({rows, columns});
                console.timeEnd("loading");
            }
            reader.readAsArrayBuffer(file);
        })
    }, [setFile])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Перетащите файл формата xlsx</p>
        </div>
    )
};

export default DropZone;