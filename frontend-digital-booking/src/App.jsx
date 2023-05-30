import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Detail from "./Routes/Detail";
import Admin from "./Routes/Admin";
import List from "./Routes/List";
import SingIn from "./Routes/SingIn";
import SingUp from "./Routes/SingUp";

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Detail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/list" element={<List />} />
                <Route path="/sing-in" element={<SingIn />} />
                <Route path="/sing-up" element={<SingUp />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
