import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Heart, MessageCircle, Share2, Volume2, VolumeX, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import videoStoriesData from "../../data/videoStories.json";
import savedDiscoveries from "../../data/saveddiscoveries.json";

// Fisher-Yates Shuffle for truly random unbiased order
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const VideoCard = React.memo(({ video, isActive }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  
  // Interactive States
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes_count || 0);
  
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(video.comments_count || 0);
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState([
    { user: "travel_guru", text: "Amazing view! Need to visit this place." },
    { user: "wanderlust_22", text: "Adding this to my bucket list 🔥" }
  ]);

  // Sync Video Playback with Scroll View (Play when active, Pause when inactive)
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      // Reset video to start when it goes out of view for consistency
      videoRef.current.currentTime = 0; 
      // Also close comments when out of view
      setShowComments(false);
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

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentOpen = (e) => {
    e.stopPropagation();
    setShowComments(true);
  };

  const handleCommentClose = (e) => {
    if (e) e.stopPropagation();
    setShowComments(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    setCommentsList([{ user: "You", text: newComment }, ...commentsList]);
    setCommentsCount(prev => prev + 1);
    setNewComment("");
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href, 
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  const relatedDiscovery = savedDiscoveries.find(
    d => d.identified_item.toLowerCase().includes(video.title.toLowerCase()) || 
         video.title.toLowerCase().includes(d.identified_item.toLowerCase())
  );

  return (
    <div className="relative w-full h-[100dvh] snap-start snap-always bg-black flex items-center justify-center pt-20 pb-20 md:pb-0 md:pt-0">
      <div 
        className="relative w-full max-w-md h-full md:h-[90vh] md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer" 
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.media_url}
          className="w-full h-full object-cover"
          loop // Internal infinite loop when the specific single video finishes
          muted={isMuted}
          playsInline // Essential for iOS autoplay
        />

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
          <button onClick={handleLike} className="flex flex-col items-center group z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md
                            ${isLiked ? 'bg-[#e67530]/20 text-[#e67530]' : 'bg-black/40 text-white group-hover:bg-[#e67530]'}`}>
              <Heart className={`w-6 h-6 transition-transform duration-300 ${isLiked ? 'fill-current scale-110' : 'scale-100'}`} />
            </div>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">{likesCount}</span>
          </button>
          
          <button onClick={handleCommentOpen} className="flex flex-col items-center group z-10">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#e67530] transition shadow-lg">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">{commentsCount}</span>
          </button>
          
          <button onClick={handleShare} className="flex flex-col items-center group z-10">
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
              <div className="flex gap-2 font-medium text-blue-200 text-xs mt-1 overflow-x-auto scrollbar-hide pointer-events-auto">
                {video.tags.map(tag => (
                  <span key={tag}>#{tag.replace(/\s+/g, '')}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comments Bottom Sheet Overlay */}
        <AnimatePresence>
          {showComments && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 h-[65%] bg-neutral-900 rounded-t-2xl z-30 flex flex-col shadow-2xl border-t border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Header */}
               <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                  <h3 className="text-white font-bold text-center flex-1">Comments ({commentsCount})</h3>
                  <button onClick={handleCommentClose} className="text-white/70 hover:text-white p-1 transition">
                     <X className="w-6 h-6" />
                  </button>
               </div>
               
               {/* Comments List */}
               <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-hide">
                  {commentsList.map((c, i) => (
                    <div key={i} className="flex gap-3">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e67530] to-[#ad4146] flex-shrink-0" />
                       <div>
                          <span className="text-white/50 text-xs font-semibold">{c.user} • just now</span>
                          <p className="text-white text-sm mt-0.5 whitespace-pre-line">{c.text}</p>
                       </div>
                    </div>
                  ))}
               </div>
               
               {/* Add Comment Input */}
               <div className="p-4 border-t border-neutral-800 bg-neutral-900">
                  <form onSubmit={handleAddComment} className="flex gap-3 relative">
                     <input 
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-neutral-800 text-white rounded-full pl-5 pr-20 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#e67530] transition"
                     />
                     <button 
                        type="submit"
                        disabled={!newComment.trim()}
                        className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#e67530] text-white rounded-full px-4 text-sm font-bold disabled:opacity-50 disabled:bg-neutral-600 transition cursor-pointer"
                     >
                       Post
                     </button>
                  </form>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
});

const InViewVideoCard = ({ video }) => {
  const { ref, inView } = useInView({
    // Card becomes active when at least 60% of it is visible
    threshold: 0.6, 
  });

  return (
    <div ref={ref} className="h-[100dvh] w-full">
      <VideoCard video={video} isActive={inView} />
    </div>
  );
};

const VideoStories = () => {
  const [videos, setVideos] = useState([]);
  const [shuffledBase, setShuffledBase] = useState([]);

  useEffect(() => {
    // 1. Read data and shuffle it ONLY once on initial mount
    const filteredVideos = videoStoriesData.filter(item => item.media_type === "video");
    const initialShuffled = shuffleArray(filteredVideos);
    setShuffledBase(initialShuffled);
    
    // 2. Set initial video stack 
    setVideos(initialShuffled);
  }, []);

  // Intersection Observer to detect the bottom of the feed for infinite appending
  const { ref: loadMoreRef, inView: isEndVisible } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 800px 0px", // Trigger slightly early before user actually reaches the bottom
  });

  // Infinite scroll logic: Append the shuffled array again to the feed seamlessly
  useEffect(() => {
    if (isEndVisible && shuffledBase.length > 0) {
      setVideos((prevVideos) => [...prevVideos, ...shuffledBase]);
    }
  }, [isEndVisible, shuffledBase]);

  return (
    <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide absolute top-0 left-0 z-0">
      {videos.map((vid, index) => (
        // Composite key ensures array additions don't break React rendering performance
        <InViewVideoCard key={`${vid.id}-${index}`} video={vid} />
      ))}
      
      {/* Sentinel Element: Triggers intersection observer to load more items at the end */}
      <div ref={loadMoreRef} className="h-10 w-full flex-shrink-0" />
      
      <style>{`
        ::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default VideoStories;
