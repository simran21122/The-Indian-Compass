import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Topbar from "../ui/header";
import Scanner from "../ui/Scanner";
import Scannerbg from "../image/Scannerbg.png";


const AIScanner = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col bg-center bg-cover relative"
      style={{ backgroundImage: `url(${Scannerbg})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Topbar */}
      <Topbar />

      {/* Page Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Floating Icon Animation */}
          <motion.div
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>

          {/* Title & Subtitle */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            AI Cultural Scanner
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-lg sm:max-w-2xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Upload or capture a photo of any Indian cultural artifact and
            discover its rich history, origin, and significance.
          </motion.p>
        </motion.div>

        {/* Scanner Section */}
        <motion.div
          className="w-full max-w-md sm:max-w-2xl lg:max-w-3xl flex justify-center pb-20 md:pb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <Scanner />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default AIScanner;
