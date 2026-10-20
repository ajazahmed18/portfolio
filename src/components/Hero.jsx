import { useEffect, useState } from "react";

const roles = [
  "full stack web applications",
  "responsive React interfaces",
  "REST APIs with Node and Express",
  "ideas into working products"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  useEffect(() => {
    let swapTimeout;

    const interval = window.setInterval(() => {
      setRoleVisible(false);
      swapTimeout = window.setTimeout(() => {
        setRoleIndex(index => (index + 1) % roles.length);
        setRoleVisible(true);
      }, 400);
    }, 3200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swapTimeout);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <p className="eyebrow reveal">Portfolio — Full Stack Developer</p>

        <h1 className="hero__title reveal">
          Mohammed Ajaz Ahmed builds
          <span className="hero__role">
            <span id="roleText" style={{ opacity: roleVisible ? 1 : 0, transition: "opacity 0.4s ease" }}>
              {roles[roleIndex]}
            </span>
          </span>
        </h1>

        <p className="hero__lede reveal">
          I am a Full Stack Developer and B.Tech CSE-DS student who turns ideas into
          complete web applications, from responsive React interfaces to Node.js, Express
          and MongoDB back ends. I am building real projects and looking for internship opportunities.
        </p>

        <div className="hero__actions reveal">
          <a href="#work" className="btn btn--solid">View my projects</a>
          <a href="mailto:ajazmd8055@gmail.com" className="btn btn--ghost">Email me</a>
        </div>

        <div className="hero__socials reveal">
          <a href="https://github.com/ajazahmed18" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="https://leetcode.com/u/ajazahmed18/" target="_blank" rel="noopener">LeetCode ↗</a>
        </div>
      </div>

      <div className="hero__status reveal">
        <span className="dot dot--live"></span>
        <span>STATUS — Open to internships and learning opportunities</span>
      </div>

      <a href="#work" className="scroll-cue" aria-label="Scroll to projects"><span></span></a>
    </section>
  );
}
