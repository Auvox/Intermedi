import { useState } from "react";
import "../../styles/keywordRibbon.css";

const keywords = [
  "Farmácias conectadas",
  "Medicamentos",
  "Gestão de estoque",
  "Fornecedores parceiros",
  "Pedidos simplificados",
  "Mais acesso à saúde",
];

export default function KeywordRibbon() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={`keyword-ribbon${paused ? " is-paused" : ""}`} role="region" aria-label="A Intermedi conecta">
      <div className="keyword-ribbon-window">
        <div className="keyword-ribbon-track">
          {[0, 1].map((copy) => (
            <ul className="keyword-ribbon-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {keywords.map((keyword) => (
                <li key={keyword}>
                  <span>{keyword}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M7 2h6v5h5v6h-5v5H7v-5H2V7h5Z" />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button className="keyword-ribbon-toggle" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Retomar animação da faixa" : "Pausar animação da faixa"}>
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          {paused ? <path d="m7 4 9 6-9 6Z" /> : <path d="M5 4h3v12H5Zm7 0h3v12h-3Z" />}
        </svg>
      </button>
    </div>
  );
}
