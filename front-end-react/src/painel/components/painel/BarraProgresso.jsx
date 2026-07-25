import "./BarraProgresso.css";

/** Trilho fino com preenchimento animado. */
export function BarraProgresso({ porcentagem, pronto = true, alerta = false, altura = 8, largura }) {
  return (
    <div className="im-barra" style={{ height: altura, width: largura }}>
      <div
        className={`im-barra__preenchimento ${alerta ? "im-barra__preenchimento--alerta" : ""}`}
        style={{ width: pronto ? `${porcentagem}%` : "0%" }}
      />
    </div>
  );
}
