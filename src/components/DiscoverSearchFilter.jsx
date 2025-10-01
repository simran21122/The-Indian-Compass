import { Search } from "lucide-react";

function DiscoverSearchFilter({
  searchQuery,
  setSearchQuery,
  selectedState,
  setSelectedState,
  statesList,
}) {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search monuments, festivals, food, art..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full h-12 
                       border border-orange-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                       hover:border-orange-400 
                       outline-none
                       placeholder-gray-400 text-gray-700"
          />
        </div>

        {/* State Dropdown */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-3 border border-orange-300 rounded-lg 
                     bg-white text-gray-700 font-medium
                     focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                     hover:border-orange-400
                     outline-none"
        >
          {statesList.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DiscoverSearchFilter;
