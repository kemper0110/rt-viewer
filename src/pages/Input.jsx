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
    };

    return(
        <div>
            <DropZone onLoad={onLoad}/>
        </div>
    );
}