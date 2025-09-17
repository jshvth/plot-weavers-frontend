// src/pages/RegisterPage/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Fake speichern – später durch API ersetzen
    localStorage.setItem("currentUser", username);

    alert(`Account created for ${username}!`);

    // Direkt ins Profil weiterleiten
    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
        Register
      </h1>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Choose a username"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Create a password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Confirm your password"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Register
        </button>
      </form>

      {/* Hinweis */}
      <p className="text-sm text-gray-500 mt-4 text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-pink-500 hover:underline cursor-pointer"
        >
          Login here
        </span>
      </p>
    </div>
  );
}
