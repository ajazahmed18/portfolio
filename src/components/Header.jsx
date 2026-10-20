import { useState } from "react";

export const NAV_ITEMS = [
  { id: "work", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "profiles", label: "Profiles" },
  { id: "contact", label: "Contact" }
];

export default function Header({ isScrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav${isScrolled ? " is-scrolled" : ""}`} id="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__mark" aria-label="Home">MA</a>

        <nav className="nav__links" aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "is-current" : undefined}
              aria-current={activeSection === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <a href="mailto:ajazmd8055@gmail.com" className="nav__cta">Hire me</a>

        <button
          className="nav__burger"
          id="burger"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="navMobile"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav className={`nav__mobile${menuOpen ? " is-open" : ""}`} id="navMobile" aria-label="Mobile navigation">
        {NAV_ITEMS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
