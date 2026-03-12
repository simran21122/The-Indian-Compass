import React from "react";
import { motion } from "framer-motion";

function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <motion.div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
      {categories.map(cat => {
        const isActive = activeCategory === cat.id;
        return (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCategory(cat.id)}
            className={`p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-[#b36a5e] to-[#e07a5f] text-white shadow-lg' : 'bg-white hover:shadow-md border border-gray-200'}`}
          >
            <div className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>{cat.label}</div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export default CategoryFilter;
