
import { useState, useEffect, useRef } from "react";
import "./LandingPage.css"; // Se o seu CSS principal for esse arquivo
import logoIntermedi from "./assets/logoIntermedi.png";
import pilula from "./assets/pilula.png";
import mancha from "./assets/mancha.png";
import fundoCruz from "./assets/fundoCruz.png"
import logoI from "./assets/logoI.png"
import logoFooter from "./assets/logoFooter.png"


  function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { 
          // Ativa o container pai
          el.classList.add("visible"); 
          
          // Busca e ativa TODOS os elementos com a classe 'reveal' lá dentro
          const children = el.querySelectorAll(".reveal");
          children.forEach(child => {
            child.classList.add("visible");
          });
          
          obs.disconnect(); 
        }
      },
      { 
        threshold: 0, // 0 significa: encostou 1 pixel na tela, ele já dispara
        rootMargin: "0px 0px -50px 0px" // Dispara um pouquinho antes de aparecer totalmente
      }
    );
    
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  
  return ref;
}

/* ─── WHY CARDS DATA ─── */
const whyCards = [
  {
    icon: "bx bx-package",
    title: <><strong>Estoque</strong> <span className="green">Inteligente</span></>,
    desc: "Medicamentos e produtos disponíveis com atualização em tempo real.",
  },
  {
    icon: "bx bx-shield-quarter",
    title: <><strong>Plataforma</strong> <span className="green">Segura</span></>,
    desc: "Transações protegidas e fornecedores verificados para maior tranquilidade.",
  },
  {
    icon: "bx bx-package",
    title: <><strong>Distribuição</strong> <span className="green">Rápida</span></>,
    desc: "Entregas otimizadas para garantir velocidade e eficiência operacional.",
  },
];

/* ─── HOW STEPS DATA ─── */
const howSteps = [
  { icon: "bx bx-search", title: "Busca" },
  { icon: "bx bx-building-house", title: "Fornecedor" },
  { icon: "bx bx-clipboard", title: "Pedido" },
  { icon: "bx bxs-package", title: "Entrega" },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whyRef  = useReveal();
  const howRef  = useReveal();
  const partRef = useReveal();

  return (
    <div className="lp-root">

      {/* ══════════ NAV ══════════ */}
      <nav className={`lp-nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="lp-logo">
          <img src={logoIntermedi} alt="Intermedi" className="lp-logo-img" />
        </a>

        <ul className="lp-nav-links">
          <li className="active"><a href="#inicio">Inicio</a></li>
          <li><a href="#como-funciona">Como funciona</a></li>
          <li><a href="#catalogo">Catálogo <i className="bx bx-chevron-down" /></a></li>
          <li><a href="#parceiros">Parceiros</a></li>
        </ul>

        <div className="lp-nav-actions">
          <button className="btn-nav-primary">Entrar</button>
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
        <button className="btn-nav-primary" style={{ marginTop: 8 }}>Entrar</button>
      </div>

{/* ══════════ HERO ══════════ */}
      <section className="lp-hero" id="inicio">
        {/* Background decorativo da cruz no fundo esquerdo */}
        <img src={fundoCruz} alt="" className="lp-bg-cruz-back" aria-hidden />

        <div className="lp-hero-inner">
          {/* LEFT */}
          <div className="lp-hero-content">
            <h1 className="lp-hero-title">
            <span className="green">Inter</span>ligando<br />
              <strong>
                med
                <img src={logoI} alt="I" className="lp-hero-logo-i" />
                camentos
              </strong>
            </h1>
            <div className="lp-hero-actions">
              <button className="btn-hero-primary">Explorar catálogo</button>
              <button className="btn-hero-outline">Saiba mais</button>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div className="lp-hero-visual">
            <div className="lp-hero-img-wrap">
              {/* Mancha verde de fundo */}
              <img src={mancha} alt="" className="lp-hero-mancha" aria-hidden />
              
              {/* Pílula principal */}
              <img src={pilula} alt="Pílula Intermedi" className="lp-hero-pilula" />

              {/* FLOATING CARD 1: Medicamento (Fica em cima/esquerda da pílula) */}
              <div className="lp-float-card card-medicamento">
                <div className="lp-float-icon-wrapper">
                 <i className='bx bx-capsule'/>
                </div>
                <span>Medicamento</span>
              </div>

              {/* FLOATING CARD 2: Conexão (Fica embaixo/direita da pílula) */}
              <div className="lp-float-card card-conexao">
                <div className="lp-float-icon-wrapper">
                  <i className="bx bx-share-alt" />
                </div>
                <span>Conexão</span>
              

              {/* Símbolos de + (cruzes verdes) flutuando no fundo direito */}
              <img src={fundoCruz} className="lp-bg-cruz-back"/>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHY ══════════ */}
      <section className="lp-section lp-why" id="catalogo">
  {/* O ref foi movido para cá, englobando todo o conteúdo da seção */}
  <div className="lp-section-inner" ref={whyRef}>
    
    {/* Mantém a classe reveal para o cabeçalho ser animado também */}
    <div className="lp-section-head reveal">
      <h2 className="lp-section-title">
        <span className="chevron-left">▶</span>
        {" "}Por que <span className="green">escolher</span> a <span className="green">Inter</span>medi ?{" "}
        <span className="chevron-right">◀</span>
      </h2>
      <p className="lp-section-sub">
        Encontre os medicamentos que sua farmácia precisa em nosso<br />
        catalogo completo e atualizado.
      </p>
    </div>

    <div className="lp-why-cards">
      {whyCards.map((card, i) => (
        <div className={`lp-why-card reveal reveal-delay-${i + 1}`} key={i}>
          <div className="lp-why-card-left">
            <h3>{card.title}</h3>
            <div className="lp-why-underline" />
            <p>{card.desc}</p>
          </div>
          <div className="lp-why-icon">
            <i className={card.icon} />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ══════════ HOW IT WORKS ══════════ */}
<section className="lp-section lp-how" id="como-funciona">
  <div className="lp-section-inner" ref={howRef}>
    
    <div className="lp-section-head reveal">
      <h2 className="lp-section-title">
        <span className="chevron-left">▶</span>
        {" "}Como a <span className="green">Inter</span><span className="green">medi</span> funciona{" "}
        <span className="chevron-right">◀</span>
      </h2>
      <p className="lp-section-sub">
        Encontre, solicite e acompanhe medicamentos em uma plataforma integrada, segura e eficiente.
      </p>
    </div>

    {/* CONTAINER ESSENCIAL PARA O ALINHAMENTO DO GRID */}
    <div className="lp-how-container reveal">
      
      {/* TRACK DAS BOLINHAS */}
      <div className="lp-how-track">
        {howSteps.map((step, i) => (
          <div className="lp-how-step" key={i}>
            <div className="lp-how-circle">
              <i className={step.icon} />
            </div>
            {/* A div da seta agora fica vazia para o CSS desenhar a linha e o triângulo */}
            {i < howSteps.length - 1 && (
              <div className="lp-how-arrow" />
            )}
          </div>
        ))}
      </div>

      {/* LABELS SIMÉTRICAS */}
      <div className="lp-how-labels">
        {howSteps.map((step, i) => (
          <div className="lp-how-label" key={i}>
            <span>{step.title}</span>
          </div>
        ))}
      </div>

    </div>

  </div>
</section>

      
      {/* ══════════ PARTNERS ══════════ */}
<section className="lp-section lp-partners" id="parceiros">
  {/* Movemos o ref para o container inner para ativar toda a animação da seção */}
  <div className="lp-section-inner" ref={partRef}>
    
    <div className="lp-section-head reveal">
      <h2 className="lp-section-title">
        <span className="chevron-left">▶</span>
        {" "}Parceiros de <span className="green">Confiança</span>{" "}
        <span className="chevron-right">◀</span>
      </h2>
      <p className="lp-section-sub">
        Conectamos farmácias, distribuidores e laboratórios parceiros para garantir qualidade, segurança e
        eficiência na distribuição de medicamentos.
      </p>
    </div>

    <div className="lp-partners-grid">
      <div className="lp-partner-card lp-partner-card--green reveal reveal-delay-1">
        {/* decorative curves */}
        <div className="partner-deco deco-br" />
      </div>
      <div className="lp-partner-card lp-partner-card--white reveal reveal-delay-2">
        <div className="partner-deco deco-br" />
      </div>
    </div>

    <div className="lp-partners-lists">
      <div className="lp-partner-list-card reveal reveal-delay-3">
        <div className="lp-partner-list-title">Para <span className="green">Farmácias &amp; Distribuidores</span></div>
        <ul>
          {["Gestão de estoque", "Compras simplificadas", "Fornecedores confiáveis", "Relatorios inteligentes"].map(item => (
            <li key={item}><i className="bx bx-check" />{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="lp-partner-list-card reveal reveal-delay-4">
        <div className="lp-partner-list-title">Para <span className="green">Consumidores</span></div>
        <ul>
          {["Busca de medicamentos", "Comparação de preços", "Localização das farmácias", "Disponibilidades em tempo real"].map(item => (
            <li key={item}><i className="bx bx-check" />{item}</li>
          ))}
        </ul>
      </div>
    </div>

  </div>
</section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <img src={logoFooter} alt="Intermedi" className="lp-footer-logo" />
            <p>Interligando medicamentos</p>
            <div className="lp-footer-socials">
              <a href="#" aria-label="Instagram"><i className="bx bxl-instagram" /></a>
              <a href="#" aria-label="LinkedIn"><i className="bx bxl-linkedin" /></a>
              <a href="#" aria-label="Facebook"><i className="bx bxl-facebook" /></a>
            </div>
          </div>

          <div className="lp-footer-col">
            <h4>Links</h4>
            <ul>
              <li><a href="#inicio">• Inicio</a></li>
              <li><a href="#como-funciona">• Como funciona</a></li>
              <li><a href="#catalogo">• Catálogo</a></li>
              <li><a href="#parceiros">• Parceiros</a></li>
            </ul>
          </div>

          <div className="lp-footer-col">
            <h4>Contato</h4>
            <div className="footer-contact-item">
              <i className="bx bx-envelope" />
              <span>contatointermedi.com.br</span>
            </div>
            <div className="footer-contact-item">
              <i className="bx bx-phone" />
              <span>(11) 99999-9999</span>
            </div>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>© 2026 Intermedi. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>

  );
}