import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Discover from "./components/Discover";
import AIScanner from "./components/Aiscanner"; 
import MarketPlace from "./components/MarketpPlace"; 
import Map from "./components/map";
import About from "./components/About";
import Profile from "./components/Profile";
import Assistant from "./components/Assistant";
import ProductDetail from "./ui/ProductDetail";

function App() {
  return (
    <Router>
      <main className="font-body text-white relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Discover" element={<Discover />} /> 
          <Route path="/AIScanner" element={<AIScanner />} />
          <Route path="/MarketPlace" element={<MarketPlace />} />
          <Route path="/map" element={<Map />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assistant" element={<Assistant />} />

          {/* ✅ Add this line */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
