import React from "react";
import { motion } from "framer-motion";
import { Pencil, Zap } from "lucide-react";

const ProfileHeader = ({ user, userProgress, onEdit }) => {
  const levelProgress = ((userProgress?.experience_points || 0) / 1000) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-r from-[#F9D071] to-[#E07A5F] px-6 sm:px-10 py-6 shadow-md rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6"
    >
      {/* Left Section: Avatar + Info */}
      <div className="flex items-center gap-6 flex-1">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-105">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500 text-white text-3xl font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-gray-900">{user?.name}</h2>
          <p className="text-gray-600 text-base">{user?.email}</p>
          {userProgress && (
            <div className="mt-3">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-orange-600">
                  Level {userProgress.level}
                </span>{" "}
                • {userProgress.total_points} pts
              </p>

              {/* Progress Bar */}
              <div className="w-full max-w-md mt-3 bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full relative"
                >
                  {levelProgress > 20 && (
                    <Zap className="w-4 h-4 text-white absolute right-1 top-1/2 -translate-y-1/2 animate-pulse" />
                  )}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Edit Button */}
      <div className="flex-shrink-0">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105"
        >
          <Pencil className="w-5 h-5" />
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
