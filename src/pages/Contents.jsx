import {useFile} from "../contexts/FileContext";
import Searcher from "../components/Searcher";

export default function Contents() {
    const file = useFile();

    console.log("File: ", file);
    return (
        <>
            <div>Main</div>
            <Searcher/>
        </>
    );
}