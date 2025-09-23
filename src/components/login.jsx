import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
} from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import loginbg2 from "../image/LoginBg.png"; // Default for larger screens
import loginbgMobile from "../image/loginbgMobileLogin.png"; // Background for mobile

const Login = () => {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Handle Email/Password Login
  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      alert(`Welcome back, ${result.user.email}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error(error);
      alert("Facebook login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-center bg-cover relative px-4"
      style={{
        backgroundImage: `url(${window.innerWidth < 640 ? loginbgMobile : loginbg2})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-brightness-80"></div>

      {/* Skip button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-4 right-4 sm:right-6 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/70 rounded-full hover:bg-gray-700 transition z-30"
      >
        Skip
      </button>

      {/* Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl transform transition-all duration-1000 ease-out ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
          Sign In
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
            onClick={handleLogin}
            className="bg-gradient-to-r from-yellow-500 to-red-500 py-2 w-full rounded-full text-white font-semibold shadow-md hover:scale-105 transition"
          >
            LOGIN
          </button>

          {/* Navigate to Signup Page */}
          <p
            onClick={() => navigate("/signup")}
            className="text-xs sm:text-sm text-gray-300 cursor-pointer hover:underline mt-2"
          >
            New here? Create an account
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-2 text-gray-300 text-xs sm:text-sm">OR</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Social buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-white text-gray-700 py-2 w-full rounded-full text-sm sm:text-base font-medium shadow hover:scale-105 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            Login with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 w-full rounded-full text-sm sm:text-base font-medium shadow hover:scale-105 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
              alt="Facebook"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
