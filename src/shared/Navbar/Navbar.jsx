import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language?.startsWith("de") ? "en" : "de";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center shadow-sm sticky top-0 z-50 transition-colors">
      <Link
        to="/"
        className="text-2xl sm:text-3xl font-bold text-pink-600"
        onClick={() => setMenuOpen(false)}
      >
        PlotWeavers
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        {[
          { to: "/", label: t("nav.home") },
          { to: "/stories", label: t("nav.stories") },
          { to: "/create", label: t("nav.create") },
          { to: "/howto", label: t("nav.guide") },
          { to: "/profile", label: t("nav.profile") },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? "text-pink-500 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-pink-500"
            }
          >
            {label}
          </NavLink>
        ))}

        <button
          onClick={toggleDarkMode}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full text-gray-600 dark:text-gray-300 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-500 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={toggleLanguage}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full text-gray-600 dark:text-gray-300 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-500 transition-colors"
          title={t("nav.language")}
          aria-label={t("nav.language")}
        >
          <span className="material-symbols-outlined text-[20px] leading-none">
            translate
          </span>
        </button>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-gray-600 dark:text-gray-300 font-semibold"
          >
            {t("nav.logout")}
          </button>
        ) : (
          <NavLink
            to="/login"
            className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
          >
            {t("nav.login")}
          </NavLink>
        )}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-600 dark:text-gray-300"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-4 py-4 px-6 shadow-md md:hidden z-50">
          {[
            { path: "/", label: t("nav.home") },
            { path: "/stories", label: t("nav.stories") },
            { path: "/create", label: t("nav.create") },
            { path: "/howto", label: t("nav.guide") },
            { path: "/profile", label: t("nav.profile") },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300"
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 pt-2 border-t dark:border-gray-800"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}{" "}
            {t("nav.toggleTheme")}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 pt-2 border-t dark:border-gray-800"
          >
            <span className="material-symbols-outlined">
              translate
            </span>
            {t("nav.language")}
          </button>
        </div>
      )}
    </nav>
  );
}
