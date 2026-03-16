

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Topbar from "../components/header";
import bgMap from "../assets/image/bg_map1.jpg";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

// Auto close popup when a place is selected
const AutoClosePopup = ({ selectedPlace }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedPlace) map.closePopup();
  }, [selectedPlace, map]);
  return null;
};

const states = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh", "Puducherry",
  "Andaman and Nicobar Islands", "Lakshadweep", "Dadra and Nagar Haveli and Daman and Diu"
];

const types = ["All Types", "Festivals", "Cultural Places", "Temples", "Markets"];

const places = culturalPlaces;

const Map = () => {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(places);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [availableCities, setAvailableCities] = useState(["All Cities"]);

  // Update cities when state changes
  useEffect(() => {
    setSelectedPlace(null);
    if (selectedState === "All States") {
      setAvailableCities(["All Cities"]);
    } else {
      const statePlaces = places.filter(p => p.state === selectedState);
      const uniqueCities = ["All Cities", ...[...new Set(statePlaces.map(p => p.city).filter(Boolean))].sort()];
      setAvailableCities(uniqueCities);
    }
    setSelectedCity("All Cities");
  }, [selectedState]);

  // Filter places
  useEffect(() => {
    setSelectedPlace(null);
    const filtered = places.filter((place) => {
      const matchCity = selectedCity === "All Cities" || place.city === selectedCity;
      const matchType = selectedType === "All Types" || (place.type ? place.type === selectedType : true);
      const matchState = selectedState === "All States" || place.state === selectedState;
      const matchSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.city && place.city.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCity && matchType && matchState && matchSearch;
    });
    setFilteredData(filtered);
  }, [selectedState, selectedCity, selectedType, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedState("All States");
    setSelectedCity("All Cities");
    setSelectedType("All Types");
    setSelectedPlace(null);
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
      <div className="sticky top-0 z-50">
        <Topbar />
      </div>

      <motion.div
        className="flex-1 container mx-auto px-4 md:px-8 pt-20 py-8 pb-20 md:pb-0"
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
              Explore states, cities, festivals, and cultural places.
            </motion.p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-3 mb-5 bg-white/70 backdrop-blur-md rounded-xl p-3 items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Search input with icon and count badge */}
            <div className="relative flex-[2] min-w-[200px]">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                style={{ width: 16, height: 16 }}
                viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search places, cities, states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-gray-600 rounded-xl py-2 pl-9 pr-24 outline-none transition"
                style={{ border: "1.5px solid #f97316", fontSize: 14 }}
              />
              {(searchQuery || selectedState !== "All States" || selectedCity !== "All Cities") && (
                <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fdba74", fontSize: 11 }}
                >
                  {filteredData.length} places
                </span>
              )}
              {!searchQuery && selectedState === "All States" && selectedCity === "All Cities" && (
                <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fdba74", fontSize: 11 }}
                >
                  {places.length} places
                </span>
              )}
            </div>

            {/* State dropdown with home icon */}
            <div className="relative flex-1 min-w-[120px]">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 13, height: 13 }}
                viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full text-gray-600 rounded-xl py-2 outline-none transition cursor-pointer"
                style={{ border: "1.5px solid #e5e7eb", fontSize: 13, paddingLeft: 26, paddingRight: 8, appearance: "none", background: "white" }}
              >
                {states.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* City dropdown with pin icon */}
            <div className="relative flex-1 min-w-[120px]">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 13, height: 13 }}
                viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-gray-600 rounded-xl py-2 outline-none transition cursor-pointer"
                style={{ border: "1.5px solid #e5e7eb", fontSize: 13, paddingLeft: 26, paddingRight: 8, appearance: "none", background: "white" }}
              >
                {availableCities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Type dropdown with filter icon */}
            <div className="relative flex-1 min-w-[100px]">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 13, height: 13 }}
                viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-gray-600 rounded-xl py-2 outline-none transition cursor-pointer"
                style={{ border: "1.5px solid #e5e7eb", fontSize: 13, paddingLeft: 26, paddingRight: 8, appearance: "none", background: "white" }}
              >
                {types.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Reset button */}
            <motion.button
              onClick={resetFilters}
              className="bg-red-500 text-white rounded-xl px-4 py-2 hover:bg-red-600 transition font-medium"
              style={{ fontSize: 14 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
          </motion.div>

          {/* Map + Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <motion.div
              className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg h-[500px] overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
              >
                <AutoClosePopup selectedPlace={selectedPlace} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                />
                {filteredData.map((place, idx) => (
                  <Marker
                    key={idx}
                    position={[place.lat, place.lng]}
                    icon={saffronMarker}
                  >
                    <Popup>
                      <div style={{ minWidth: 200, background: 'rgba(255,255,255,0.35)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', backdropFilter: 'blur(8px)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.25)', padding: 12, color: '#222' }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{place.name}</div>
                        <img
                          src={place.thumbnail}
                          alt={place.name}
                          referrerPolicy="no-referrer"
                          style={{ width: '100%', maxWidth: 90, height: 60, objectFit: 'cover', borderRadius: 8, margin: '6px 0' }}
                          loading="lazy"
                        />
                        <div style={{ fontSize: 13, marginBottom: 4 }}>{place.description}</div>
                        {place.city && (
                          <div style={{ fontSize: 12, color: '#ad4146', fontWeight: 600 }}>
                            {place.city}, {place.state}
                          </div>
                        )}
                        <button
                          style={{ marginTop: 8, background: 'rgba(255, 193, 7, 0.85)', color: '#222', border: 'none', borderRadius: 8, padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}
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

            <motion.div
              className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-4 md:p-6 overflow-y-auto h-[500px] relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              {selectedPlace ? (
                <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)', padding: 18, position: 'relative', minHeight: 340 }}>
                  <button
                    onClick={() => setSelectedPlace(null)}
                    style={{ position: 'absolute', top: 10, right: 10, background: '#eee', border: 'none', borderRadius: 8, padding: '2px 10px', fontWeight: 700, cursor: 'pointer', color: '#ad4146', fontSize: 18 }}
                  >
                    ×
                  </button>
                  <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 12 }}>
                    <img
                      src={selectedPlace.thumbnail}
                      alt={selectedPlace.name}
                      referrerPolicy="no-referrer"
                      style={{ width: '100%', maxWidth: 100, height: 70, objectFit: 'cover', borderRadius: 10, background: '#eee' }}
                      loading="lazy"
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 22, color: '#ad4146' }}>{selectedPlace.name}</div>
                      <div style={{ fontSize: 15, color: '#555', fontWeight: 600 }}>{selectedPlace.city}, {selectedPlace.state}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 12, color: '#222' }}>{selectedPlace.description}</div>
                  {selectedPlace.details && Object.entries(selectedPlace.details).map(([key, value]) => (
                    <div key={key} style={{ fontSize: 14, marginBottom: 8, color: '#222' }}>
                      <strong style={{ textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, " $1")}</strong>:{" "}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <h2 className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    {selectedState === "All States"
                      ? `All Places (${filteredData.length})`
                      : `${selectedState} (${filteredData.length})`}
                  </h2>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <motion.p
                        key={index}
                        className="mb-2 text-gray-700 cursor-pointer hover:text-orange-600 transition"
                        onClick={() => setSelectedPlace(item)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.name} — {item.city}
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