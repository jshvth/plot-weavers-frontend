// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import StoriesPage from "./pages/StoriesPage/StoriesPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SupportPage from "./pages/SupportPage/SupportPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HowToPage from "./pages/HowToPage/HowToPage";
import StoryDetailPage from "./pages/StoryDetailPage/StoryDetailPage";
import ChapterDetailPage from "./pages/ChapterDetailPage.jsx/ChapterDetailPage";
import ImprintPage from "./pages/ImprintPage/ImprintPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import ProtectedRoute from "./shared/ProtectedRoute/ProtectedRoute";
import "./App.css";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/create" element={<CreatePage />} />

          {/* Geschützte Route fürs Profil */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="/support" element={<SupportPage />} />
          <Route path="/howto" element={<HowToPage />} />
          <Route path="/stories/:id" element={<StoryDetailPage />} />
          <Route path="/chapters/:id" element={<ChapterDetailPage />} />
          <Route path="/imprint" element={<ImprintPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
