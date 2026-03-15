import React from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  MapPin,
  Clock,
  Star,
  ExternalLink,
  Image,
  Crown,
  Palette,
  Music,
  ChefHat,
  Calendar,
} from "lucide-react";

// Import your saved discoveries JSON
import savedDiscoveriesData from "../../data/saveddiscoveries.json";

const categoryIcons = {
  monument: Crown,
  art: Palette,
  music: Music,
  food: ChefHat,
  festival: Calendar,
  image: Image,
};

function SavedDiscoveries() {
  const displayDiscoveries = savedDiscoveriesData;

  const DiscoveryCard = ({ discovery, index }) => {
    const CategoryIcon = categoryIcons[discovery.category] || Image;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 flex"
      >
        {/* Left-side Square Image */}
        <div className="w-52 aspect-square flex-shrink-0">
          {discovery.image_url ? (
            <img
              src={discovery.image_url}
              alt={discovery.identified_item}
              className="w-full h-full object-cover rounded-l-3xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-l-3xl">
              <CategoryIcon className="w-10 h-10 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-gray-900 text-base truncate">
                {discovery.identified_item}
              </h4>
              <button className="text-gray-400 hover:text-gray-600">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {discovery.description}
            </p>

            <div className="flex items-center space-x-3 mb-3">
              <span className="flex items-center text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 mr-1" />
                {discovery.state_of_origin}
              </span>
              <span className="flex items-center text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full capitalize">
                <CategoryIcon className="w-4 h-4 mr-1" />
                {discovery.category}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {discovery.historical_period}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {discovery.confidence_score}%
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-400 mt-3">
              <Bookmark className="w-4 h-4 mr-1" />
              Saved {new Date(discovery.saved_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white shadow-2xl rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Saved Discoveries</h3>
        <span className="text-orange-600 text-base font-semibold">
          {displayDiscoveries.length} Saved
        </span>
      </div>

      <div className="space-y-6">
        {displayDiscoveries.length > 0 ? (
          displayDiscoveries.map((discovery, index) => (
            <DiscoveryCard
              key={discovery.id}
              discovery={discovery}
              index={index}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <Bookmark className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h4 className="text-xl font-medium text-gray-500 mb-2">
              No Saved Discoveries
            </h4>
            <p className="text-gray-400 text-base">
              Use the AI scanner to discover and save cultural items
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedDiscoveries;
