import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-center py-4 text-sm text-gray-500 dark:text-gray-400">
      <p>
        © 2025{" "}
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
          PlotWeavers
        </span>
        &nbsp;— Joshua Väth
      </p>
      <div className="mt-2 flex justify-center gap-6">
        <NavLink
          to="/support"
          className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition"
        >
          Support
        </NavLink>
        <NavLink
          to="/imprint"
          className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition"
        >
          Imprint
        </NavLink>
      </div>
    </footer>
  );
}
