/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  // Password validation
  const validatePassword = (pass) => {
    if (pass.length < 6) return "At least 6 characters";
    if (!/[A-Z]/.test(pass)) return "One uppercase required";
    if (!/[a-z]/.test(pass)) return "One lowercase required";
    return null;
  };

  // Normal register
  const handleSubmit = async (e) => {
    e.preventDefault();
    const passError = validatePassword(password);
    if (passError) {
      toast.error(passError);
      return;
    }

    try {
      setLoading(true);
      await register(name, email, photo, password);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED GOOGLE LOGIN (NO async/await)
  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#1e293b] border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Profile Photo URL"
            required
            className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium py-3.5 rounded-xl transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* ✅ GOOGLE BUTTON - FULLY FIXED */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
        >
          Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}