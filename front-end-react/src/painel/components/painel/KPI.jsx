import { Card, Tag } from "../ui";
import { useContagem } from "../../hooks/useContagem";
import { numero } from "../../utils/formato";
import "./KPI.css";

/**
 * Cartão de indicador.
 * Passe `valor` numérico para a contagem animada, ou `texto` quando
 * o número não for contável (ex.: "2h14").
 */
export function KPI({
  rotulo,
  valor,
  texto,
  decimais = 0,
  prefixo = "",
  sufixo = "",
  variacao,
  positivo = true,
  icone: Icone,
}) {
  const animado = useContagem(typeof valor === "number" ? valor : 0);

  return (
    <Card className="im-kpi">
      <div className="im-kpi__topo">
        <span className="im-kpi__icone"><Icone size={19} strokeWidth={2.4} /></span>
        {variacao && (
          <Tag tom={positivo ? "verde" : "vermelho"}>
            {positivo ? "▲" : "▼"} {variacao}
          </Tag>
        )}
      </div>

      <p className="im-kpi__valor im-num">
        {texto ?? (
          <>
            {prefixo}{numero(animado, decimais)}
            {sufixo && <span className="im-kpi__sufixo">{sufixo}</span>}
          </>
        )}
      </p>

      <p className="im-kpi__rotulo">{rotulo}</p>
    </Card>
  );
}
