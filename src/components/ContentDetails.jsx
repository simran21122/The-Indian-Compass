"use client";

import React from "react";
import { useParams } from "react-router-dom";
import culturalContentDetails from "../data/CulturalContentDetails.json";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

const ContentDetails = () => {
  const { id } = useParams();
  const contentId = parseInt(id, 10);

  // Fetch content from culturalContentDetails.json only
  const content = culturalContentDetails.find((c) => c.id === contentId);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Content not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        <img
          src={content.image_url}
          alt={content.title}
          className="w-full h-full object-cover rounded-b-3xl shadow-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-b-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg text-center">
            {content.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-md w-full"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3"> Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {content.detailed_description || content.description}
            </p>
          </motion.div>

          {/* Significance */}
          {content.significance && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-orange-100 px-4 py-2 rounded-lg shadow-sm text-sm"
            >
              <span className="font-semibold text-orange-800">✨ Significance:</span>{" "}
              <span className="text-orange-900">{content.significance}</span>
            </motion.div>
          )}

          {/* Tags */}
          {content.tags?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm flex flex-wrap items-center gap-2"
            >
              <span className="font-semibold text-gray-800 flex items-center">
                <Tag className="w-4 h-4 mr-1 text-blue-600" /> Tags:
              </span>
              {content.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Gallery */}
          {content.additional_images?.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-3">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">📸 Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.additional_images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${content.title} extra`}
                    className="w-full h-36 object-cover rounded-lg shadow hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Explore More */}
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">🔗 Explore More</h2>
            {content.youtube_link && (
              <motion.a
                href={content.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="block bg-red-500 text-white text-center py-2 px-4 rounded-xl shadow hover:bg-red-600 transition text-lg font-semibold"
              >
                Watch on YouTube
              </motion.a>
            )}
            {content.magazine_link && (
              <motion.a
                href={content.magazine_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="block bg-purple-600 text-white text-center py-2 px-4 rounded-xl shadow hover:bg-purple-700 transition text-lg font-semibold"
              >
                Read Magazine
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
