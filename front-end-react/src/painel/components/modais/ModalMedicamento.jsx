import { useState } from "react";
import { X } from "lucide-react";
import { Modal, ModalRodape, Botao, Eyebrow, Campo } from "../ui";
import "./formulario.css";

const CATEGORIAS = ["Genérico", "Similar", "Referência", "Controlado", "OTC"];

const CAMPOS = [
  { rotulo: "Nome comercial",   valor: "Insulina NPH Humana",     largo: true },
  { rotulo: "Princípio ativo",  valor: "Insulina humana isófana", largo: true },
  { rotulo: "Concentração",     valor: "100 UI/mL" },
  { rotulo: "Laboratório",      valor: "Novo Nordisk" },
  { rotulo: "Registro ANVISA",  valor: "1.0169.0123.001-4" },
  { rotulo: "Código de barras", valor: "7896004712345" },
  { rotulo: "Estoque atual",    valor: "18" },
  { rotulo: "Estoque mínimo",   valor: "80" },
  { rotulo: "Preço de venda",   valor: "R$ 72,50" },
  { rotulo: "Validade",         valor: "01/2027" },
];

/** Cadastro e edição de um medicamento do catálogo. */
export function ModalMedicamento({ aoFechar }) {
  const [categoria, setCategoria] = useState("Referência");

  return (
    <Modal aoFechar={aoFechar} largura={620}>
      <header className="im-form__cabecalho">
        <div>
          <Eyebrow verde>Cadastro</Eyebrow>
          <h3 className="im-form__titulo">Novo medicamento</h3>
        </div>
        <button className="im-form__fechar" onClick={aoFechar} aria-label="Fechar">
          <X size={18} />
        </button>
      </header>

      <div className="im-form__corpo">
        <div className="im-form__campos im-form__campos--2">
          {CAMPOS.map(({ rotulo, valor, largo }) => (
            <Campo
              key={rotulo}
              rotulo={rotulo}
              defaultValue={valor}
              className={largo ? "im-form__largo" : ""}
            />
          ))}

          <div className="im-form__largo">
            <span className="im-campo__rotulo">Categoria</span>
            <div className="im-form__opcoes">
              {CATEGORIAS.map((opcao) => (
                <button
                  key={opcao}
                  onClick={() => setCategoria(opcao)}
                  className={`im-form__opcao ${categoria === opcao ? "im-form__opcao--ativa" : ""}`}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ModalRodape>
        <Botao variante="neutro" onClick={aoFechar}>Cancelar</Botao>
        <Botao onClick={aoFechar}>Salvar medicamento</Botao>
      </ModalRodape>
    </Modal>
  );
}
