import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatbotIcon from "../ui/ChatbotIcon";
import ChatForm from "../ui/ChatForm";
import ChatMessage from "../ui/ChatMessage";
import chatBg from "../image/bg_chat_bot.jpg";
import Header from "../ui/header";
import { generateLlamaResponse } from "../utils/llamaAPI";

export const Assistant = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== ". . ."),
        { role: "model", text, isError },
      ]);
    };

    // Convert history to simple prompt for AI
    const conversationContext = history
      .map(msg => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.parts[0].text}`)
      .join("\n");

    const prompt = `You are a knowledgeable assistant specializing in Indian culture, heritage, and traditions. 
Please provide helpful and accurate information about Indian cultural topics.

Conversation so far:
${conversationContext}

Please respond as a helpful cultural assistant:`;

    try {
      const response = await generateLlamaResponse({ 
        prompt,
        preferredProvider: "gemini"
      });
      
      const cleanResponse = response
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(cleanResponse);
    } catch (error) {
      updateHistory("I'm having trouble connecting to my knowledge base. Please try again later.", true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="fixed right-5 z-50">
      {/* Floating Button */}
      <motion.span
        onClick={() => setShowChatbot((prev) => !prev)}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: showChatbot ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-20 md:bottom-7 right-4 w-[60px] h-[60px] md:w-[60px] md:h-[60px] rounded-full text-white shadow-xl flex items-center justify-center cursor-pointer"
        style={{
          background: showChatbot
            ? "linear-gradient(135deg, #ff7e5f, #ff6a00)"
            : "linear-gradient(135deg, #ff9966, #ff5e00)",
        }}
      >
        <motion.span
          key={showChatbot ? "close" : "chat_bubble"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="material-symbols-rounded text-2xl"
        >
          {showChatbot ? "close" : "chat_bubble"}
        </motion.span>
      </motion.span>

      {/* Chat Window with AnimatePresence */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed bottom-0 right-0 w-full h-full md:bottom-24 md:right-5 md:h-[600px] md:w-[420px] rounded-none md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              backgroundImage: `url(${chatBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Top Header (mobile + desktop) */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 backdrop-blur-md bg-black/30 md:bg-transparent text-white">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-9 md:h-9 p-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <ChatbotIcon />
                </div>
                <h2 className="text-base text-[#6d2b2b] md:text-lg font-semibold">AI-Assistant</h2>
              </div>
              <motion.span
                whileTap={{ scale: 0.8, rotate: 90 }}
                onClick={() => setShowChatbot(false)}
                className="material-symbols-rounded cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-[28px] h-[28px] md:w-[30px] md:h-[30px] flex justify-center items-center text-white text-lg md:text-xl hover:scale-110 transition"
              >
                keyboard_arrow_down
              </motion.span>
            </div>

            {/* Chat Body */}
            <div
              ref={chatBodyRef}
              className="flex flex-col gap-3 p-4 md:p-6 md:h-[460px] flex-grow overflow-y-auto"
            >
              <div className="flex gap-3 items-end">
                <div className="w-8 h-8 md:w-9 md:h-9 p-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center">
                  <ChatbotIcon />
                </div>
                <p className="text-sm md:text-base bg-gradient-to-r from-orange-100 to-orange-200 text-orange-900 rounded-[13px_13px_13px_3px] px-3 py-2 md:px-4 md:py-3 max-w-[80%] shadow">
                  Hello! I am your personal AI Assistant. How can I help you today?
                </p>
              </div>
              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>

            {/* Chat Form */}
            <div className="p-3 md:p-4 border-t border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
              <ChatForm
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Assistant;
