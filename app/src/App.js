import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Admin from "./pages/Admin";  // Import Admin page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/admin" element={<Admin />} />  {/* Add route for Admin */}
      </Routes>
    </Router>
  );
}

export default App;
