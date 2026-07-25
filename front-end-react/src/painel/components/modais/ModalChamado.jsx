import { useState } from "react";
import {
  X, Pill, ArrowRight, ArrowDownLeft, ArrowUpRight, CheckCircle2,
} from "lucide-react";
import { Modal, ModalRodape, Botao, Eyebrow, Campo } from "../ui";
import { MatchCard } from "../painel";
import { MATCHES } from "../../data/matches";
import { corUrgencia } from "../../styles/tokens";
import "./formulario.css";
import "./ModalChamado.css";

const URGENCIAS = ["Baixa", "Alta", "Crítica"];
const RAIOS = ["5 km", "15 km", "30 km", "Todo o estado"];

const TIPOS = [
  { valor: "Falta", descricao: "Preciso repor um item",           icone: ArrowDownLeft },
  { valor: "Sobra", descricao: "Tenho excedente para repassar",   icone: ArrowUpRight },
];

/**
 * Abertura de chamado em duas etapas:
 * 1) preenchimento  2) resultado simulado do cruzamento.
 */
export function ModalChamado({ aoFechar }) {
  const [etapa, setEtapa] = useState(1);
  const [tipo, setTipo] = useState("Falta");
  const [urgencia, setUrgencia] = useState("Crítica");
  const [raio, setRaio] = useState("15 km");

  const preenchendo = etapa === 1;

  return (
    <Modal aoFechar={aoFechar} largura={660}>
      <header className="im-form__cabecalho">
        <div>
          <Eyebrow verde>{preenchendo ? "Novo chamado" : "Resultado do cruzamento"}</Eyebrow>
          <h3 className="im-form__titulo">
            {preenchendo
              ? "O que a sua farmácia precisa resolver?"
              : "Encontramos 4 farmácias compatíveis"}
          </h3>
        </div>
        <button className="im-form__fechar" onClick={aoFechar} aria-label="Fechar">
          <X size={18} />
        </button>
      </header>

      {preenchendo ? (
        <div className="im-form__corpo">
          <div className="im-chamado__tipos">
            {TIPOS.map(({ valor, descricao, icone: Icone }) => (
              <button
                key={valor}
                onClick={() => setTipo(valor)}
                className={`im-chamado__tipo ${tipo === valor ? `im-chamado__tipo--ativo im-chamado__tipo--${valor.toLowerCase()}` : ""}`}
              >
                <Icone size={20} strokeWidth={3} />
                <span className="im-chamado__tipo-nome">{valor}</span>
                <span className="im-chamado__tipo-descricao">{descricao}</span>
              </button>
            ))}
          </div>

          <div className="im-form__grupo">
            <Campo
              rotulo="Medicamento"
              icone={Pill}
              defaultValue="Insulina NPH Humana 100 UI/mL — Novo Nordisk"
            />
          </div>

          <div className="im-form__grupo im-form__campos im-form__campos--3">
            <Campo rotulo="Quantidade" defaultValue="120" tabular />
            <Campo rotulo="Lote" defaultValue="L-77190" tabular />
            <Campo rotulo="Validade" defaultValue="01/2027" tabular />
          </div>

          <div className="im-form__grupo">
            <span className="im-campo__rotulo">Urgência</span>
            <div className="im-form__opcoes">
              {URGENCIAS.map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setUrgencia(nivel)}
                  className="im-form__opcao"
                  style={urgencia === nivel
                    ? { background: corUrgencia[nivel], borderColor: corUrgencia[nivel], color: "#fff" }
                    : undefined}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>

          <div className="im-form__grupo">
            <span className="im-campo__rotulo">Raio de busca</span>
            <div className="im-form__opcoes">
              {RAIOS.map((opcao) => (
                <button
                  key={opcao}
                  onClick={() => setRaio(opcao)}
                  className={`im-form__opcao ${raio === opcao ? "im-form__opcao--ativa" : ""}`}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>

          <div className="im-form__grupo">
            <Campo
              rotulo="Observações para a outra farmácia"
              textarea
              defaultValue="Refrigerado, transporte com caixa térmica. Retirada preferencial até 18h."
            />
          </div>
        </div>
      ) : (
        <div className="im-form__corpo">
          <p className="im-chamado__confirmacao">
            <CheckCircle2 size={18} />
            Chamado CHM-2842 publicado. A rede respondeu em 8 segundos.
          </p>
          <div className="im-chamado__resultados">
            <MatchCard match={MATCHES[0]} compacto />
            <MatchCard match={MATCHES[2]} compacto />
          </div>
        </div>
      )}

      <ModalRodape
        aviso={preenchendo
          ? "O chamado fica visível apenas para farmácias verificadas da rede."
          : "Aceite um match para iniciar a negociação."}
      >
        <Botao variante="neutro" onClick={preenchendo ? aoFechar : () => setEtapa(1)}>
          {preenchendo ? "Cancelar" : "Voltar"}
        </Botao>
        <Botao onClick={preenchendo ? () => setEtapa(2) : aoFechar}>
          {preenchendo
            ? <>Publicar chamado <ArrowRight size={15} strokeWidth={3} /></>
            : "Concluir"}
        </Botao>
      </ModalRodape>
    </Modal>
  );
}
