import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔍 check login status on mount & whenever localStorage changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // 🚪 handle logout
  const handleLogout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold tracking-wide text-pink-600">
        PlotWeavers
      </Link>

      {/* Links */}
      <div className="space-x-6">
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
          HowTo
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

        {/* 🔄 Dynamic login/logout button */}
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
                ? "text-pink-600 font-semibold"
                : "text-gray-600 hover:text-pink-500"
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
