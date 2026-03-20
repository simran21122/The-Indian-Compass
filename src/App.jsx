import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* CONTEXT */
import { StoreProvider } from "./context/Context.jsx";

/* PAGES */
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
import Stories from "./pages/Stories.jsx";
import Assistant from "./pages/Assistant.jsx";

/* COMPONENT PAGES */
import ProductDetail from "./components/ProductDetail.jsx";
import BuyNow from "./components/BuyNow.jsx";
import ContentDetails from "./components/ContentDetails.jsx";

/* NEW PAGES */
import MyOrders from "./pages/MyOrders.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";

function App() {
  return (
    <StoreProvider>
      <Router>
        <main className="font-body text-white relative overflow-hidden">

          <Routes>

            {/* MAIN ROUTES */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/aiscanner" element={<AIScanner />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assistant" element={<Assistant />} />

            {/* PRODUCT */}
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/buynow" element={<BuyNow />} />

            {/* NEW ROUTES */}
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />

            {/* CONTENT */}
            <Route path="/content/:id" element={<ContentDetails />} />

          </Routes>

        </main>
      </Router>
    </StoreProvider>
  );
}

export default App;