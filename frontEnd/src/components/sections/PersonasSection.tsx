import "../../styles/personas.css";

const pharmacyItems = [
  "Cadastre medicamentos disponíveis e em falta",
  "Abra chamados de sobra ou falta de estoque",
  "Receba matches automáticos com farmácias complementares",
  "Gerencie pedidos diretamente na plataforma",
  "Parceiros verificados pela ANVISA",
];

const patientItems = [
  "Busque remédios disponíveis por nome ou princípio ativo",
  "Veja quais farmácias próximas têm em estoque",
  "Saiba se um medicamento está em falta na região",
  "Compare disponibilidade sem sair de casa",
  "Informações atualizadas em tempo real",
];

function CheckIcon({ color }: { color: "green" | "blue" }) {
  return (
    <span className={`check ${color}`}>
      <svg viewBox="0 0 24 24" stroke={color === "blue" ? "#2563eb" : undefined}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export default function PersonasSection() {
  return (
    <section className="section personas" id="personas">
      <div className="section-container">
        <div className="section-header reveal">
          <div className="section-tag">Para quem é a Intermedi</div>
          <h2 className="section-title">Duas personas, <span className="green">uma plataforma</span></h2>
          <p className="section-desc">
            A Intermedi serve tanto farmácias que precisam gerenciar seu estoque, quanto
            pacientes que buscam medicamentos disponíveis na sua região.
          </p>
        </div>

        <div className="personas-grid">
          {/* FARMÁCIA */}
          <div className="persona-card farmacia reveal">
            <div className="persona-icon-wrap green-bg">
              <svg viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="persona-label green">Para farmácias</div>
            <h3 className="persona-title">Gerencie estoque e encontre parceiros</h3>
            <p className="persona-desc">
              Cadastre seu estoque, abra chamados quando um remédio estiver faltando ou sobrando
              e receba matches automáticos com outras farmácias.
            </p>
            <ul className="persona-list">
              {pharmacyItems.map((item) => (
                <li key={item}>
                  <CheckIcon color="green" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#cadastro" className="persona-btn persona-btn-green">Cadastrar minha farmácia</a>
          </div>

          {/* USUÁRIO/PACIENTE */}
          <div className="persona-card usuario reveal reveal-d1">
            <div className="persona-icon-wrap blue-bg">
              <svg viewBox="0 0 24 24" stroke="#2563eb">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="persona-label blue">Para pacientes</div>
            <h3 className="persona-title">Encontre o remédio que você precisa</h3>
            <p className="persona-desc">
              Busque por medicamentos na sua região e descubra qual farmácia tem disponível agora,
              sem precisar ligar para dezenas de lugares.
            </p>
            <ul className="persona-list">
              {patientItems.map((item) => (
                <li key={item}>
                  <CheckIcon color="blue" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#buscar" className="persona-btn persona-btn-blue">Buscar medicamento</a>
          </div>
        </div>
      </div>
    </section>
  );
}
