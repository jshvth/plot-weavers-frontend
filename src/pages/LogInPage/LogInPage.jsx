// src/pages/LogInPage/LogInPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // aktuell nur Dummy
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter a username.");
      return;
    }

    // 👉 hier setzen wir den eingeloggten User
    localStorage.setItem("currentUser", username);
    localStorage.setItem("username", username);

    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Log In
        </button>
      </form>

      <p className="text-sm text-gray-600 text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-pink-500 hover:underline">
          Register now
        </Link>
      </p>
    </div>
  );
}
