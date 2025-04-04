import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layout/SideDrawer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import SubmitCommission from "./pages/SubmitCommission";


const App = () => {
    return (
        <Router>
            <SideDrawer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/submit-commission" element={<SubmitCommission />} />
                </Routes>
                <ToastContainer position="top-right" />
        </Router>
    );
};

export default App;