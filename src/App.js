import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Input from "./pages/Input";
import History from "./pages/History";
import Contents from "./pages/Contents";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Navigate replace to="/upload" />} />
                    <Route exact path="/upload" element={<Input/>}/>
                    <Route exact path="/contents" element={<Contents/>}/>
                    <Route exact path="/history/:searchParam" element={<History/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
