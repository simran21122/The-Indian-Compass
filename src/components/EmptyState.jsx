import React from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const EmptyState = ({ onReset }) => {
  return (
    <motion.div
      className="text-center col-span-full py-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Icon */}
      <motion.div
        className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-tr from-red-400 to-orange-500 shadow-lg"
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Search className="w-10 h-10 text-white" />
      </motion.div>

      {/* Message */}
      <motion.p
        className="text-gray-600 text-lg md:text-xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        No products found matching your search or filters.
      </motion.p>

      {/* Clear Filters Button */}
      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        Clear Filters
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;
