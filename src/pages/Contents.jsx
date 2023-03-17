import {useFile} from "../contexts/FileContext";

export default function Contents() {
    const file = useFile();

    console.log("File: ", file);
    return (
        <div>Main</div>
    );
}