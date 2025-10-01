// BadgeCarousel.jsx
import React from "react";
import { motion } from "framer-motion";
import { Star, Map, Users, Trophy } from "lucide-react";

const BadgeCarousel = ({ badges = [] }) => {
  // Default badges if none are passed
  const defaultBadges = [
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first cultural discovery",
      icon: "star",
    },
    {
      id: 2,
      name: "Explorer",
      description: "Visited 5 different states",
      icon: "map",
    },
    {
      id: 3,
      name: "Storyteller",
      description: "Shared 10 cultural stories",
      icon: "users",
    },
  ];

  const displayBadges = badges.length ? badges.slice(0, 3) : defaultBadges;

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">My Badges</h3>
        <span className="text-xs text-gray-500">{displayBadges.length} Earned</span>
      </div>

      {/* Badges Row */}
      <div className="flex space-x-4 justify-start">
        {displayBadges.map((badge, index) => {
          const colors = ["#F59E0B", "#3B82F6", "#8B5CF6"];
          const icons = [<Star />, <Map />, <Users />];

          return (
            <motion.div
              key={badge.id}
              className="relative flex flex-col items-center group cursor-pointer"
              whileHover={{ scale: 1.15 }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
                style={{ backgroundColor: colors[index] }}
              >
                {React.cloneElement(icons[index], { className: "w-10 h-10 text-white" })}
              </div>

              {/* Badge tooltip on hover */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-24 w-36 bg-white p-2 rounded-lg shadow-md text-center opacity-0 group-hover:opacity-100"
              >
                <h4 className="font-semibold text-sm text-gray-900">{badge.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Fallback when no badges */}
      {displayBadges.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h4 className="text-sm font-medium text-gray-500 mb-1">No Badges Yet</h4>
          <p className="text-gray-400 text-xs">Start exploring to earn your first badge!</p>
        </div>
      )}
    </div>
  );
};

export default BadgeCarousel;
