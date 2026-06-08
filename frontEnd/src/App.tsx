import "./styles/global.css";

import { useScrollReveal } from "./hooks/useScrollReveal";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import PersonasSection from "./components/sections/PersonasSection";
import WhySection from "./components/sections/WhySection";
import HowSection from "./components/sections/HowSection";
import PartnersSection from "./components/sections/PartnersSection";
import MapSection from "./components/sections/MapSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";

export default function App() {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PersonasSection />
        <WhySection />
        <HowSection />
        <PartnersSection />
        <MapSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
