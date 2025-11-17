"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SpendingSection from "../components/SpendingSection";
import TrackSection from "../components/TrackSection";
import AutomationSection from "../components/AutomationSection";
import AISearchSection from "../components/AISearchSection";
import ForecastSection from "../components/ForecastSection";
import FamiliesSection from "../components/FamiliesSection";
import DownloadSection from "../components/DownloadSection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
      {/* Background Gradient Layers if your HTML had them */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-[200px]" />
      </div>

      {/* MAIN CONTENT */}
      <Navbar />
      <Hero />
      <SpendingSection />
      <TrackSection />
      <AutomationSection />
      <AISearchSection />
      <ForecastSection />
      <FamiliesSection />
      <DownloadSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
