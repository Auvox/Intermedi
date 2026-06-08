import { useState, useEffect } from "react";
import "../../styles/navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="navbar">
        <a href="#hero" className="nav-logo">
          <div className="nav-logo-mark">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <span className="nav-logo-text"><span>Inter</span>medi</span>
        </a>

        <ul className="nav-links">
          <li><a href="#hero" className="active">Início</a></li>
          <li><a href="#how">Como funciona</a></li>
          <li className="nav-dropdown">
            <a href="#partners">
              Catálogo
              <svg className="nav-dropdown-icon" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
            <div className="nav-dropdown-menu">
              <a href="#partners">Medicamentos</a>
              <a href="#partners">Distribuidores</a>
              <a href="#partners">Laboratórios</a>
            </div>
          </li>
          <li><a href="#partners">Parceiros</a></li>
          <li><a href="#personas">Para você</a></li>
        </ul>

        <div className="nav-actions">
          <a href="#cadastro" className="btn btn-ghost">Cadastrar</a>
          <a href="#entrar" className="btn btn-primary">Entrar</a>
        </div>

        <div
          className="hamburger"
          id="hamburger"
          aria-label="Menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span style={{ transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : undefined }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : undefined }} />
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`} id="mobile-nav">
        <a href="#hero" onClick={closeMobile}>Início</a>
        <a href="#how" onClick={closeMobile}>Como funciona</a>
        <a href="#personas" onClick={closeMobile}>Para você</a>
        <a href="#partners" onClick={closeMobile}>Catálogo & Parceiros</a>
        <div className="mobile-nav-actions">
          <a href="#cadastro" className="btn btn-outline btn-lg" onClick={closeMobile}>Cadastrar</a>
          <a href="#entrar" className="btn btn-primary btn-lg" onClick={closeMobile}>Entrar</a>
        </div>
      </div>
    </>
  );
}
