// discover.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Crown, Palette, Music, ChefHat, Calendar } from "lucide-react";

// UI Imports
import Topbar from "../ui/header";
import Trending from "../ui/Trending"; // Now imported
import CategoryCard from "../ui/CategoryCard";
import ContentCard from "../ui/ContentCard";
import DiscoverSearchFilter from "../ui/DiscoverSearchFilter";

// Data
import culturalData from "../data/culturalContent.json";

// Category config
const categoryData = {
  all: { icon: Filter, color: "from-gray-500 to-gray-600", label: "All Categories" },
  monument: { icon: Crown, color: "from-yellow-500 to-orange-500", label: "Monuments" },
  art: { icon: Palette, color: "from-purple-500 to-pink-500", label: "Art & Crafts" },
  music: { icon: Music, color: "from-blue-500 to-indigo-500", label: "Music & Dance" },
  cuisine: { icon: ChefHat, color: "from-green-500 to-emerald-500", label: "Cuisine" },
  festival: { icon: Calendar, color: "from-red-500 to-orange-500", label: "Festivals" },
};

const statesList = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function Discover({ activePage, setActivePage }) {
  const [culturalContent, setCulturalContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("All States");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Filtering logic
  const applyFilters = useCallback(() => {
    let filtered = [...culturalContent];

    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (selectedState !== "All States") {
      filtered = filtered.filter((item) => item.state === selectedState);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.state.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredContent(filtered);
  }, [culturalContent, activeCategory, selectedState, searchQuery]);

  useEffect(() => {
    loadCulturalContent();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadCulturalContent = async () => {
    setIsLoading(true);
    try {
      setCulturalContent(culturalData);
    } catch (error) {
      console.error("Error loading cultural content:", error);
      setCulturalContent([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#ffc586] bg-center pt-5 ">
      {/* Topbar */}
      <Topbar active={activePage} onNavigate={setActivePage} />

      {/* Page Content */}
      <div className="pt-20 px-4 bg-white/70 backdrop-blur-sm min-h-screen bg-[#ffc586]">
        {/* Trending Section */}
        <Trending />

        {/* Discover Cultural Heritage Section */}
        <div className="mt-12 rounded-2xl p-6 bg-[#ffc586]">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Discover India's Heritage
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore cultural treasures, from ancient monuments to vibrant festivals
              </p>
            </motion.div>

            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
              {Object.entries(categoryData).map(([category, data]) => (
                <CategoryCard
                  key={category}
                  category={category}
                  data={data}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  culturalContent={culturalContent}
                />
              ))}
            </div>

            {/* Search & State Filter */}
            <DiscoverSearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              statesList={statesList}
            />

            {/* Results Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === "all"
                    ? "All Cultural Content"
                    : categoryData[activeCategory]?.label}
                </h2>
                <p className="text-gray-500">{filteredContent.length} results found</p>
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl" />
                    ))}
                </div>
              ) : filteredContent.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {filteredContent.map((item, index) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        index={index}
                        categoryData={categoryData}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    No Results Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                      setSelectedState("All States");
                    }}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Section */}
        <section className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">More to Explore</h2>
          <p className="text-gray-600 mt-2">
            Explore traditional food, art, music, festivals, and hidden travel gems.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Discover;
