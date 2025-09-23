import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Topbar from "../ui/header";
import bgMap from "../image/bg_map1.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import culturalPlaces from "../data/culturalPlaces";
import saffronMarker from "../utils/saffronMarker";

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

// Use the new culturalPlaces data
const places = culturalPlaces;

const Map = () => {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(places);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    let filtered = places.filter((place) => {
      const matchCity =
        selectedCity === "All Cities" || place.city === selectedCity;
      const matchType =
        selectedType === "All Types" || (place.type ? place.type === selectedType : true);
      const matchState =
        selectedState === "All States" || place.state === selectedState;
      const matchSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.city && place.city.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCity && matchType && matchState && matchSearch;
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

    console.log('Filtered Data:', filtered);
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
      className=" min-h-screen flex flex-col pt-5 pl-2 pr-2"
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
        className=" flex-1 container mx-auto px-4 md:px-8 pt-20 py-8 pb-20 md:pb-0"
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
                  <Marker key={idx} position={[place.lat, place.lng]} icon={saffronMarker}
                    eventHandlers={{
                      click: () => setSelectedPlace(place)
                    }}
                  >
                    <Popup>
                      <div
                        style={{
                          minWidth: 200,
                          background: 'rgba(255,255,255,0.35)',
                          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          borderRadius: 16,
                          border: '1px solid rgba(255,255,255,0.25)',
                          padding: 12,
                          color: '#222',
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{place.name}</div>
                        <img
                          src={place.thumbnail}
                          alt={place.name}
                          style={{ width: '100%', maxWidth: 90, height: 60, objectFit: 'cover', borderRadius: 8, margin: '6px 0' }}
                          loading="lazy"
                          srcSet={`${place.thumbnail} 1x, ${place.thumbnail.replace('200px-', '400px-')} 2x`}
                        />
                        <div style={{ fontSize: 13, marginBottom: 4 }}>{place.description}</div>
                        {place.city && (
                          <div style={{ fontSize: 12, color: '#ad4146', fontWeight: 600 }}>
                            {place.city}, {place.state}
                          </div>
                        )}
                        <button
                          style={{
                            marginTop: 8,
                            background: 'rgba(255, 193, 7, 0.85)',
                            color: '#222',
                            border: 'none',
                            borderRadius: 8,
                            padding: '4px 12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px 0 rgba(31,38,135,0.08)'
                          }}
                          onClick={() => setSelectedPlace(place)}
                        >
                          More Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>

          {/* Details / Expanded Card */}
<motion.div
  className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-4 md:p-6 overflow-y-auto h-[500px] relative"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1, delay: 0.2 }}
  whileHover={{ scale: 1.01 }}
>
  {selectedPlace ? (
    <div
      style={{
        background: 'rgba(255,255,255,0.7)',
        borderRadius: 18,
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)',
        padding: 18,
        position: 'relative',
        minHeight: 340,
      }}
    >
      <button
        onClick={() => setSelectedPlace(null)}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: '#eee',
          border: 'none',
          borderRadius: 8,
          padding: '2px 10px',
          fontWeight: 700,
          cursor: 'pointer',
          color: '#ad4146',
          fontSize: 18
        }}
      >
        ×
      </button>

      {/* Header Section */}
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 12 }}>
        <img
          src={selectedPlace.thumbnail}
          alt={selectedPlace.name}
          style={{
            width: '100%',
            maxWidth: 100,
            height: 70,
            objectFit: 'cover',
            borderRadius: 10,
            background: '#eee'
          }}
          loading="lazy"
          onError={e => {
            e.target.onerror = null;
            e.target.src =
              'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
          }}
        />
        <div>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#ad4146' }}>
            {selectedPlace.name}
          </div>
          <div style={{ fontSize: 15, color: '#555', fontWeight: 600 }}>
            {selectedPlace.city}, {selectedPlace.state}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ fontSize: 15, marginBottom: 12, color: '#222' }}>
        {selectedPlace.description}
      </div>

      {/* Dynamic Details Rendering */}
      {selectedPlace.details && (
        <div style={{ fontSize: 14, color: '#222', lineHeight: 1.6 }}>
          {Object.entries(selectedPlace.details).map(([key, value]) => (
            <div key={key} style={{ marginBottom: 8 }}>
              <strong style={{ textTransform: "capitalize" }}>
                {key.replace(/([A-Z])/g, " $1")}
              </strong>
              : {Array.isArray(value) ? value.join(", ") : value}
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <>
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
            {item.name} — {item.type || item.city}
          </motion.p>
        ))
      ) : (
        <p className="text-gray-500">No matching results</p>
      )}
    </>
  )}
</motion.div>

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Map;
