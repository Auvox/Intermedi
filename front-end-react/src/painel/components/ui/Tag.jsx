import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import "./Tag.css";

/** Etiqueta genérica em pílula. */
export function Tag({ children, tom = "neutro", className = "", style }) {
  return (
    <span className={`im-tag im-tag--${tom} ${className}`} style={style}>
      {children}
    </span>
  );
}

/** Mapa de status → tom visual. */
const TOM_POR_STATUS = {
  "Aberto":            "cinza",
  "Em match":          "verde",
  "Concluído":         "azul",
  "Disponível":        "verde",
  "Excedente":         "azul",
  "Abaixo do mínimo":  "ambar",
  "Crítico":           "vermelho",
  "Aguardando aceite": "ambar",
  "Em negociação":     "cinza",
  "Parceiro ouro":     "ouro",
  "Parceiro prata":    "prata",
  "Ativo":             "verde",
  "Novo parceiro":     "indigo",
};

/** Etiqueta de status já com a cor certa. */
export function StatusTag({ status }) {
  return <Tag tom={TOM_POR_STATUS[status] || "neutro"}>{status}</Tag>;
}

/**
 * Etiqueta de tipo do chamado.
 * A seta encoda a direção: para dentro quando falta, para fora quando sobra.
 */
export function TipoTag({ tipo }) {
  const falta = tipo === "Falta";
  const Icone = falta ? ArrowDownLeft : ArrowUpRight;
  return (
    <span className={`im-tipo ${falta ? "im-tipo--falta" : "im-tipo--sobra"}`}>
      <Icone size={13} strokeWidth={3} />
      {tipo}
    </span>
  );
}
