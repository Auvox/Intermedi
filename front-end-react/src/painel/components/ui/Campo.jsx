import { Search } from "lucide-react";
import "./Campo.css";

/** Campo de formulário com rótulo em caixa alta e foco verde. */
export function Campo({ rotulo, icone: Icone, tabular = false, textarea = false, className = "", ...resto }) {
  return (
    <label className={`im-campo ${className}`}>
      {rotulo && <span className="im-campo__rotulo">{rotulo}</span>}
      <span className="im-campo__caixa">
        {Icone && <Icone size={16} className="im-campo__icone" />}
        {textarea
          ? <textarea className="im-campo__entrada" rows={3} {...resto} />
          : <input className={`im-campo__entrada ${tabular ? "im-num im-campo__entrada--forte" : ""}`} {...resto} />}
      </span>
    </label>
  );
}

/** Busca compacta usada nas barras de ferramentas. */
export function Busca({ largura = 190, ...resto }) {
  return (
    <span className="im-campo__caixa im-busca">
      <Search size={15} className="im-campo__icone" />
      <input className="im-campo__entrada" style={{ width: largura }} {...resto} />
    </span>
  );
}
