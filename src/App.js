import './App.css';
import {useFile} from "./contexts/FileContext";
import DropZone from "./components/DropZone";

function App() {
    const {file} = useFile();
    return (
        <div className="App">
            <h1>{file ? "file here" : "not loaded"}</h1>
            <DropZone/>
            <button className="btn btn-primary">Aboba</button>
        </div>
    );
}

export default App;
