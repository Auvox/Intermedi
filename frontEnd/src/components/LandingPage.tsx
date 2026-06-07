import { useState, useEffect, useRef } from "react";
import "../LandingPage.css";

/* ─── LOGO SVG inline ─── */
const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="0" width="6" height="22" rx="3" fill="white"/>
    <rect x="0" y="8" width="22" height="6" rx="3" fill="white"/>
  </svg>
);

/* ─── REVEAL HOOK ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── WHY CARDS DATA ─── */
const whyCards = [
  {
    icon: "📦",
    title: <>Estoque <span className="green">Inteligente</span></>,
    desc: "Medicamentos e produtos disponíveis com atualização em tempo real. Nunca perca uma venda por falta de estoque.",
  },
  {
    icon: "🔒",
    title: <>Plataforma <span className="green">Segura</span></>,
    desc: "Transações protegidas com criptografia avançada e fornecedores verificados para total tranquilidade.",
  },
  {
    icon: "🚀",
    title: <>Distribuição <span className="green">Rápida</span></>,
    desc: "Entregas otimizadas com rastreamento em tempo real para garantir velocidade e eficiência operacional.",
  },
];

/* ─── HOW STEPS DATA ─── */
const howSteps = [
  { icon: "🔍", num: "01", title: "Busca", desc: "Encontre o medicamento que precisa em nosso catálogo completo e atualizado." },
  { icon: "🏢", num: "02", title: "Fornecedor", desc: "Conectamos você aos melhores distribuidores e laboratórios verificados." },
  { icon: "📋", num: "03", title: "Pedido", desc: "Realize seu pedido de forma simples, rápida e 100% digital." },
  { icon: "🚛", num: "04", title: "Entrega", desc: "Acompanhe cada etapa da entrega até a chegada na sua farmácia." },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* scroll navbar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* reveal refs */
  const whyRef   = useReveal();
  const howRef   = useReveal();
  const partRef  = useReveal();
  const ctaRef   = useReveal();

  return (
    <div className="lp-root">
      {/* ══════════ NAV ══════════ */}
      <nav className={`lp-nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="lp-logo">
          <div className="lp-logo-icon"><LogoIcon /></div>
          <span className="lp-logo-text"><span>Inter</span>medi</span>
        </a>

        <ul className="lp-nav-links">
          <li><a href="#inicio">Início</a></li>
          <li><a href="#como-funciona">Como funciona</a></li>
          <li><a href="#catalogo">Catálogo</a></li>
          <li><a href="#parceiros">Parceiros</a></li>
        </ul>

        <div className="lp-nav-actions">
          <button className="btn-ghost">Entrar</button>
          <button className="btn-primary">Cadastrar</button>
        </div>

        <button className="lp-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* mobile menu */}
      <div className={`lp-mobile-menu${menuOpen ? " open" : ""}`}>
        <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
        <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
        <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
        <a href="#parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a>
        <button className="btn-primary" style={{marginTop:8}}>Entrar</button>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="lp-hero" id="inicio">
        <div className="lp-hero-bg" />
        <div className="lp-hero-grid" />

        <div className="lp-hero-inner">
          {/* LEFT */}
          <div className="lp-hero-content">
            <div className="lp-hero-badge">
              <span className="dot" />
              Plataforma Farmacêutica B2B
            </div>

            <h1 className="lp-hero-title">
              <span className="green">Inter</span>ligando<br />
              medic<span className="outline">amentos</span>
            </h1>

            <p className="lp-hero-sub">
              A solução completa para conectividade entre farmácias e fornecedores.
              Adquira medicamentos de forma <strong>fácil, rápida e segura</strong>.
            </p>

            <div className="lp-hero-actions">
              <button className="btn-hero-primary">Explorar Catálogo</button>
              <button className="btn-hero-outline">Saiba mais →</button>
            </div>

            <div className="lp-hero-stats">
              <div className="lp-stat-item">
                <span className="lp-stat-number">+2<span>k</span></span>
                <span className="lp-stat-label">Farmácias parceiras</span>
              </div>
              <div className="lp-stat-item">
                <span className="lp-stat-number">+12<span>k</span></span>
                <span className="lp-stat-label">Medicamentos</span>
              </div>
              <div className="lp-stat-item">
                <span className="lp-stat-number">99<span>%</span></span>
                <span className="lp-stat-label">Satisfação</span>
              </div>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div className="lp-hero-visual">
            <div className="lp-hero-capsule-wrap">
              <div className="lp-hero-orbit" />
              <div className="lp-hero-orbit lp-hero-orbit-2" />

              <div className="lp-hero-center">
                <div className="lp-pill-icon">
                  <div className="lp-pill-head" />
                  <div className="lp-pill-body" />
                </div>
              </div>

              <div className="lp-hero-float-card card-1">
                <span className="card-dot" />
                Medicamento
              </div>
              <div className="lp-hero-float-card card-2">
                <span className="card-dot" />
                Conexão segura
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHY ══════════ */}
      <section className="lp-section lp-why" id="catalogo">
        <div className="lp-section-inner">
          <div className="lp-why-header reveal" ref={whyRef}>
            <div className="lp-section-tag">Benefícios</div>
            <h2 className="lp-section-title">
              Por que escolher a <span className="green">Intermedi</span>?
            </h2>
            <p className="lp-section-sub">
              Encontre os medicamentos que sua farmácia precisa em nosso catálogo completo e atualizado.
            </p>
          </div>

          <div className="lp-why-cards">
            {whyCards.map((card, i) => (
              <div className={`lp-why-card reveal reveal-delay-${i + 1}`} key={i}>
                <div className="lp-why-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="lp-section lp-how" id="como-funciona">
        <div className="lp-section-inner">
          <div className="lp-how-header reveal" ref={howRef}>
            <div className="lp-section-tag">Processo</div>
            <h2 className="lp-section-title">
              Como a <span className="green">Intermedi</span> funciona
            </h2>
            <p className="lp-section-sub">
              Encontre, solicite e acompanhe medicamentos em uma plataforma integrada, segura e eficiente.
            </p>
          </div>

          <div className="lp-how-steps">
            {howSteps.map((step, i) => (
              <div className={`lp-how-step reveal reveal-delay-${i + 1}`} key={i}>
                <div className="lp-how-step-num">
                  <span className="lp-how-step-icon">{step.icon}</span>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PARTNERS ══════════ */}
      <section className="lp-section lp-partners" id="parceiros">
        <div className="lp-section-inner">
          <div className="lp-partners-header reveal" ref={partRef}>
            <div className="lp-section-tag">Ecossistema</div>
            <h2 className="lp-section-title">
              Parceiros de <span className="green">Confiança</span>
            </h2>
            <p className="lp-section-sub">
              Conectamos farmácias, distribuidores e laboratórios parceiros para garantir qualidade,
              segurança e eficiência na distribuição de medicamentos.
            </p>
          </div>

          <div className="lp-partners-grid">
            <div className="lp-partner-card reveal reveal-delay-1">
              <div className="lp-partner-card-label">Para Farmácias & Distribuidores</div>
              <h3>Gestão completa do seu negócio</h3>
              <ul className="lp-partner-list">
                {["Gestão de estoque", "Compras simplificadas", "Fornecedores confiáveis", "Relatórios inteligentes"].map((item) => (
                  <li key={item}>
                    <span className="lp-partner-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lp-partner-card reveal reveal-delay-2">
              <div className="lp-partner-card-label">Para Consumidores</div>
              <h3>Encontre o que precisa, onde precisar</h3>
              <ul className="lp-partner-list">
                {["Busca de medicamentos", "Comparação de preços", "Localização das farmácias", "Disponibilidade em tempo real"].map((item) => (
                  <li key={item}>
                    <span className="lp-partner-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="lp-cta">
        <div className="lp-cta-inner">
          <div className="lp-cta-box reveal" ref={ctaRef}>
            <h2>Pronto para <span className="green">transformar</span><br />sua farmácia?</h2>
            <p>
              Junte-se a mais de 2.000 farmácias que já confiam na Intermedi
              para gerenciar seus medicamentos com segurança e eficiência.
            </p>
            <div className="lp-cta-btns">
              <button className="btn-hero-primary">Começar agora</button>
              <button className="btn-hero-outline">Falar com especialista</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <div className="lp-logo">
                <div className="lp-logo-icon"><LogoIcon /></div>
                <span className="lp-logo-text"><span>Inter</span>medi</span>
              </div>
              <p>Interligando medicamentos entre farmácias, distribuidores e laboratórios com segurança e eficiência.</p>
            </div>

            <div className="lp-footer-col">
              <h4>Links</h4>
              <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#como-funciona">Como funciona</a></li>
                <li><a href="#catalogo">Catálogo</a></li>
                <li><a href="#parceiros">Parceiros</a></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Cookies</a></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h4>Contato</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="contact-item"><span>✉</span> contato@intermedi.com.br</div>
                <div className="contact-item"><span>📞</span> (11) 99999-9999</div>
              </div>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">
              © 2026 Intermedi. Todos os direitos reservados.{" "}
              <a href="#">Política de Privacidade</a> · <a href="#">Termos de Uso</a>
            </span>

            <div className="lp-footer-socials">
              <a href="#" className="social-btn" aria-label="Instagram">𝕀</a>
              <a href="#" className="social-btn" aria-label="LinkedIn">in</a>
              <a href="#" className="social-btn" aria-label="Facebook">f</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
