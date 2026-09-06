import { MoreHorizontal } from "lucide-react";
import { Card, Botao, Eyebrow, StatusTag, TipoTag } from "../ui";
import "./MatchCard.css";

/**
 * Assinatura visual do produto.
 * As duas pontas da troca ficam lado a lado — quem precisa à esquerda,
 * quem tem à direita — costuradas pelo selo de compatibilidade no centro.
 */
export function MatchCard({ match, compacto = false }) {
  return (
    <Card className="im-match">
      <header className="im-match__topo">
        <div className="im-match__identidade">
          <Eyebrow>{match.id}</Eyebrow>
          <StatusTag status={match.status} />
        </div>
        <span className="im-match__logistica">{match.distancia} · {match.prazo}</span>
      </header>

      <div className="im-match__item">
        <p className="im-match__medicamento">{match.medicamento}</p>
        <p className="im-match__detalhe">
          <strong className="im-num">{match.quantidade}</strong> unidades ·
          R$ <span className="im-num">{match.valor}</span>
        </p>
      </div>

      <div className="im-match__par">
        <div className="im-match__face im-match__face--falta">
          <TipoTag tipo="Falta" />
          <p className="im-match__farmacia">{match.falta.farmacia}</p>
          <p className="im-match__cidade">{match.falta.cidade}</p>
          <p className="im-match__chamado">{match.falta.chamado}</p>
        </div>

        <div className="im-match__face im-match__face--sobra">
          <TipoTag tipo="Sobra" />
          <p className="im-match__farmacia">{match.sobra.farmacia}</p>
          <p className="im-match__cidade">{match.sobra.cidade}</p>
          <p className="im-match__chamado">{match.sobra.chamado}</p>
        </div>

        <div className="im-match__selo">
          <span className="im-match__percentual im-num">{match.compatibilidade}%</span>
          <span className="im-match__legenda">MATCH</span>
        </div>
      </div>

      {!compacto && (
        <footer className="im-match__acoes">
          <Botao largura={152}>Aceitar match</Botao>
          <Botao variante="neutro">Negociar</Botao>
          <Botao variante="icone" aria-label="Mais opções">
            <MoreHorizontal size={16} />
          </Botao>
        </footer>
      )}
    </Card>
  );
}
