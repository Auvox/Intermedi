import { Radar, Repeat2, Truck } from "lucide-react";
import { Card, Eyebrow } from "../ui";
import "./PassosDoMatch.css";

/** Explica o que acontece depois que o chamado é publicado. */
const PASSOS = [
  { icone: Radar,   titulo: "A rede cruza os dados",   texto: "Princípio ativo, apresentação, lote, validade restante e distância." },
  { icone: Repeat2, titulo: "Você recebe os matches",  texto: "Farmácias verificadas com o item exato, ordenadas por compatibilidade." },
  { icone: Truck,   titulo: "Vocês combinam a troca",  texto: "Aceite, negocie o valor e acompanhe a retirada ou a entrega." },
];

export function PassosDoMatch() {
  return (
    <Card className="im-passos">
      <Eyebrow>O que acontece depois</Eyebrow>

      <ol className="im-passos__lista">
        {PASSOS.map(({ icone: Icone, titulo, texto }, i) => (
          <li className="im-passos__item" key={titulo}>
            <div className="im-passos__trilha">
              <span className="im-passos__icone"><Icone size={16} strokeWidth={2.5} /></span>
              {i < PASSOS.length - 1 && <span className="im-passos__fio" />}
            </div>
            <div className="im-passos__texto">
              <p className="im-passos__titulo">{titulo}</p>
              <p className="im-passos__descricao">{texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
