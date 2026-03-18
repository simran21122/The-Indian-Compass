import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, X } from "lucide-react";
import storiesData from "../../data/imageStories.json";

const ImageStories = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fisher-Yates shuffle algorithm to randomize array order
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Filter out only image stories
    const filteredImages = storiesData.filter(item => item.media_type === "image");
    
    // Shuffle the filtered images
    const randomizedImages = shuffleArray(filteredImages);
    setImages(randomizedImages);
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300"
            onClick={() => openModal(img)}
          >
            <img
              src={img.media_url}
              alt={img.title}
              className="w-full object-cover bg-gray-200"
              loading="lazy"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex justify-between items-end">
                <div className="text-white">
                  <p className="font-semibold text-lg leading-tight">{img.title}</p>
                  <p className="text-sm opacity-90 mt-1">Creator: User {img.id}</p>
                </div>
                <div className="flex gap-3 text-white">
                  <span className="flex items-center gap-1 font-medium bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <Heart className="w-4 h-4" /> {img.likes_count}
                  </span>
                  <span className="flex items-center gap-1 font-medium bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <MessageCircle className="w-4 h-4" /> {img.comments_count}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-screen Modal for selected image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm py-8 px-4"
            onClick={closeModal}
          >
            <button
              className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors z-50 backdrop-blur-md"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-full w-full flex flex-col md:flex-row bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="flex-1 bg-black flex items-center justify-center relative min-h-[40vh] md:min-h-[80vh]">
                <img
                  src={selectedImage.media_url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 bg-white p-6 flex flex-col h-auto md:max-h-[80vh] overflow-y-auto">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="w-10 h-10 bg-gradient-to-tr from-[#e67530] to-[#ad4146] rounded-full shadow-inner" />
                  <div>
                    <h3 className="font-semibold text-gray-900">CreatorName {selectedImage.id}</h3>
                    <p className="text-xs text-gray-500">{selectedImage.location?.city || "India"}</p>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-[#ad4146] mb-2">{selectedImage.title}</h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{selectedImage.description}</p>
                
                {selectedImage.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedImage.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-[#ad4146] bg-[#ad4146]/10 px-2.5 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-auto pt-4 border-t flex justify-around">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#e67530] transition">
                    <Heart className="w-6 h-6" />
                    <span className="font-medium">{selectedImage.likes_count}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#e67530] transition">
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-medium">{selectedImage.comments_count}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageStories;
