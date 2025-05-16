import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
