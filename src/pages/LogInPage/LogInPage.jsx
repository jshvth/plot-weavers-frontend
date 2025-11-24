import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";

export default function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔹 Login form submitted");

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      console.log("📡 Sending login request...");
      const response = await loginUser(username, password);
      console.log("✅ API response received:", response);

      const { access_token, username: returnedUsername, id: userId } = response;

      if (access_token) {
        console.log("🔐 Token received:", access_token);

        // 🔥 WICHTIG: userId speichern!
        localStorage.setItem("token", access_token);
        localStorage.setItem("username", returnedUsername);
        localStorage.setItem("userId", userId);

        // Formular zurücksetzen
        setUsername("");
        setPassword("");

        alert("✅ Login successful!");
        console.log("➡️ Navigating to /profile...");

        // Leichte Verzögerung für sauberen Redirect
        setTimeout(() => {
          navigate("/profile");
        }, 100);
      } else {
        console.error("❌ No token in response");
        alert("Invalid server response.");
      }
    } catch (error) {
      console.error("🚫 Login failed:", error);
      alert("Invalid credentials or server error.");
    }
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
