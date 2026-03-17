import React, { useState } from "react";
import Header from "../components/header";
import { motion, AnimatePresence } from "framer-motion";
import { Fab, Menu, MenuItem } from "@mui/material";
import { Plus, Image as ImageIcon, Video } from "lucide-react";
import ImageStories from "../components/Stories/ImageStories";
import VideoStories from "../components/Stories/VideoStories";

const Stories = () => {
  const [activeTab, setActiveTab] = useState("images");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFabClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Switch animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${activeTab === 'videos' ? 'bg-black' : 'bg-[#f8f5f2]'}`}>
      <Header />
      
      {/* Tab Switcher - sits below Header */}
      <div className="fixed top-20 left-0 w-full z-40 px-4 py-2 flex justify-center pointer-events-none">
        <div className="bg-white/70 backdrop-blur-md p-1 pl-1 pr-1 rounded-full shadow-md flex gap-2 pointer-events-auto border border-white/40">
          <button
            onClick={() => setActiveTab("images")}
            className={`relative px-6 py-2 rounded-full font-medium transition-colors z-10 ${
              activeTab === "images" ? "text-white" : "text-gray-700 hover:text-black"
            }`}
          >
            {activeTab === "images" && (
              <motion.div
                layoutId="activeTabOverlay"
                className="absolute inset-0 bg-[#e67530] rounded-full -z-10 shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            Images
          </button>
          
          <button
            onClick={() => setActiveTab("videos")}
            className={`relative px-6 py-2 rounded-full font-medium transition-colors z-10 ${
              activeTab === "videos" ? "text-white" : "text-gray-700 hover:text-black"
            }`}
          >
            {activeTab === "videos" && (
              <motion.div
                layoutId="activeTabOverlay"
                className="absolute inset-0 bg-[#e67530] rounded-full -z-10 shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            Videos
          </button>
        </div>
      </div>

      <div className={`pt-32 pb-24 md:pb-6 relative ${activeTab === 'videos' ? 'h-screen overflow-hidden' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={activeTab === 'videos' ? 'h-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}
          >
            {activeTab === "images" ? <ImageStories /> : <VideoStories />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Action Button for Upload */}
      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50">
        <Fab 
          color="primary" 
          aria-label="add" 
          onClick={handleFabClick}
          sx={{ 
            backgroundColor: '#e67530', 
            '&:hover': { backgroundColor: '#c75a1f' } 
          }}
        >
          <Plus className="w-6 h-6 text-white" />
        </Fab>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          sx={{ mt: -2 }}
        >
          <MenuItem onClick={handleClose} className="flex gap-3 px-4 py-2">
            <ImageIcon className="w-5 h-5 text-[#e67530]" />
            <span className="font-medium text-gray-800">Upload Image</span>
          </MenuItem>
          <MenuItem onClick={handleClose} className="flex gap-3 px-4 py-2">
            <Video className="w-5 h-5 text-[#e67530]" />
            <span className="font-medium text-gray-800">Upload Video</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Stories;
