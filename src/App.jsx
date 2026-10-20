import { useEffect, useState } from "react";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import GrainTexture from "./components/GrainTexture.jsx";
import Header, { NAV_ITEMS } from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Profiles from "./components/Profiles.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);

      let currentSection = "";
      NAV_ITEMS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          currentSection = id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(element => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GrainTexture />
      <ProgressBar progress={scrollProgress} />

      <Header isScrolled={isScrolled} activeSection={activeSection} />

      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Profiles />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
