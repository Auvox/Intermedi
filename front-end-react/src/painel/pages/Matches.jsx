import { Target, Repeat2, Radar, Plus } from "lucide-react";
import { Secao } from "../components/layout";
import { Card, Tag } from "../components/ui";
import { MatchCard } from "../components/painel";
import { MATCHES } from "../data/matches";
import "./Matches.css";

const NUMEROS = [
  { valor: "4",   rotulo: "aguardando aceite" },
  { valor: "74",  rotulo: "no mês" },
  { valor: "98%", rotulo: "melhor compatibilidade" },
];

export default function Matches() {
  return (
    <>
      <Secao
        icone={Target}
        rotulo="Seção 1"
        titulo="Motor de compatibilidade"
        descricao="O critério que a rede usa para aproximar duas farmácias."
      >
        <div className="im-motor">
          <div className="im-motor__texto">
            <Tag tom="vidro"><Radar size={12} /> Cruzamento ativo</Tag>
            <h3 className="im-motor__titulo">
              4 farmácias têm exatamente<br />o que falta em você.
            </h3>
            <p className="im-motor__descricao">
              O cálculo considera princípio ativo, apresentação, lote, validade
              restante e distância entre as unidades.
            </p>
          </div>

          <div className="im-motor__numeros">
            {NUMEROS.map(({ valor, rotulo }) => (
              <div key={rotulo}>
                <p className="im-motor__numero im-num">{valor}</p>
                <p className="im-motor__legenda">{rotulo}</p>
              </div>
            ))}
          </div>
        </div>
      </Secao>

      <Secao
        icone={Repeat2}
        rotulo="Seção 2"
        titulo="Matches encontrados"
        descricao="Passe o mouse em um card para ver as duas pontas da troca."
        atraso={100}
      >
        <div className="im-matches">
          {MATCHES.map((match) => <MatchCard key={match.id} match={match} />)}

          <Card tracejado className="im-matches__vazio">
            <span className="im-matches__vazio-icone"><Plus size={22} strokeWidth={3} /></span>
            <p className="im-matches__vazio-titulo">Sem mais matches por enquanto</p>
            <p className="im-matches__vazio-texto">
              Publique um chamado de falta ou de sobra para a rede voltar a procurar.
            </p>
          </Card>
        </div>
      </Secao>
    </>
  );
}
