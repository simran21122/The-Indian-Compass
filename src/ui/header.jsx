import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  Compass,
  ScanLine,
  ShoppingBag,
  User,
} from "lucide-react";
import logo from "../image/logo.png"; // logo image path

// Navigation items
const navItems = [
  { name: "Home", icon: <Home className="w-6 h-6" />, path: "/home" },
  { name: "Map", icon: <Map className="w-6 h-6" />, path: "/map" },
  { name: "AI Scanner", icon: <ScanLine className="w-6 h-6" />, path: "/AIScanner" },
  { name: "Discover", icon: <Compass className="w-6 h-6" />, path: "/discover" },
  { name: "Marketplace", icon: <ShoppingBag className="w-6 h-6" />, path: "/marketplace" },
];

const Header = ({ onProfileClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 left-0 w-full z-50">
        <div className="w-full h-13 bg-white/10 backdrop-blur-lg py-4 shadow-lg">
          <motion.div
            className="w-full flex items-center justify-between pl-20 pr-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Logo + Title (Left End) */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                alt="logo"
                className="w-12 h-12 rounded-full object-cover shadow-md bg-white/70 p-1"
              />
              <h1 className="text-2xl font-bold tracking-wide text-white px-4 py-2 rounded-2xl shadow-md backdrop-blur-md bg-gradient-to-r from-[#e67530] via-[#ad4146] to-[#e67530]">
                The Indian Compass
              </h1>
            </div>

            {/* Nav Items (Center) */}
            <nav className="flex items-center gap-4 lg:gap-6 mx-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md font-medium transition ${
                      isActive
                        ? "bg-[#e67530] text-white shadow-md"
                        : "bg-white/30 text-[#ad4146] hover:bg-[#e67530] hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Profile (Right End) */}
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#e67530] text-white text-lg transition shadow-md hover:brightness-110"
            >
              <User className="w-6 h-6" />
              <span className="hidden lg:inline font-medium">Profile</span>
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 h-15 px-[10px] bg-white/20 backdrop-blur-md shadow-lg flex items-end">
        <motion.div
          className="flex w-full items-end justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo + Title */}
          <div
            className="flex items-center gap-3 cursor-pointer relative translate-y-1/2 pl-1 sm:p-4"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12 rounded-full object-cover shadow-md bg-white/70 p-1"
            />
            <h1 className="text-lg font-bold tracking-wide text-white bg-orange-700 px-3 py-1 rounded-lg shadow-md">
              The Indian Compass
            </h1>
          </div>

          {/* Profile (mobile only) */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/profile")}
              className="relative translate-y-1/2 bg-orange-400/80 text-[#2c0d01] hover:bg-orange-600 hover:text-white rounded-2xl p-3 transition shadow-md"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </header>

      {/* Footer (mobile only, from 1st header) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full backdrop-blur-md bg-white/20 text-white shadow-lg flex justify-around items-end z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={item.name}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center relative"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md relative -translate-y-1/3 transition ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "bg-orange-400/80 text-[#2c0d01] hover:bg-orange-600 hover:text-white"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-xs text-[#2c0d01] font-medium relative -translate-y-1/2">
                {item.name}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </>
  );
};

export default Header;
