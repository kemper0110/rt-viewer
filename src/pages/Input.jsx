import DropZone from "../components/DropZone";
import {useFile} from "../contexts/FileContext";
import {useNavigate} from "react-router";

export default function Input() {
    const {file} = useFile();
    const navigate = useNavigate();

    const onLoad = () => {
        if (file)
            navigate("/contents");
        // else error popup
    }

    return(
        <div>
            <h1>{file ? "File loaded" : "Waiting for file"}</h1>
            <DropZone/>
            <button className="btn btn-primary" onClick={onLoad}>Load</button>
        </div>
    );
}