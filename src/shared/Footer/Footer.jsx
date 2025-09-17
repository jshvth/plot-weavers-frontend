// src/shared/Footer/Footer.jsx
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-indigo-50 border-t border-indigo-100 text-center py-4 text-sm text-gray-500">
      <p>
        © 2025{" "}
        <span className="font-semibold text-indigo-600">PlotWeavers</span>
        &nbsp;— Joshua Väth
      </p>
      <p className="mt-2">
        <NavLink
          to="/support"
          className="text-gray-500 hover:text-pink-500 transition"
        >
          Support
        </NavLink>
      </p>
    </footer>
  );
}
