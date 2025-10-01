import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/home.jsx";
import Discover from "./pages/Discover.jsx";
import AIScanner from "./pages/AIScanner.jsx"; 
import MarketPlace from "./pages/MarketpPlace.jsx"; 
import Map from "./pages/map.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import Assistant from "./pages/Assistant.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import BuyNow from "./components/BuyNow.jsx";
import ContentDetails from "./components/ContentDetails.jsx";

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
          
          {/* Product details */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/buynow" element={<BuyNow />} />
          
          {/* Content details */}
          <Route path="/content/:id" element={<ContentDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
