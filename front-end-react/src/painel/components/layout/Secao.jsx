import { ChevronRight } from "lucide-react";
import { Eyebrow } from "../ui";
import "./Secao.css";

/**
 * Delimitador de seção da página.
 * O ícone, o rótulo e a descrição dizem o que é o bloco; a régua que sai
 * verde e vira cinza marca onde a seção começa e mantém o ritmo da página.
 */
export function Secao({
  icone: Icone,
  rotulo,
  titulo,
  descricao,
  acao,
  aoClicarAcao,
  atraso = 0,
  children,
}) {
  return (
    <section className="im-secao im-rise" style={{ animationDelay: `${atraso}ms` }}>
      <header className="im-secao__cabecalho">
        <div className="im-secao__linha">
          <div className="im-secao__identidade">
            <span className="im-secao__icone"><Icone size={19} strokeWidth={2.4} /></span>
            <div>
              <Eyebrow verde>{rotulo}</Eyebrow>
              <h2 className="im-secao__titulo">{titulo}</h2>
              {descricao && <p className="im-secao__descricao">{descricao}</p>}
            </div>
          </div>

          {acao && (
            <button className="im-secao__acao" onClick={aoClicarAcao}>
              {acao} <ChevronRight size={15} strokeWidth={3} />
            </button>
          )}
        </div>
        <div className="im-secao__regua" />
      </header>

      {children}
    </section>
  );
}
