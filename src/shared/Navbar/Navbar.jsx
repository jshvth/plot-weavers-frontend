// src/shared/Navbar/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-pink-600 font-semibold"
              : "text-gray-600 hover:text-pink-500"
          }
        >
          LogIn
        </NavLink>
      </div>
    </nav>
  );
}
