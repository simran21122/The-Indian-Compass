import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Header from "../components/header";
import CategoryFilter from "../components/CategoryFilter";
import Filters from "../components/MarketPlaceFilters";
import ProductCard from "../components/ProductCard";

// JSON Data
import productsData from "../data/products.json";
import artistsData from "../data/artists.json";

// Categories (Heritage Inspired)
const categories = [
  { id: "all", label: "All Items" },
  { id: "paintings", label: "Paintings" },
  { id: "pottery", label: "Pottery" },
  { id: "jewelry", label: "Jewelry" },
  { id: "textiles", label: "Textiles" },
  { id: "sculptures", label: "Sculptures" },
  { id: "woodcraft", label: "Woodcraft" },
];

const states = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 - ₹15,000", min: 5000, max: 15000 },
  { label: "Above ₹15,000", min: 15000, max: Infinity }
];

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  useEffect(() => {
    setProducts(productsData);
    setArtists(artistsData);
  }, []);

  const getArtistById = (id) => artists.find((a) => a.id === id);

  const toggleWishlist = (id) => {
    const newSet = new Set(wishlist);
    wishlist.has(id) ? newSet.delete(id) : newSet.add(id);
    setWishlist(newSet);
  };

  const toggleCart = (id) => {
    const newSet = new Set(cart);
    cart.has(id) ? newSet.delete(id) : newSet.add(id);
    setCart(newSet);
  };

  const applyFilters = useCallback(() => {
    let filtered = [...products];

    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (selectedState !== "All States") {
      filtered = filtered.filter((p) => p.state === selectedState);
    }

    filtered = filtered.filter(
      (p) => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials?.some((m) => m.toLowerCase().includes(q))
      );
    }

    setFilteredProducts(filtered);
  }, [products, activeCategory, selectedState, selectedPriceRange, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div
      className="min-h-screen bg-[#f4e1c1]">

      {/* Content */}
      <div >
        {/* Header (fixed) */}
        <Header />

        {/* Added pt-24 to push content below fixed header */}
        <div className="container mx-auto px-4 pt-24 pb-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-wide">
              🇮🇳 Artisan Marketplace
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Discover <span className="text-orange-600 font-semibold">authentic Indian crafts</span> — from{" "}
              <span className="italic">Banarasi weaves</span> to{" "}
              <span className="italic">Madhubani paintings</span>, all made by skilled artisans.
            </p>
          </motion.div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Search and Filters */}
          <Filters
            states={states}
            priceRanges={priceRanges}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cart={cart}
            wishlist={wishlist}
          />

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeCategory === "all"
                  ? "All Crafts"
                  : categories.find((c) => c.id === activeCategory)?.label}
              </h2>
              <p className="text-gray-600">{filteredProducts.length} items found</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      artist={getArtistById(product.artist_id)}
                      toggleWishlist={toggleWishlist}
                      toggleCart={toggleCart}
                      wishlist={wishlist}
                      cart={cart}
                      index={idx}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  No crafts found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#b36a5e] to-[#e07a5f] text-white shadow-md hover:shadow-lg"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setSelectedState("All States");
                    setSelectedPriceRange(priceRanges[0]);
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Featured Heritage Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-red-50 to-orange-100 shadow-md text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Heritage of the Month
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              This month, we celebrate <span className="font-semibold text-red-600">Madhubani Paintings</span> from Bihar — 
              an ancient art form known for its vibrant colors and intricate folk motifs.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;