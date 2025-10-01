import React from "react";

const CategoryTabs = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`px-5 py-2 rounded-xl text-sm md:text-base font-medium transition 
            ${
              activeCategory === cat.id
                ? "bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
