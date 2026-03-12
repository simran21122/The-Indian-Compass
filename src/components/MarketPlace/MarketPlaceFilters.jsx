import React from "react";
import { Search, ShoppingCart, Heart } from "lucide-react";

function MarketPlaceFilters({
  states,
  priceRanges,
  selectedState,
  setSelectedState,
  selectedPriceRange,
  setSelectedPriceRange,
  searchQuery,
  setSearchQuery,
  cart,
  wishlist,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
      <div className="grid gap-4 md:grid-cols-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg 
                       text-gray-700 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* State Filter */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <select
          value={priceRanges.indexOf(selectedPriceRange)}
          onChange={(e) => setSelectedPriceRange(priceRanges[e.target.value])}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          {priceRanges.map((r, i) => (
            <option key={i} value={i}>
              {r.label}
            </option>
          ))}
        </select>

        {/* Cart & Wishlist Info */}
        <div className="flex items-center justify-between md:justify-end space-x-6">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {cart.size} items
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-gray-700">
              {wishlist.size} saved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPlaceFilters;
