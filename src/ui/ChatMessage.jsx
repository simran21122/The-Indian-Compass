import React from "react";
import { motion } from "framer-motion";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === "model";
  const isError = chat.isError;

  const formatContent = (text) => {
    if (!isBot || isError) return text;
    
    // Split by double newlines to get sections
    const sections = text.split('\n\n');
    
    return sections.map((section, index) => {
      // Check if it's a header (starts and ends with **)
      if (section.startsWith('**') && section.includes('**')) {
        const headerMatch = section.match(/^\*\*(.*?)\*\*/);
        if (headerMatch) {
          const headerText = headerMatch[1];
          const remainingText = section.replace(/^\*\*.*?\*\*/, '').trim();
          
          return (
            <div key={index} className="mb-3">
              <h4 className="font-bold text-orange-700 text-sm border-b border-orange-300 pb-1 mb-2">
                {headerText}
              </h4>
              {remainingText && (
                <p className="text-orange-800 leading-relaxed text-sm">
                  {remainingText}
                </p>
              )}
            </div>
          );
        }
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-2 last:mb-0 leading-relaxed text-sm">
          {section}
        </p>
      );
    });
  };

  const baseClasses = "flex gap-3 items-end";
  const textClasses = `text-sm whitespace-pre-line break-words px-4 py-3 max-w-[80%] shadow ${
    isError
      ? "bg-red-200 text-red-800 rounded-[13px_13px_13px_3px]"
      : isBot
      ? "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-900 rounded-[13px_13px_13px_3px]"
      : "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-[13px_13px_3px_13px]"
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: isBot ? -15 : 15 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`${baseClasses} ${isBot ? "" : "flex-col items-end"}`}
    >
      {isBot && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-9 h-9 p-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center"
        >
          <ChatbotIcon />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={textClasses}
      >
        {isBot && !isError ? formatContent(chat.text) : chat.text}
      </motion.div>
    </motion.div>
  );
};

export default ChatMessage;
