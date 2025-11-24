import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  console.log("🔒 Checking protected route...");
  console.log("📦 Found token:", token ? "✅ yes" : "❌ no");

  if (!token) {
    console.log("🚫 No token found → redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("✅ Token found → access granted");
  return children;
}
