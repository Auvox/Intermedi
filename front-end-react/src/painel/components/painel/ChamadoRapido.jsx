import { useState } from "react";
import { Sparkles, Pill, ArrowRight, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card, Botao, Eyebrow, Campo } from "../ui";
import { corUrgencia } from "../../styles/tokens";
import "./ChamadoRapido.css";

const URGENCIAS = ["Baixa", "Alta", "Crítica"];

/** Abertura de chamado direto do painel, em três campos. */
export function ChamadoRapido({ aoPublicar }) {
  const [tipo, setTipo] = useState("Falta");
  const [urgencia, setUrgencia] = useState("Alta");

  return (
    <Card elevar={false} sombraDeslocada className="im-rapido">
      <header className="im-rapido__cabecalho">
        <p className="im-rapido__marcador">
          <Sparkles size={16} /> <Eyebrow verde>Chamado rápido</Eyebrow>
        </p>
        <h3 className="im-rapido__titulo">
          Publique em 3 campos.<br />A rede procura o par.
        </h3>
      </header>

      <div className="im-rapido__corpo">
        <div className="im-rapido__tipos">
          {["Falta", "Sobra"].map((opcao) => {
            const Icone = opcao === "Falta" ? ArrowDownLeft : ArrowUpRight;
            return (
              <button
                key={opcao}
                onClick={() => setTipo(opcao)}
                className={`im-rapido__tipo ${tipo === opcao ? `im-rapido__tipo--ativo im-rapido__tipo--${opcao.toLowerCase()}` : ""}`}
              >
                <Icone size={15} strokeWidth={3} />
                {opcao === "Falta" ? "Está faltando" : "Está sobrando"}
              </button>
            );
          })}
        </div>

        <Campo
          rotulo="Medicamento"
          icone={Pill}
          defaultValue="Insulina NPH Humana 100 UI/mL"
          className="im-rapido__campo"
        />

        <div className="im-rapido__dupla">
          <Campo rotulo="Quantidade" defaultValue="120" tabular />

          <div>
            <span className="im-campo__rotulo">Urgência</span>
            <div className="im-rapido__urgencias">
              {URGENCIAS.map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setUrgencia(nivel)}
                  className="im-rapido__urgencia"
                  style={urgencia === nivel
                    ? { background: corUrgencia[nivel], borderColor: corUrgencia[nivel], color: "#fff" }
                    : undefined}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="im-rapido__rodape">
        <p className="im-rapido__dica">
          <strong>7 farmácias</strong> na sua região têm esse item
        </p>
        <Botao onClick={aoPublicar}>
          Publicar chamado <ArrowRight size={15} strokeWidth={3} />
        </Botao>
      </footer>
    </Card>
  );
}
