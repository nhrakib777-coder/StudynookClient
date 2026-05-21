import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const location = useLocation(); // FOR ACTIVE TAB

  // Fallback: Show first letter if photo fails
  const fallbackAvatar = user?.name?.charAt(0).toUpperCase() || "U";

  // ACTIVE TAB CHECK
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-2xl shadow-lg">
      <div className="w-full px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-black tracking-tight relative"
        >
          <span className="text-white">Study</span>
          <span className="text-blue-400">Nook</span>
        </Link>

        {/* NAV LINKS - PREMIUM ACTIVE TAB */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 ${
              isActive("/") ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            Home
            {isActive("/") && (
              <span className="absolute left-0 top-full mt-1 h-0.5 w-full bg-blue-400 rounded-full" />
            )}
          </Link>

          <Link
            to="/rooms"
            className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 ${
              isActive("/rooms") ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            Rooms
            {isActive("/rooms") && (
              <span className="absolute left-0 top-full mt-1 h-0.5 w-full bg-blue-400 rounded-full" />
            )}
          </Link>

          {user && (
            <Link
              to="/add-room"
              className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 ${
                isActive("/add-room") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Add Room
              {isActive("/add-room") && (
                <span className="absolute left-0 top-full mt-1 h-0.5 w-full bg-blue-400 rounded-full" />
              )}
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/10 px-3 py-2 rounded-2xl transition-all duration-500"
              >
                {/* PROFILE IMAGE */}
                {!imgError && user?.photo ? (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {fallbackAvatar}
                  </div>
                )}

                {/* NAME */}
                <div className="hidden sm:block text-left">
                  <p className="text-xs text-gray-400">Welcome Back</p>
                  <h4 className="text-white font-semibold leading-none">{user.name}</h4>
                </div>

                {/* ICON */}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-64 rounded-3xl overflow-hidden border border-white/10 bg-[#0b1023]/95 backdrop-blur-2xl shadow-2xl">
                  {/* USER INFO */}
                  <div className="p-5 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      {!imgError && user?.photo ? (
                        <img
                          src={user.photo}
                          alt="Profile"
                          className="w-14 h-14 rounded-full object-cover border border-white/20"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                          {fallbackAvatar}
                        </div>
                      )}

                      <div>
                        <h3 className="text-white font-bold">{user.name}</h3>
                        <p className="text-sm text-gray-400 truncate max-w-37.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* LINKS */}
                  <div className="p-3">
                    <Link
                      to="/my-listings"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>📚</span>
                      My Listings
                    </Link>

                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>🗓️</span>
                      My Bookings
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <span>🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition duration-300 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-2xl font-semibold transition-all duration-500 shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}