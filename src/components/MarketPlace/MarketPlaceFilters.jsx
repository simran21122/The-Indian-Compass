import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { useStore } from "../../context/Context"; // ✅ added

function MarketPlaceFilters({
  states,
  priceRanges,
  selectedState,
  setSelectedState,
  selectedPriceRange,
  setSelectedPriceRange,
  searchQuery,
  setSearchQuery,
  cart: _cart,           // ✅ ignored
  wishlist: _wishlist,   // ✅ ignored
}) {

  const navigate = useNavigate();

  // ✅ use global state
  const { cart, wishlist } = useStore();

  return (
    <div className="bg-white text-black rounded-2xl p-6 shadow-lg mb-8">
      <div className="grid gap-4 md:grid-cols-4">

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border rounded-lg text-black"
          />
        </div>

        {/* STATE */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-2.5 border rounded-lg text-black"
        >
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>

        {/* PRICE */}
        <select
          value={priceRanges.indexOf(selectedPriceRange)}
          onChange={(e) => setSelectedPriceRange(priceRanges[e.target.value])}
          className="px-4 py-2.5 border rounded-lg text-black"
        >
          {priceRanges.map((r, i) => (
            <option key={i} value={i}>
              {r.label}
            </option>
          ))}
        </select>

        {/* BUTTONS */}
        <div className="flex items-center justify-end gap-4">

          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{cart.length} items</span> {/* ✅ fixed */}
          </button>

          <button
            onClick={() => navigate("/wishlist")}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            <Heart className="w-5 h-5" />
            <span>{wishlist.length} saved</span> {/* ✅ fixed */}
          </button>

        </div>

      </div>
    </div>
  );
}

export default MarketPlaceFilters;