import "./Abas.css";

/** Controle segmentado: filtros, períodos, tipos. */
export function Abas({ opcoes, ativa, aoTrocar, className = "" }) {
  return (
    <div className={`im-abas ${className}`} role="tablist">
      {opcoes.map((opcao) => (
        <button
          key={opcao}
          role="tab"
          aria-selected={ativa === opcao}
          onClick={() => aoTrocar && aoTrocar(opcao)}
          className={`im-abas__item ${ativa === opcao ? "im-abas__item--ativa" : ""}`}
        >
          {opcao}
        </button>
      ))}
    </div>
  );
}
