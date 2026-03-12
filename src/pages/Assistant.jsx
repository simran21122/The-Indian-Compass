import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatbotIcon from "../components/Assistant/ChatbotIcon";
import ChatForm from "../components/Assistant/ChatForm";
import ChatMessage from "../components/Assistant/ChatMessage";
import chatBg from "../assets/image/bg_chat_bot.jpg";
import { generateOpenRouterResponse } from "../utils/openRouterAPI";

export const Assistant = () => {

    const [chatHistory, setChatHistory] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);

    const chatBodyRef = useRef();

    const generateBotResponse = async (history) => {

        const userMessage = history[history.length - 1].text;

        const updateHistory = (text, isError = false) => {
            setChatHistory(prev => [
                ...prev.filter(msg => msg.text !== ". . ."),
                { role: "model", text, isError }
            ]);
        };

        try {

            const aiResponse = await generateOpenRouterResponse(userMessage);

            updateHistory(aiResponse);

        } catch (error) {

            updateHistory("Something went wrong with AI response.", true);

        }

    };

    useEffect(() => {

        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: "smooth"
            });
        }

    }, [chatHistory]);

    return (

        <div className="fixed right-5 z-50">

            {/* Chat Toggle Button */}

            <motion.span
                onClick={() => setShowChatbot(prev => !prev)}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: showChatbot ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="fixed bottom-20 md:bottom-7 right-4 w-[60px] h-[60px] rounded-full text-white shadow-xl flex items-center justify-center cursor-pointer"
                style={{
                    background: showChatbot
                        ? "linear-gradient(135deg,#ff7e5f,#ff6a00)"
                        : "linear-gradient(135deg,#ff9966,#ff5e00)"
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


            <AnimatePresence>

                {showChatbot && (

                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                        className="fixed bottom-0 right-0 w-full h-full md:bottom-24 md:right-5 md:h-[600px] md:w-[420px] rounded-none md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{
                            backgroundImage: `url(${chatBg})`,
                            backgroundSize: "cover"
                        }}
                    >

                        {/* Header */}

                        <div className="flex items-center justify-between px-4 py-4 text-white">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 p-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                    <ChatbotIcon />
                                </div>

                                <h2 className="text-lg font-semibold text-[#6d2b2b]">
                                    Cultural AI Assistant
                                </h2>

                            </div>

                            <motion.span
                                whileTap={{ scale: 0.8, rotate: 90 }}
                                onClick={() => setShowChatbot(false)}
                                className="material-symbols-rounded cursor-pointer bg-orange-600 rounded-full w-[30px] h-[30px] flex justify-center items-center text-white"
                            >
                                keyboard_arrow_down
                            </motion.span>

                        </div>


                        {/* Chat Body */}

                        <div
                            ref={chatBodyRef}
                            className="flex flex-col gap-3 p-6 flex-grow overflow-y-auto scrollbar-hide"
                        >

                            {/* Welcome Message */}

                            <div className="flex gap-3 items-end">

                                <div className="w-9 h-9 p-1.5 bg-orange-600 text-white rounded-full flex items-center justify-center">
                                    <ChatbotIcon />
                                </div>

                                <p className="text-sm bg-orange-100 text-orange-900 rounded px-4 py-3 max-w-[80%] shadow">
                                    Hello! Ask me anything about Indian culture, heritage,
                                    festivals, monuments, and traditional arts.
                                </p>

                            </div>

                            {/* Chat Messages */}

                            {chatHistory.map((chat, index) => (
                                <ChatMessage key={index} chat={chat} />
                            ))}

                        </div>


                        {/* Chat Input */}

                        <div className="p-4 border-t bg-orange-50">

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