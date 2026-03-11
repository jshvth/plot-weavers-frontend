import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useTranslation } from "react-i18next";

export default function LogInPage() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔹 Login form submitted");

    if (!username || !password) {
      alert(t("auth.fillFields"));
      return;
    }

    try {
      console.log("📡 Sending login request...");
      const response = await loginUser(username, password);
      console.log("✅ API response received:", response);

      const { access_token, username: returnedUsername, id: userId } = response;

      if (access_token) {
        console.log("🔐 Token received:", access_token);

        //userId speichern
        localStorage.setItem("token", access_token);
        localStorage.setItem("username", returnedUsername);
        localStorage.setItem("userId", userId);

        // Formular zurücksetzen
        setUsername("");
        setPassword("");

        alert(t("auth.loginSuccess"));
        console.log("➡️ Navigating to /profile...");

        setTimeout(() => {
          navigate("/profile");
        }, 100);
      } else {
        console.error("❌ No token in response");
        alert(t("auth.invalidServerResponse"));
      }
    } catch (error) {
      console.error("🚫 Login failed:", error);
      alert(t("auth.invalidCredentials"));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 sm:mt-20 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-center text-pink-500">
        {t("auth.loginTitle")}
      </h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t("auth.username")}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
            placeholder={t("auth.loginUsernamePlaceholder")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t("auth.password")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
            placeholder={t("auth.loginPasswordPlaceholder")}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          {t("auth.loginButton")}
        </button>
      </form>

      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-4">
        {t("auth.noAccount")}{" "}
        <Link to="/register" className="text-pink-500 hover:underline">
          {t("auth.registerNow")}
        </Link>
      </p>
    </div>
  );
}
