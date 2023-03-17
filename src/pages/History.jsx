import {useFile} from "../contexts/FileContext";
import {useParams} from "react-router";

export default function History() {
    const searchParam = useParams();
    const file = useFile();

    console.log(file);
    console.log("Searching by " + searchParam);
    return (
        <div>A</div>
    );
}