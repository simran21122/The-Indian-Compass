import React from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = React.useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    setTimeout(() => {
      setChatHistory((history) => [...history, { role: "model", text: ". . ." }]);
      generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    }, 400);
  };

  const handleIconClick = () => {
    handleFormSubmit({ preventDefault: () => {} });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center outline outline-1 outline-gray-300 focus-within:outline-orange-500 rounded-full px-4 py-2 shadow-md w-full bg-white/60 backdrop-blur-sm transition"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="flex-grow bg-transparent outline-none text-sm placeholder-gray-400 px-2 text-gray-800"
        required
      />
      <span
        onClick={handleIconClick}
        className="material-symbols-rounded text-white text-lg w-9 h-9 flex items-center justify-center cursor-pointer rounded-full shadow-md transition-transform duration-300 hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #ff7e5f, #ff6a00)",
        }}
      >
        send
      </span>
    </form>
  );
};

export default ChatForm;
