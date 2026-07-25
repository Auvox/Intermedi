import { MoreHorizontal, Repeat2 } from "lucide-react";
import { Tag, StatusTag, TipoTag, Botao } from "../ui";
import { corUrgencia } from "../../styles/tokens";
import "./Tabela.css";

const COLUNAS = ["Chamado", "Tipo", "Medicamento", "Qtd.", "Urgência", "Unidade", "Matches", "Status", ""];

/** Lista de chamados em formato de tabela. */
export function TabelaChamados({ chamados }) {
  return (
    <div className="im-tabela__rolagem">
      <table className="im-tabela" style={{ minWidth: 900 }}>
        <thead>
          <tr>
            {COLUNAS.map((coluna, i) => <th key={i}>{coluna}</th>)}
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.id}>
              <td>
                <p className="im-tabela__forte">{chamado.id}</p>
                <p className="im-tabela__fraco">{chamado.data}</p>
              </td>
              <td><TipoTag tipo={chamado.tipo} /></td>
              <td><p className="im-tabela__forte">{chamado.medicamento}</p></td>
              <td className="im-tabela__forte im-num">{chamado.quantidade}</td>
              <td>
                <span className="im-tabela__urgencia" style={{ color: corUrgencia[chamado.urgencia] }}>
                  <span className="im-tabela__bolinha" style={{ background: corUrgencia[chamado.urgencia] }} />
                  {chamado.urgencia}
                </span>
              </td>
              <td className="im-tabela__fraco">{chamado.unidade}</td>
              <td>
                {chamado.matches > 0
                  ? <Tag tom="verde"><Repeat2 size={12} strokeWidth={3} />{chamado.matches}</Tag>
                  : <span className="im-tabela__fraco">—</span>}
              </td>
              <td><StatusTag status={chamado.status} /></td>
              <td className="im-tabela__direita">
                <Botao variante="icone" aria-label="Mais opções"><MoreHorizontal size={15} /></Botao>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
