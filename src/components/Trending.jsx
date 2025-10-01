// Trending.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import trendingData from "../data/trending.json";

const Trending = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === trendingData.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[30vh] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage: `url(${trendingData[currentIndex].image})`,
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
        >
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Text Overlay */}
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {trendingData[currentIndex].title}
            </h2>
            <p className="text-sm text-gray-200">
              {trendingData[currentIndex].author} •{" "}
              {trendingData[currentIndex].location}
            </p>
            <p className="text-xs text-gray-300 mt-1">
              {trendingData[currentIndex].views} views •{" "}
              {trendingData[currentIndex].likes} likes •{" "}
              {trendingData[currentIndex].time}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Trending;
