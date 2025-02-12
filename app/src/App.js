import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Merchandise from "./pages/Merchandise";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
