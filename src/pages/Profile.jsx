import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Topbar from "../components/header";
import ProfileHeader from "../components/Profile/ProfileHeader";
import BadgeCarousel from "../components/Profile/BadgeCarousel";
import StoriesGrid from "../components/Profile/StoriesGrid";
import SavedDiscoveries from "../components/Profile/SavedDiscoveries";
import { auth } from "../firebaseConfig"; // 🔑 import auth
import { onAuthStateChanged } from "firebase/auth";
import { User as UserIcon, Award, Image, Bookmark, X, Upload } from "lucide-react";

// ---- Tabs Implementation ----
const Tabs = ({ value, onValueChange, children }) => {
  const [active, setActive] = useState(value);
  const handleChange = (val) => {
    setActive(val);
    onValueChange(val);
  };

  const tabsList = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsList"
  );
  const tabsContent = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsContent"
  );

  return (
    <div>
      {tabsList.map((child) =>
        React.cloneElement(child, { active, onChange: handleChange })
      )}
      {tabsContent.map((child) =>
        child.props.value === active ? child : null
      )}
    </div>
  );
};

const TabsList = ({ children, active, onChange, className }) => (
  <div className={className}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { active, onChange })
    )}
  </div>
);
TabsList.displayName = "TabsList";

const TabsTrigger = ({ value, children, active, onChange, className }) => {
  const isActive = active === value;
  return (
    <button
      onClick={() => onChange(value)}
      className={`flex items-center space-x-2 px-3 py-2 w-full justify-center transition-colors duration-200
        ${isActive ? "bg-orange-100 text-orange-700 shadow-sm" : "text-gray-600 hover:text-orange-600"} 
        ${className}`}
    >
      {children}
    </button>
  );
};
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mt-6"
  >
    {children}
  </motion.div>
);
TabsContent.displayName = "TabsContent";

// ---- Main Profile Component ----
function Profile() {
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [userStories, setUserStories] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [savedDiscoveries, setSavedDiscoveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [activePage, setActivePage] = useState("profile");

  const [isAddingStory, setIsAddingStory] = useState(false);
  const [newStoryFile, setNewStoryFile] = useState(null);
  const [newStoryCaption, setNewStoryCaption] = useState("");
  const [newStoryPreviewUrl, setNewStoryPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    // 🔑 Listen for Firebase user
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "New User",
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || null,
        });

        // keep your local JSON for now
        const progressData = await import("../data/progress.json");
        const storiesData = await import("../data/stories.json");
        const badgesData = await import("../data/badges.json");
        const discoveriesData = await import("../data/discoveries.json");

        setUserProgress(progressData.default);
        setUserStories(storiesData.default);
        setUserBadges(badgesData.default);
        setSavedDiscoveries(discoveriesData.default);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddStory = () => setIsAddingStory(true);

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    if (!newStoryFile || isUploading) return;

    setIsUploading(true);
    setUploadError("");

    try {
      // simulate upload delay
      await new Promise(r => setTimeout(r, 800));

      const fileUrl = newStoryPreviewUrl || URL.createObjectURL(newStoryFile);
      const storyType = newStoryFile.type.startsWith('video') ? 'video' : 'image';

      const story = {
        id: Date.now(),
        title: newStoryCaption ? newStoryCaption.split(' ').slice(0, 3).join(' ') + "..." : "My New Story",
        description: newStoryCaption,
        media_url: fileUrl,
        media_type: storyType,
        created_date: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
        views_count: 0
      };

      setUserStories([story, ...userStories]);
      setIsAddingStory(false);
      setNewStoryFile(null);
      setNewStoryCaption("");
      setNewStoryPreviewUrl(null);
    } catch (err) {
      setUploadError("Failed to upload story.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditStory = (story) => alert("Edit story: " + story.title);
  const handleDeleteStory = (id) =>
    setUserStories((prev) => prev.filter((s) => s.id !== id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDEBD0] to-[#F6D0A9]">
      {/* Topbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Topbar active={activePage} onNavigate={setActivePage} />
      </div>

      {/* Main content */}
      <div className="pt-20 px-4 sm:px-6 pb-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <ProfileHeader
            user={user}
            userProgress={userProgress}
            onEdit={() => setActiveTab("settings")}
          />
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 bg-white rounded-2xl shadow-md p-4 sm:p-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 bg-gray-50 rounded-xl overflow-hidden shadow-sm">
              <TabsTrigger value="overview">
                <UserIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="stories">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">My Stories</span>
              </TabsTrigger>
              <TabsTrigger value="discoveries">
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Saved Discoveries</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="space-y-8">
                <BadgeCarousel badges={userBadges} />
                <div className="grid lg:grid-cols-2 gap-8">
                  <StoriesGrid
                    stories={userStories.slice(0, 6)}
                    onAddStory={handleAddStory}
                    onEditStory={handleEditStory}
                    onDeleteStory={handleDeleteStory}
                  />
                  <SavedDiscoveries discoveries={savedDiscoveries.slice(0, 6)} />
                </div>
              </div>
            </TabsContent>

            {/* Stories */}
            <TabsContent value="stories">
              <StoriesGrid
                stories={userStories}
                onAddStory={handleAddStory}
                onEditStory={handleEditStory}
                onDeleteStory={handleDeleteStory}
              />
            </TabsContent>

            {/* Discoveries */}
            <TabsContent value="discoveries">
              <SavedDiscoveries discoveries={savedDiscoveries} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Add Story Modal Overlay */}
      <AnimatePresence>
        {isAddingStory && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => { 
                  if (isUploading) return;
                  setIsAddingStory(false); 
                  setNewStoryFile(null); 
                  setNewStoryCaption(""); 
                  setNewStoryPreviewUrl(null);
                  setUploadError("");
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                disabled={isUploading}
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Story</h3>

              <form onSubmit={handleStorySubmit} className="space-y-6">
                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media</label>
                  <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer relative ${uploadError ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/webp, video/mp4, video/webm"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.size > 50 * 1024 * 1024) {
                            setUploadError("File exceeds 50MB size limit.");
                            e.target.value = null;
                            return;
                          }
                          setUploadError("");
                          setNewStoryFile(file);
                          setNewStoryPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
                      disabled={isUploading}
                      required
                    />
                    <div className="space-y-1 text-center w-full z-10">
                      {newStoryFile && newStoryPreviewUrl ? (
                        <div className="flex flex-col items-center justify-center pointer-events-none p-2">
                          {newStoryFile.type.startsWith('video') ? (
                            <video src={newStoryPreviewUrl} className="max-h-36 object-contain rounded-lg mb-2 shadow-md w-full" autoPlay muted loop playsInline />
                          ) : (
                            <img src={newStoryPreviewUrl} alt="Preview" className="max-h-36 object-contain rounded-lg mb-2 shadow-md" />
                          )}
                          <span className="text-xs text-gray-600 bg-white/90 px-3 py-1 rounded-full shadow-sm pointer-events-auto mt-1 cursor-pointer hover:bg-white inline-block">
                            Click or drag to replace
                          </span>
                        </div>
                      ) : (
                        <>
                          <Upload className={`mx-auto h-12 w-12 ${uploadError ? 'text-red-400' : 'text-gray-400'}`} />
                          <div className="flex text-sm text-gray-600 justify-center mt-2">
                            <span className="relative cursor-pointer rounded-md bg-transparent font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, MP4 up to 50MB</p>
                        </>
                      )}
                    </div>
                  </div>
                  {uploadError && <p className="mt-2 text-sm text-red-600 max-w-sm text-center mx-auto">{uploadError}</p>}
                </div>

                {/* Caption Area */}
                <div>
                  <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <textarea
                    id="caption"
                    rows={4}
                    value={newStoryCaption}
                    onChange={(e) => setNewStoryCaption(e.target.value)}
                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-xl p-3 bg-gray-50 text-gray-900 border"
                    placeholder="Write a caption for your story..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!newStoryFile || !newStoryCaption.trim() || isUploading}
                  className="w-full flex justify-center items-center py-3 px-4 outline-none border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed transition-all"
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                      Uploading Story...
                    </>
                  ) : (
                    "Post Story"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;
