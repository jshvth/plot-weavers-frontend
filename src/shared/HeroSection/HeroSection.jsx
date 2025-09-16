// src/components/HeroSection/HeroSection.jsx
import heroImage from "../../assets/images/hero-girl.webp";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-pink-50 to-indigo-50 pt-6 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Text-Bereich */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Discover, <span className="text-pink-500">create</span> and share
            your manga stories
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
            PlotWeavers is the platform where creative minds develop and share
            their manga stories and weave new worlds together.
          </p>

          <div className="mt-8 flex justify-center md:justify-start space-x-4">
            <a
              href="/create"
              className="px-6 py-3 rounded-lg bg-pink-500 text-white font-medium shadow hover:bg-pink-600 transition"
            >
              Let's get started
            </a>
            <a
              href="/stories"
              className="px-6 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 shadow hover:bg-gray-100 transition"
            >
              Discover stories
            </a>
          </div>
        </div>

        {/* Bild-Bereich */}
        <div className="flex-1 mt-10 md:mt-0 md:ml-10 flex justify-center">
          <img
            src={heroImage}
            alt="Manga Girl Illustration"
            className="w-72 h-72 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
