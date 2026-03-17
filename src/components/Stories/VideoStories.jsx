import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Heart, MessageCircle, Share2, Volume2, VolumeX, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import storiesData from "../../data/stories.json";
import savedDiscoveries from "../../data/saveddiscoveries.json";

const VideoCard = ({ video, isActive }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // When active state changes, play/pause accordingly
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset for short reel loop feel
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Find discovery data if title matches approximately to show discovery integration
  const relatedDiscovery = savedDiscoveries.find(
    d => d.identified_item.toLowerCase().includes(video.title.toLowerCase()) || 
         video.title.toLowerCase().includes(d.identified_item.toLowerCase())
  );

  return (
    <div className="relative w-full h-full snap-start snap-always bg-black flex items-center justify-center pt-20 pb-20 md:pb-0 md:pt-0">
      <div 
        className="relative w-full max-w-md h-full md:h-[90vh] md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer" 
        onClick={togglePlay}
      >
        {/* Placeholder for video since we only have image paths in JSON currently. 
            Using img for now if the path is an image, or a black div.
            Ideally this would be a <video> tag. The prompt mentions videos, but the JSON only has "media_url: '/storiesimg/s4.png'".
            So we'll use an image or mock video component that looks like it plays. */}
        {video.media_url.endsWith('.mp4') ? (
            <video
              ref={videoRef}
              src={video.media_url}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
            />
        ) : (
            <div className="w-full h-full relative">
                <img src={video.media_url} alt={video.title} className="w-full h-full object-cover" />
                {/* Simulated video overlay indicator */}
                {isActive && (
                    <motion.div 
                        initial={{ opacity: 1, scale: 1.5 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1" />
                        </div>
                    </motion.div>
                )}
            </div>
        )}

        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Mute Button */}
        <button 
          onClick={toggleMute}
          className="absolute top-6 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white z-10 hover:bg-black/60 transition"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Right Action Bar */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center">
          <button className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#e67530] transition shadow-lg">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">{video.likes_count}</span>
          </button>
          
          <button className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#e67530] transition shadow-lg">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">{video.comments_count}</span>
          </button>
          
          <button className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#e67530] transition shadow-lg">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">Share</span>
          </button>
        </div>

        {/* Bottom Left Info */}
        <div className="absolute left-4 bottom-20 right-20 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg bg-gradient-to-tr from-[#e67530] to-[#ad4146]" />
            <h3 className="text-white font-bold text-lg drop-shadow-md">CreatorUser</h3>
            <button className="ml-2 px-3 py-1 bg-transparent border border-white rounded-full text-white text-xs font-semibold hover:bg-white hover:text-black transition">
              Follow
            </button>
          </div>
          
          <p className="text-white text-sm mt-2 drop-shadow-md font-medium">{video.title}</p>
          <p className="text-white/90 text-sm line-clamp-2 drop-shadow-md">{video.description}</p>
          
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center text-white/90 text-xs font-medium bg-black/30 w-max px-2 py-1 rounded backdrop-blur-sm">
              <MapPin className="w-3 h-3 mr-1" />
              {video.location?.city || "India"}
            </div>
             {relatedDiscovery && (
                <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-[#e67530] text-xs font-bold drop-shadow-md">Verified Discovery</span>
                    <span className="text-white/80 text-xs bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        {relatedDiscovery.category}
                    </span>
                </div>
            )}
            {video.tags && (
              <div className="flex gap-2 font-medium text-blue-200 text-xs mt-1">
                {video.tags.map(tag => (
                  <span key={tag}>#{tag.replace(/\s+/g, '')}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InViewVideoCard = ({ video }) => {
  const { ref, inView } = useInView({
    threshold: 0.6, // Active when 60% of the video is in view
  });

  return (
    <div ref={ref} className="h-full w-full">
      <VideoCard video={video} isActive={inView} />
    </div>
  );
};

const VideoStories = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Both video and images can be placed here if JSON only has image fallback,
    // but the prompt asked to filter by type = "video"
    const filteredVideos = storiesData.filter(item => item.media_type === "video");
    
    // If the data is extremely small (just 1 video), duplicate it for the feed experience
    if (filteredVideos.length === 1) {
        setVideos([...filteredVideos, { ...filteredVideos[0], id: 99 }, { ...filteredVideos[0], id: 100 }]);
    } else {
        setVideos(filteredVideos);
    }
  }, []);

  return (
    <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide absolute top-0 left-0 z-0">
      {videos.map((vid) => (
        <InViewVideoCard key={vid.id} video={vid} />
      ))}
      
      {/* Hide scrollbar styles using global or inline classes since scrollbar-hide requires a plugin */}
      <style>{`
        ::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </div>
  );
};

export default VideoStories;
