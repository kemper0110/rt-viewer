import './App.css';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import Input from "./pages/Input";
import History from "./pages/History";
import Contents from "./pages/Contents";

function App() {
    return (
        <>
                <BrowserRouter>
                    <header>
                        <nav className="navbar">
                            <Link to={"/"}>
                                <img className="mt-3 ms-3" src="/img.png" style={{width: 120, height: 40}} alt=""/>
                            </Link>
                        </nav>
                    </header>
                    <div className="App">

                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/upload"/>}/>
                        <Route exact path="/upload" element={<Input/>}/>
                        <Route exact path="/contents" element={<Contents/>}/>
                        <Route exact path="/history/:searchParam" element={<History/>}/>
                    </Routes>
                    </div>
                </BrowserRouter>
        </>
    );
}

export default App;
