import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/home.jsx";
import Discover from "./components/Discover.jsx";
import AIScanner from "./components/AIScanner.jsx"; 
import MarketPlace from "./components/MarketpPlace.jsx"; 
import Map from "./components/map.jsx";
import About from "./components/About.jsx";
import Profile from "./components/Profile.jsx";
import Assistant from "./components/Assistant.jsx";
import ProductDetail from "./ui/ProductDetail.jsx";
import BuyNow from "./ui/BuyNow.jsx";

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
          {/* Add this line */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/buynow" element={<BuyNow />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
