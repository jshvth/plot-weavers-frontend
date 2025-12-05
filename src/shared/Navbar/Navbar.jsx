import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; //Burger Icons
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔍 check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // 🚪 logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold tracking-wide text-pink-600"
        onClick={() => setMenuOpen(false)}
      >
        PlotWeavers
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-pink-600 font-semibold"
              : "text-gray-600 hover:text-pink-500"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/stories"
          className={({ isActive }) =>
            isActive
              ? "text-pink-600 font-semibold"
              : "text-gray-600 hover:text-pink-500"
          }
        >
          Stories
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive
              ? "text-pink-600 font-semibold"
              : "text-gray-600 hover:text-pink-500"
          }
        >
          Create
        </NavLink>

        <NavLink
          to="/howto"
          className={({ isActive }) =>
            isActive
              ? "text-pink-600 font-semibold"
              : "text-gray-600 hover:text-pink-500"
          }
        >
          WritersGuide
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text-pink-600 font-semibold"
              : "text-gray-600 hover:text-pink-500"
          }
        >
          Profile
        </NavLink>

        {/* Dynamic login/logout button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-pink-500 font-semibold"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 bg-pink-600 text-white rounded-lg shadow font-semibold flex items-center justify-center"
                : "px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition flex items-center justify-center"
            }
          >
            Login
          </NavLink>
        )}
      </div>

      {/* 📱 Mobile Burger Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-600 hover:text-pink-600 focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 flex flex-col space-y-4 py-4 px-6 shadow-md md:hidden animate-slideDownFade z-50">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            Home
          </NavLink>

          <NavLink
            to="/stories"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            Stories
          </NavLink>

          <NavLink
            to="/create"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            Create
          </NavLink>

          <NavLink
            to="/howto"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            HowTo
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            Profile
          </NavLink>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-pink-500 text-left font-semibold"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition text-center"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
