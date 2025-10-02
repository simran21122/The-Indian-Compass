import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const Signup = () => {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  // 🔑 Redirect if user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, [navigate]);

  // Email + Password Signup
  const handleSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      alert(`Account created for ${result.user.email}`);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Google Signup/Login
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Welcome ${result.user.displayName}`);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Google signup failed");
    }
  };

  // Facebook Signup/Login
  const handleFacebookSignup = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      alert(`Welcome ${result.user.displayName}`);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Facebook signup failed");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-center bg-cover relative"
      style={{ backgroundImage: `url(/loginbg2.png)` }} // from public folder
    >
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-75"></div>

      <div
        className={`relative z-20 w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl transform transition-all duration-1000 ease-out ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="rounded-full px-4 py-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-full px-4 py-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-2 text-gray-300 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Social signup buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 bg-white text-gray-700 py-2 w-full rounded-full text-sm font-medium shadow hover:scale-105 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-4 h-4"
            />
            Sign up with Google
          </button>
          <button
            onClick={handleFacebookSignup}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 w-full rounded-full text-sm font-medium shadow hover:scale-105 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
              alt="Facebook"
              className="w-4 h-4"
            />
            Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
