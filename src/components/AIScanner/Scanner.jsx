import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, Send, RefreshCw, Brain, Zap } from "lucide-react";
import { generateOpenRouterResponse } from "../../utils/openRouterAPI";

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [chat, setChat] = useState([
    { role: "assistant", content: " Upload or scan an image to begin cultural analysis." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // environment = back, user = front

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const startCamera = async () => {
    setCameraOn(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
  };

  const switchCamera = async () => {
    stopCamera();
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  useEffect(() => {
    if (cameraOn) startCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 400, 300);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setImage(dataUrl);
    stopCamera();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!image) return alert("Please upload or capture an image first!");
    setScanned(true);
    setLoading(true);

    try {
      const prompt =
        "Analyze this Indian cultural artifact and describe its history, origin, and significance in detail.";

      const llamaResponse = await generateOpenRouterResponse({
        prompt,
        image,
      });

      setChat((prev) => [
        ...prev,
        { role: "assistant", content: llamaResponse },
      ]);
    } catch (err) {
      console.error("Scan failed:", err);
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Sorry, something went wrong while analyzing the image." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessage = { role: "user", content: input };
    setChat((prev) => [...prev, newMessage]);
    setLoading(true);

    // Gather last 4 messages for context
    const contextMessages = chat.slice(-4).map(msg => {
      if (msg.role === "user") return `User: ${msg.content}`;
      if (msg.role === "assistant") return `AI: ${msg.content}`;
      return "";
    }).join("\n");

    const followupPrompt = `You are an expert Indian culture assistant. ONLY answer the user's latest follow-up question, do NOT repeat previous answers. Reply in 1-2 short, direct sentences.\n\n${contextMessages}\nUser: ${input}\n\nReply as a helpful cultural expert, keep it concise.`;

    try {
      const llamaReply = await generateOpenRouterResponse({
        prompt: followupPrompt,
      });

      setChat((prev) => [
        ...prev,
        { role: "assistant", content: llamaReply },
      ]);
    } catch (err) {
      console.error("Follow-up failed:", err);
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Could not fetch a response. Please try again." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white p-4 sm:p-6 rounded-2xl shadow-xl mx-auto text-center">
      {!scanned ? (
        <>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            AI Cultural Scanner
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Scan or upload a photo of any Indian cultural artifact to instantly explore its history, origin, and cultural significance using advanced AI models.
          </p>

          <div className="flex justify-center gap-6 mb-4">
            {!cameraOn && (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={startCamera}
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-orange-600 text-white shadow hover:bg-orange-700 transition active:scale-95"
                >
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <span className="text-xs text-gray-500">Use Camera</span>
              </div>
            )}

            <div className="flex flex-col items-center gap-2">
              <label className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow hover:bg-gray-300 cursor-pointer transition active:scale-95">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
              </label>
              <span className="text-xs text-gray-500">Upload File</span>
            </div>
          </div>

          {cameraOn && (
            <div className="relative">
              <video
                ref={videoRef}
                width="280"
                height="200"
                className="rounded-lg border border-gray-300 mx-auto"
              ></video>

              <button
                onClick={switchCamera}
                className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 shadow hover:bg-gray-300 transition active:scale-95"
                title="Switch Camera"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <button
                onClick={capturePhoto}
                className="mt-4 py-2 px-4 sm:px-6 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition active:scale-95 text-sm sm:text-base"
              >
                📸 Capture Photo
              </button>
            </div>
          )}

          <canvas ref={canvasRef} width="400" height="300" className="hidden"></canvas>

          {image && (
            <div className="mt-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                Preview:
              </h3>
              <img
                src={image}
                alt="preview"
                className="max-w-[90%] sm:max-w-xs rounded-lg border border-gray-300 mx-auto"
              />
              <button
                onClick={handleScan}
                className="mt-4 py-2 px-6 sm:px-8 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-700 transition active:scale-95 text-sm sm:text-base flex items-center gap-2"
                disabled={loading}
              >
                <Brain className="w-4 h-4" />
                {loading ? "Analyzing..." : "Scan with AI Cultural Scanner"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex flex-col items-center justify-center h-[40vh] md:h-[60vh]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Scanned Image
            </h3>
            <img
              src={image}
              alt="scanned"
              className="max-w-full max-h-[30vh] md:max-h-[50vh] rounded-lg border border-gray-300"
            />
          </div>

          <div className="flex flex-col h-[40vh] md:h-[60vh]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-orange-600" />
              AI Cultural Analysis
            </h3>

            <div className="flex-1 overflow-y-auto p-2 space-y-3">
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-2xl shadow-md w-full max-w-[95%] px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white text-right"
                        : "bg-gradient-to-r from-green-50 to-green-100 text-green-900 border border-green-200"
                    }`}
                  >
                    {msg.role === "assistant" && /\*\*/.test(msg.content)
                      ? msg.content.split(/\n\n/).map((section, i) => {
                          const match = section.match(/^\*\*(.+?):\*\*\s*(.*)$/s);
                          if (match) {
                            const title = match[1].trim();
                            const lower = title.toLowerCase();
                            let boxClass = "mb-4 p-3 rounded-lg shadow-sm border-l-4 ";
                            let titleClass = "font-extrabold font-black text-base sm:text-lg mb-1 ";
                            let titleColor = "text-orange-700";
                            if (lower.includes("cultural context")) {
                              boxClass += "bg-blue-50 border-blue-400";
                              titleColor = "text-blue-700";
                            } else if (lower.includes("extra insights")) {
                              boxClass += "bg-green-50 border-green-400";
                              titleColor = "text-green-700";
                            } else {
                              boxClass += "bg-orange-50 border-orange-400";
                            }
                            return (
                              <div key={i} className={boxClass}>
                                <strong className={`${titleClass} ${titleColor}`} style={{ fontWeight: 900, WebkitFontSmoothing: "antialiased" }}>{title}</strong>
                                <div className="text-gray-900 text-sm sm:text-base md:text-lg leading-relaxed pl-1" style={{ textIndent: '1em' }}>{match[2]}</div>
                              </div>
                            );
                          }
                          return (
                            <div key={i} className="mb-4 p-3 rounded-lg bg-orange-50 border-l-4 border-orange-400 shadow-sm">
                              <div className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed pl-1" style={{ textIndent: '1em' }}>{section}</div>
                            </div>
                          );
                        })
                      : msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="mt-2 sm:mt-3 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                className="flex-1 border rounded-full px-3 sm:px-4 py-2 text-gray-600 text-sm focus:outline-none"
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 active:scale-95 disabled:bg-gray-300"
                disabled={loading}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
