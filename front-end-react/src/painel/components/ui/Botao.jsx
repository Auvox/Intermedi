import "./Botao.css";

/**
 * Botão do painel.
 * variante: "primario" (gradiente + varredura de luz) | "neutro" | "sutil" | "icone"
 */
export function Botao({
  children,
  variante = "primario",
  onClick,
  largura,
  className = "",
  style,
  ...resto
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`im-botao im-botao--${variante} ${className}`}
      style={{ ...(largura ? { minWidth: largura } : null), ...style }}
      {...resto}
    >
      <span className="im-botao__conteudo">{children}</span>
    </button>
  );
}
