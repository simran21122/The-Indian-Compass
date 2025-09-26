import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import loginbg from "../image/loginbg2.png";

const Signup = () => {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      alert(`Account created for ${result.user.email}`);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-center bg-cover relative"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-75"></div>

      <div
        className={`relative z-20 w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl transform transition-all duration-1000 ease-out ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">Create Account</h2>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="rounded-full px-4 py-2 w-72 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-full px-4 py-2 w-72 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignUp}
            className="bg-green-600 py-2 w-72 rounded-full text-white font-semibold shadow-md hover:scale-105 transition"
          >
            SIGN UP
          </button>

          <p
            onClick={() => navigate("/login")}
            className="text-sm text-gray-300 cursor-pointer hover:underline mt-2"
          >
            Already have an account? Sign In
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
