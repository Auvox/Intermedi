import "../../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">

        {/* ── Text side ── */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Plataforma Farmacêutica B2B · B2C
          </div>

          <h1 className="hero-title">
            <span className="green">Inter</span><span className="thin">ligando</span>
            <br />
            medicamentos<br />
            a quem precisa
          </h1>

          <p className="hero-subtitle">
            Farmácias anunciam remédios em falta ou excesso. Quando há correspondência,
            a plataforma faz o match automaticamente — conectando quem precisa a quem tem.
          </p>

          <div className="hero-actions">
            <a href="#personas" className="btn btn-primary btn-lg">Sou farmácia</a>
            <a href="#personas" className="btn btn-outline btn-lg">Buscar remédio</a>
          </div>

          <div className="hero-trust">
            <div className="hero-trust-item">
              <span className="hero-trust-value">545+</span>
              <span className="hero-trust-label">Farmácias</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-value">12M+</span>
              <span className="hero-trust-label">Matches realizados</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-value">98%</span>
              <span className="hero-trust-label">Satisfação</span>
            </div>
          </div>
        </div>

        {/* ── Visual side ── */}
        <div className="hero-visual">
          <div className="hero-circle-bg" />
          <div className="hero-pill-wrap">
            <img
              className="hero-pill-img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Paracetamol_pill.jpg/320px-Paracetamol_pill.jpg"
              alt="Medicamento"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />

            <div className="hero-chip chip-1">
              <div className="hero-chip-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 2h6v3H9z" />
                  <rect x="7" y="5" width="10" height="16" rx="2" />
                  <path d="M12 10v6" /><path d="M9 13h6" />
                </svg>
              </div>
              <div>
                <span>Medicamentos</span>
                <span className="hero-chip-sub">Catálogo completo</span>
              </div>
            </div>

            <div className="hero-chip chip-2">
              <div className="hero-chip-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
                  <path d="M5 17H3v-4l2-5h12l2 5v4h-2" /><path d="M5 17h12" />
                </svg>
              </div>
              <div>
                <span>Match automático</span>
                <span className="hero-chip-sub">Em tempo real</span>
              </div>
            </div>

            <div className="hero-chip chip-3">
              <div className="hero-chip-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <span>ANVISA</span>
                <span className="hero-chip-sub">Certificado</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
