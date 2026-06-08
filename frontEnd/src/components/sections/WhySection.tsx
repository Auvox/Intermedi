import "../../styles/whySection.css";

const IconEstoque = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2h6v3H9z" /><rect x="7" y="5" width="10" height="16" rx="2" />
    <path d="M12 10v6" /><path d="M9 13h6" />
  </svg>
);
const IconPlataforma = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconDistribuicao = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
    <circle cx="19.5" cy="18.5" r="2.5" /><path d="M19.5 21.5v1.5" />
  </svg>
);

const FEATURES = [
  { Icon: IconEstoque,     title: "Estoque",    accent: "Inteligente", num: "01", desc: "Medicamentos e produtos com atualização em tempo real, alertas automáticos de reposição e histórico completo de movimentações." },
  { Icon: IconPlataforma,  title: "Plataforma", accent: "Segura",      num: "02", desc: "Transações protegidas com criptografia de ponta a ponta. Fornecedores verificados pela ANVISA para total tranquilidade." },
  { Icon: IconDistribuicao,title: "Distribuição",accent: "Rápida",     num: "03", desc: "Entregas otimizadas com rastreamento em tempo real. Rede logística integrada garantindo velocidade e eficiência operacional." },
] as const;

export default function WhySection() {
  return (
    <section className="section why" id="why">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-tag">Por que escolher a Intermedi</div>
          <h2 className="section-title">Por que <span className="green">escolher</span> a <span className="green">Inter</span>medi?</h2>
          <p className="section-desc">Encontre os medicamentos que sua farmácia precisa com qualidade, segurança e eficiência garantidas.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map(({ Icon, title, accent, num, desc }, i) => (
            <div key={title} className={`feature-card reveal reveal-delay-${i + 1}`}>
              <div className="feature-num">{num}</div>
              <div className="feature-icon"><Icon /></div>
              <div className="feature-title">{title} <span className="green">{accent}</span></div>
              <div className="feature-divider" />
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
