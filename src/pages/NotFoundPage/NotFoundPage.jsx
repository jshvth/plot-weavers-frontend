// src/pages/NotFoundPage.jsx
import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-5xl font-bold text-pink-500 mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-6">Oops! Page not found.</p>
      <NavLink
        to="/"
        className="text-indigo-500 hover:text-indigo-400 font-semibold underline"
      >
        Back to Home
      </NavLink>
    </div>
  );
}
