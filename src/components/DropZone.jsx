import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useFile} from "../contexts/FileContext";
import * as Excel from "exceljs";

const DropZone = () => {
    const {setFile} = useFile();
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async () => {
                console.time("loading")
                const workbook = new Excel.Workbook();
                await workbook.xlsx.load(reader.result);
                console.timeEnd("loading");
                setFile(workbook);
                // const wb = XLSX.read(reader.result, {type: 'binary'})
                // const ws = wb.Sheets[wb.SheetNames[0]]
                // setFile(XLSX.utils.sheet_to_json(ws));
                // setFile(ws);
            }
            reader.readAsArrayBuffer(file);
        })
    }, [setFile])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Перетащите файл формата xslx</p>
        </div>
    )
};

export default DropZone;