import "../../styles/partnersSection.css";

/* ── Icons ── */
const IconFarmacia = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconDistrib = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="9" width="15" height="11" rx="1" />
    <path d="M16 9l4 4v6h-4V9z" />
    <circle cx="5.5" cy="20" r="1.5" />
    <circle cx="18.5" cy="20" r="1.5" />
    <path d="M16 13h4" />
  </svg>
);

const IconLab = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v10l4 8H5l4-8V3z" />
    <line x1="9" y1="7" x2="15" y2="7" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ── Data ── */
const PARTNER_CATEGORIES = [
  {
    type: "Farmácias",
    Icon: IconFarmacia,
    count: "320+",
    desc: "farmácias cadastradas",
    partners: ["Farmácias São Paulo", "Rede Saúde+", "Pharma Express", "Drogaria Central", "Farma Vida", "Saúde & Bem-Estar"],
  },
  {
    type: "Distribuidoras",
    Icon: IconDistrib,
    count: "85+",
    desc: "distribuidoras ativas",
    partners: ["Distrib. Nacional", "MedLogistic", "FarmaDistrib", "Alpha Supply", "Prime Med", "Logimed BR"],
  },
  {
    type: "Laboratórios",
    Icon: IconLab,
    count: "140+",
    desc: "laboratórios parceiros",
    partners: ["BioLab S.A.", "PharmaLab", "GenéricosPlus", "NovaMed", "CienciaFarma", "LabQuality"],
  },
];

const PHARMA_ITEMS = [
  "Gestão inteligente de estoque em tempo real",
  "Compras simplificadas com múltiplos fornecedores",
  "Acesso a rede certificada de distribuidoras",
  "Relatórios e analytics de desempenho",
];

const CONSUMER_ITEMS = [
  "Busca avançada de medicamentos por região",
  "Comparação de preços entre farmácias",
  "Localização das farmácias mais próximas",
  "Verificação de disponibilidade em tempo real",
];

const STATS = [
  { value: "545+", label: "Parceiros ativos" },
  { value: "98%", label: "Satisfação geral" },
  { value: "24h", label: "Suporte disponível" },
  { value: "12M+", label: "Pedidos processados" },
];

export default function PartnersSection() {
  return (
    <section className="section partners" id="partners">
      <div className="section-container">

        {/* ── Header ── */}
        <div className="section-header reveal">
          <div className="section-tag">Parceiros de Confiança</div>
          <h2 className="section-title">
            Parceiros de <span className="green">Confiança</span>
          </h2>
          <p className="section-desc">
            Conectamos farmácias, distribuidores e laboratórios parceiros para
            garantir qualidade, segurança e eficiência na distribuição de
            medicamentos.
          </p>
        </div>

        {/* ── Stats bar ── */}
        <div className="partners-stats reveal">
          {STATS.map(({ value, label }) => (
            <div className="partners-stat" key={label}>
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>

        {/* ── Category cards with partner names ── */}
        <div className="partners-categories reveal">
          {PARTNER_CATEGORIES.map(({ type, Icon, count, desc, partners }) => (
            <div className="category-card" key={type}>
              <div className="category-header">
                <div className="category-icon">
                  <Icon />
                </div>
                <div className="category-meta">
                  <div className="category-count">{count}</div>
                  <div className="category-desc">{desc}</div>
                </div>
              </div>
              <h3 className="category-title">{type}</h3>
              <div className="category-partners">
                {partners.map((name) => (
                  <div className="partner-chip" key={name}>
                    <span className="chip-dot" />
                    {name}
                  </div>
                ))}
              </div>
              <div className="category-footer">
                <div className="category-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star-icon"><IconStar /></span>
                  ))}
                </div>
                <span className="category-rating">4.9 / 5.0</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Benefits cards ── */}
        <div className="partners-cards">
          <div className="partners-card reveal">
            <div className="partners-card-badge">B2B</div>
            <div className="partners-card-title">
              Para <span className="green">Farmácias</span> &amp; Distribuidores
            </div>
            <p className="partners-card-desc">
              Tenha controle total da sua operação com ferramentas desenvolvidas
              especialmente para o setor farmacêutico.
            </p>
            <ul className="partners-list">
              {PHARMA_ITEMS.map((item) => (
                <li key={item}>
                  <div className="check-icon"><IconCheck /></div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="partners-card-btn">Seja um parceiro</button>
          </div>

          <div className="partners-card reveal reveal-delay-1">
            <div className="partners-card-badge">B2C</div>
            <div className="partners-card-title">
              Para <span className="green">Consumidores</span>
            </div>
            <p className="partners-card-desc">
              Encontre o medicamento que precisa com facilidade, segurança e
              o melhor preço da sua região.
            </p>
            <ul className="partners-list">
              {CONSUMER_ITEMS.map((item) => (
                <li key={item}>
                  <div className="check-icon"><IconCheck /></div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="partners-card-btn btn-secondary">Buscar medicamentos</button>
          </div>
        </div>

        {/* ── Trust strip ── */}
        <div className="partners-trust reveal">
          <span className="trust-icon">🔒</span>
          <span>Todos os parceiros são certificados pela ANVISA e seguem rigorosas normas de qualidade e segurança farmacêutica.</span>
        </div>

      </div>
    </section>
  );
}
