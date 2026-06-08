import "../../styles/howSection.css";

const steps = [
  {
    num: 1,
    label: "Farmácia cadastra",
    desc: "A farmácia cadastra seus medicamentos e abre um chamado informando falta ou sobra de estoque",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: 2,
    label: "Sistema busca",
    desc: "A plataforma verifica em tempo real se há outro chamado complementar para o mesmo medicamento",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: 3,
    label: "Match realizado",
    desc: "Quando há correspondência (falta + sobra), o sistema faz o match e notifica ambas as farmácias",
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
      </svg>
    ),
  },
  {
    num: 4,
    label: "Transferência",
    desc: "A farmácia com sobra fornece para a que está em falta, resolvendo o problema rapidamente",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="1" y="9" width="15" height="11" rx="1" />
        <path d="M16 9l4 4v6h-4V9z" />
        <circle cx="5.5" cy="20" r="1.5" /><circle cx="18.5" cy="20" r="1.5" />
      </svg>
    ),
  },
];

export default function HowSection() {
  return (
    <section className="section how" id="how">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-tag">Sistema de Match</div>
          <h2 className="section-title">Como o <span className="green">match</span> funciona</h2>
          <p className="section-desc">
            Nossa plataforma conecta automaticamente farmácias com excesso de estoque às que
            estão com falta do mesmo medicamento.
          </p>
        </div>

        <div className="how-steps reveal">
          {steps.map(({ num, label, desc, icon }) => (
            <div className="how-step" key={num}>
              <div className="how-step-circle">
                {icon}
                <span className="how-step-num">{num}</span>
              </div>
              <div className="how-step-label">{label}</div>
              <p className="how-step-desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="how-match-banner reveal">
          <div className="how-match-icon">
            <svg viewBox="0 0 24 24">
              <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
            </svg>
          </div>
          <div className="how-match-text">
            <h3>Sistema de Match Inteligente</h3>
            <p>
              Quando duas farmácias abrem chamados complementares para o mesmo medicamento —
              uma com falta e outra com sobra — a Intermedi identifica automaticamente a
              correspondência e conecta as duas partes para resolver o problema.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
