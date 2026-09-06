import "./ChartTip.css";

/**
 * Tooltip dos gráficos.
 * Cartão claro, rótulo em caixa alta e uma régua colorida por série —
 * a mesma linguagem das etiquetas do restante do painel.
 */
export function ChartTip({ active, payload, label, prefixo = "", sufixo = "" }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="im-tip">
      <p className="im-tip__rotulo">{label}</p>
      {payload.map((serie, i) => (
        <div className="im-tip__linha" key={i}>
          <span className="im-tip__regua" style={{ background: serie.color }} />
          <span className="im-tip__nome">{serie.name}</span>
          <span className="im-tip__valor im-num">{prefixo}{serie.value}{sufixo}</span>
        </div>
      ))}
    </div>
  );
}
