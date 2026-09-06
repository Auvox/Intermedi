import "./Card.css";

/**
 * Superfície branca padrão do painel.
 * `elevar` liga a subida no hover; `sombraDeslocada` aplica a assinatura
 * verde herdada da home page (use com parcimônia, em um card por tela).
 */
export function Card({
  children,
  elevar = true,
  sombraDeslocada = false,
  tracejado = false,
  className = "",
  style,
}) {
  const classes = [
    "im-card",
    elevar && "im-card--elevar",
    sombraDeslocada && "im-card--deslocada",
    tracejado && "im-card--tracejado",
    className,
  ].filter(Boolean).join(" ");

  return <div className={classes} style={style}>{children}</div>;
}
