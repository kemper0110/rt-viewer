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
            <h1>{file ? "Файл загружен" : "Ожидание файла"}</h1>
            <DropZone/>
            <button className="btn btn-primary" onClick={onLoad}>Далее</button>
        </div>
    );
}