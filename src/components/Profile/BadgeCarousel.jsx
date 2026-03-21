import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, BookOpen, Mountain, Award, Trophy, X, Star } from "lucide-react";

const BadgeCarousel = ({ badges = [] }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Default badges if none are passed
  const defaultBadges = [
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first cultural discovery",
    },
    {
      id: 2,
      name: "Explorer",
      description: "Visited 5 different states",
    },
    {
      id: 3,
      name: "Storyteller",
      description: "Shared 10 cultural stories",
    },
  ];

  const displayBadges = badges.length ? badges.slice(0, 3) : defaultBadges;

  // Map badge names to corresponding icons and website-themed earthy gradients
  const getBadgeVisuals = (name) => {
    switch (name?.toLowerCase()) {
      case 'explorer':
        return { 
          icon: <Compass />, 
          bg: 'linear-gradient(135deg, #f97316, #ea580c)',
          description: "Awarded to those who have journeyed through 5 or more states, documenting the diverse beauty of India's landscapes."
        };
      case 'storyteller':
        return { 
          icon: <BookOpen />, 
          bg: 'linear-gradient(135deg, #e07a5f, #c15e44)',
          description: "For the keepers of culture who share the captivating stories and traditions that bind our community together."
        };
      case 'adventurer':
        return { 
          icon: <Mountain />, 
          bg: 'linear-gradient(135deg, #f59e0b, #d97706)',
          description: "For the seekers of the extraordinary, venturing off the beaten path to find India’s most hidden natural wonders."
        };
      case 'first steps':
        return { 
          icon: <Star />, 
          bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
          description: "Your epic journey with The Indian Compass has officially begun. The first of many cultural discoveries!"
        };
      default:
        return { 
          icon: <Award />, 
          bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          description: "A mark of true passion for cultural preservation and meaningful contribution to our community."
        };
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">My Badges</h3>
        <span className="text-xs text-gray-500">{displayBadges.length} Earned</span>
      </div>

      {/* Badges Row */}
      <div className="flex space-x-6 justify-start">
        {displayBadges.map((badge) => {
          const visuals = getBadgeVisuals(badge.name);
          return (
            <motion.div
              key={badge.id}
              className="relative flex flex-col items-center group cursor-pointer w-20"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedBadge({ ...badge, visuals })}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-md mb-2 border-2 border-white"
                style={{ background: visuals.bg }}
              >
                {React.cloneElement(visuals.icon, { className: "w-6 h-6 text-white" })}
              </div>

              <span className="text-sm font-medium text-gray-800 text-center leading-tight group-hover:text-orange-600 transition-colors">
                {badge.name}
              </span>
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

      {/* Badge Modal Overlay */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/10" onClick={() => setSelectedBadge(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-5 border-4 border-white ring-4 ring-orange-50"
                  style={{ background: selectedBadge.visuals.bg }}
                >
                  {React.cloneElement(selectedBadge.visuals.icon, { className: "w-12 h-12 text-white drop-shadow-md" })}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{selectedBadge.name}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {selectedBadge.visuals.description}
                </p>
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="mt-8 px-8 py-3 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
                >
                  Awesome!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BadgeCarousel;
