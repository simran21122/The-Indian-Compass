import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Topbar from "../ui/header";
import bgMap from "../image/bg_map.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Filters
const states = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];
const districts = ["All Districts", "Jaipur", "Ahmedabad", "Kochi", "Mysuru"];
const cities = ["All Cities", "Udaipur", "Surat", "Trivandrum", "Bangalore"];
const types = ["All Types", "Festivals", "Cultural Places", "Temples", "Markets"];

// Example data
const places = [
  { name: "Jaipur", coords: [26.9124, 75.7873], type: "Cultural Places" },
  { name: "Udaipur", coords: [24.5854, 73.7125], type: "Temples" },
  { name: "Surat", coords: [21.1702, 72.8311], type: "Markets" },
  { name: "Trivandrum", coords: [8.5241, 76.9366], type: "Festivals" },
  { name: "Bangalore", coords: [12.9716, 77.5946], type: "Cultural Places" },
];

const Map = () => {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(places);

  useEffect(() => {
    let filtered = places.filter((place) => {
      const matchCity =
        selectedCity === "All Cities" || place.name === selectedCity;
      const matchType =
        selectedType === "All Types" || place.type === selectedType;
      const matchSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchType && matchSearch;
    });

    if (
      selectedState === "All States" &&
      selectedDistrict === "All Districts" &&
      selectedCity === "All Cities" &&
      selectedType === "All Types" &&
      !searchQuery
    ) {
      filtered = places;
    }

    setFilteredData(filtered);
  }, [selectedState, selectedDistrict, selectedCity, selectedType, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedState("All States");
    setSelectedDistrict("All Districts");
    setSelectedCity("All Cities");
    setSelectedType("All Types");
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col pt-5 pl-2 pr-2"
      style={{
        backgroundImage: `url(${bgMap})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-50">
        <Topbar />
      </div>

      {/* Main Section */}
      <motion.div
        className="flex-1 container mx-auto px-4 md:px-8 pt-20 py-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="bg-white/40 backdrop-blur-md rounded-2xl shadow-xl p-4 md:p-6 min-h-[75vh]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Title */}
          <motion.div
            className="text-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 pt-0"
              whileHover={{ scale: 1.05 }}
            >
              Interactive Cultural Map
            </motion.h1>
            <motion.p
              className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore states, districts, cities, festivals, and cultural places.
            </motion.p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-5 bg-white/70 backdrop-blur-md rounded-lg p-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {/* Search */}
            <motion.input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="col-span-2 border border-gray-300 text-gray-600 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-400 outline-none transition"
              whileFocus={{ scale: 1.02 }}
            />

            {/* State Filter */}
            <motion.select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="col-span-1 border border-gray-300 text-gray-600 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-400 outline-none transition"
              whileHover={{ scale: 1.03 }}
            >
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </motion.select>

            {/* District Filter */}
            <motion.select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="col-span-1 border border-gray-300 text-gray-600 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-400 outline-none transition"
              whileHover={{ scale: 1.03 }}
            >
              {districts.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </motion.select>

            {/* City Filter */}
            <motion.select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="col-span-1 border border-gray-300 text-gray-600 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-400 outline-none transition"
              whileHover={{ scale: 1.03 }}
            >
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </motion.select>

            {/* Type Filter */}
            <motion.select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="col-span-1 border border-gray-300 text-gray-600 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-400 outline-none transition"
              whileHover={{ scale: 1.03 }}
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </motion.select>

            {/* Reset Button */}
            <motion.button
              onClick={resetFilters}
              className="col-span-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
          </motion.div>

          {/* Map + Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg h-[500px] overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.01 }}
            >
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                />
                {filteredData.map((place, idx) => (
                  <Marker key={idx} position={place.coords}>
                    <Popup>
                      <strong>{place.name}</strong>
                      <br />
                      Type: {place.type}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>

            {/* Details */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-4 md:p-6 overflow-y-auto h-[500px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                Details
              </h2>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <motion.p
                    key={index}
                    className="mb-2 text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    {item.name} — {item.type}
                  </motion.p>
                ))
              ) : (
                <p className="text-gray-500">No matching results</p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Map;
