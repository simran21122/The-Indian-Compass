import React from "react";
import { Search, ShoppingCart, Heart } from "lucide-react";

const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedState,
  setSelectedState,
  selectedPriceRange,
  setSelectedPriceRange,
  wishlist,
  cart,
  states,
  priceRanges,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md mb-10 border border-gray-200">
      <div className="grid gap-4 md:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400"
          />
        </div>

        {/* State Filter */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none"
        >
          {states.map((s) => (
            <option key={s} value={s} className="bg-white text-gray-800">
              {s}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <select
          value={priceRanges.indexOf(selectedPriceRange)}
          onChange={(e) => setSelectedPriceRange(priceRanges[e.target.value])}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none"
        >
          {priceRanges.map((range, i) => (
            <option key={i} value={i} className="bg-white text-gray-800">
              {range.label}
            </option>
          ))}
        </select>

        {/* Wishlist + Cart Summary */}
        <div className="flex items-center justify-between md:justify-around">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{cart.size} items</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">{wishlist.size} saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
