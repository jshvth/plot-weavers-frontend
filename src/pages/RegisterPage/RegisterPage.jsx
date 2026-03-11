import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert(t("auth.fillFields"));
      return;
    }

    if (password !== confirmPassword) {
      alert(t("auth.passwordsMismatch"));
      return;
    }

    try {
      // 🔥 WIRKLICHE Registrierung via Backend
      const res = await registerUser(username, password);

      alert(t("auth.registerSuccess"));

      // Weiter zum Login
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      alert(
        t("auth.registerErrorPrefix") +
          (err.response?.data?.error || t("auth.serverError"))
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 sm:mt-20 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
        {t("auth.registerTitle")}
      </h1>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            {t("auth.username")}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
            placeholder={t("auth.registerUsernamePlaceholder")}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            {t("auth.password")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
            placeholder={t("auth.registerPasswordPlaceholder")}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            {t("auth.confirmPassword")}
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
            placeholder={t("auth.registerConfirmPlaceholder")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {t("auth.registerButton")}
        </button>
      </form>

      {/* Hinweis */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        {t("auth.haveAccount")}{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-pink-500 hover:underline cursor-pointer"
        >
          {t("auth.loginHere")}
        </span>
      </p>
    </div>
  );
}
