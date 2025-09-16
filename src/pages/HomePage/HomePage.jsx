// src/pages/HomePage/HomePage.jsx
import HeroSection from "../../shared/HeroSection/HeroSection";
import StoryCard from "../../shared/StoryCard/StoryCard";
import { stories } from "../../data/stories";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 mt-12 mb-20">
        <h2 className="text-2xl font-bold mb-6">Most recent stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.slice(0, 4).map((story) => (
            <StoryCard key={story.id} {...story} />
          ))}
        </div>
      </div>
    </div>
  );
}
