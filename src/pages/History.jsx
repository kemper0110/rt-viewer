import {useFile} from "../contexts/FileContext";
import {useParams} from "react-router";

export default function History() {
    const {rt_id} = useParams();
    const file = useFile();

    console.log(file);
    console.log(`Searching by ${rt_id}`);
    return (
        <div>A</div>
    );
}