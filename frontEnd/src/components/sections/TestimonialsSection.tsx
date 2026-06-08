import "../../styles/testimonialsSection.css";

const TESTIMONIALS = [
  { name: "Ana Costa",     role: "Gerente, Farmácia Central SP", initials: "AC", color: "#2ecc71", stars: 5, text: "A Intermedi transformou nossa gestão de compras. Reduzimos o tempo de pedidos em 60% e temos acesso a muito mais fornecedores confiáveis." },
  { name: "Carlos Melo",   role: "Diretor, Distrib. Nacional",    initials: "CM", color: "#3b82f6", stars: 5, text: "Excelente plataforma B2B. Conseguimos expandir nossa rede de clientes rapidamente e o suporte é sempre eficiente e rápido." },
  { name: "Fernanda Lima",  role: "Farmacêutica, Rede Saúde+",    initials: "FL", color: "#8b5cf6", stars: 5, text: "Nunca foi tão fácil encontrar medicamentos específicos. A busca avançada e os filtros fazem toda a diferença no nosso dia a dia." },
  { name: "Ricardo Alves", role: "CEO, PharmaDistrib",            initials: "RA", color: "#f59e0b", stars: 5, text: "A integração com nosso sistema foi simples e o dashboard de analytics nos ajuda a tomar decisões muito mais embasadas." },
  { name: "Juliana Souza", role: "Proprietária, Farma Vida",      initials: "JS", color: "#ef4444", stars: 5, text: "Plataforma intuitiva, preços competitivos e fornecedores verificados. Recomendo para qualquer farmácia que quer crescer." },
  { name: "Paulo Ribeiro", role: "Gerente, Alpha Supply",         initials: "PR", color: "#10b981", stars: 5, text: "A certificação ANVISA dos parceiros nos dá total confiança. Nossa operação ficou muito mais profissional e estruturada." },
];

const TESTIMONIALS_2 = [
  { name: "Mariana Neves", role: "Farmácia Bela Vista",           initials: "MN", color: "#f97316", stars: 5, text: "O rastreamento de entregas em tempo real é incrível. Nossos clientes ficam muito mais satisfeitos com a agilidade no atendimento." },
  { name: "Thiago Barros", role: "MedLogistic BR",                initials: "TB", color: "#06b6d4", stars: 5, text: "A plataforma é completa e muito fácil de usar. Nosso time adotou rapidamente e já vemos resultados concretos todo mês." },
  { name: "Camila Ferreira",role: "BioLab S.A.",                  initials: "CF", color: "#d946ef", stars: 5, text: "Ótima experiência desde o cadastro até a primeira entrega. O processo é transparente e a equipe muito prestativa." },
  { name: "Diego Martins", role: "Prime Med Distribuidora",       initials: "DM", color: "#64748b", stars: 5, text: "Conseguimos atingir farmácias em novas regiões graças à rede Intermedi. O crescimento foi expressivo já no primeiro trimestre." },
  { name: "Larissa Pinto", role: "Drogaria Central RJ",           initials: "LP", color: "#84cc16", stars: 5, text: "Sistema confiável, rápido e com excelente custo-benefício. Não consigo mais imaginar nossa operação sem a Intermedi." },
  { name: "Renato Cruz",   role: "CienciaFarma Lab",             initials: "RC", color: "#14b8a6", stars: 5, text: "Parceria que gera resultados reais. A visibilidade que ganhamos na plataforma aumentou nossas vendas em mais de 40%." },
];

const Card = ({ name, role, initials, color, stars, text }: typeof TESTIMONIALS[0]) => (
  <div className="testi-card">
    <div className="testi-stars">{[...Array(stars)].map((_,i) => <span key={i} className="testi-star">★</span>)}</div>
    <p className="testi-text">{text}</p>
    <div className="testi-author">
      <div className="testi-avatar" style={{ background: color }}>{initials}</div>
      <div>
        <div className="testi-name">{name}</div>
        <div className="testi-role">{role}</div>
      </div>
      <div className="testi-verified">✓ Verificado</div>
    </div>
  </div>
);

export default function TestimonialsSection() {
  const double = [...TESTIMONIALS, ...TESTIMONIALS];
  const double2 = [...TESTIMONIALS_2, ...TESTIMONIALS_2];
  return (
    <section className="section testimonials" id="testimonials">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-tag">Depoimentos</div>
          <h2 className="section-title">O que nossos <span className="green">parceiros</span> dizem</h2>
          <p className="section-desc">Mais de 545 empresas já transformaram sua operação farmacêutica com a Intermedi.</p>
        </div>
      </div>
      <div className="testimonials-track-wrap">
        <div className="testimonials-track">{double.map((t,i) => <Card key={i} {...t} />)}</div>
      </div>
      <div className="testimonials-track-wrap row2">
        <div className="testimonials-track">{double2.map((t,i) => <Card key={i} {...t} />)}</div>
      </div>
    </section>
  );
}
