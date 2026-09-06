import { useMemo, useState } from "react";
import {
  Boxes, Pill, AlertTriangle, Package, Plus, SlidersHorizontal, Pencil, Trash2,
} from "lucide-react";
import { Secao } from "../components/layout";
import { Card, Botao, Tag, StatusTag, Busca } from "../components/ui";
import { KPI, BarraProgresso } from "../components/painel";
import { useModais } from "../context/ModaisContext";
import { useMontado } from "../hooks/useMontado";
import { MEDICAMENTOS } from "../data/medicamentos";
import "../components/painel/Tabela.css";
import "./Medicamentos.css";

const COLUNAS = ["Código", "Medicamento", "Laboratório", "Categoria", "Estoque", "Preço", "Validade", "Situação", "Ações"];

export default function Medicamentos() {
  const [busca, setBusca] = useState("");
  const montado = useMontado(280);
  const { abrirMedicamento } = useModais();

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return MEDICAMENTOS;
    return MEDICAMENTOS.filter((m) =>
      `${m.nome} ${m.laboratorio} ${m.categoria}`.toLowerCase().includes(termo)
    );
  }, [busca]);

  return (
    <>
      <Secao
        icone={Boxes}
        rotulo="Seção 1"
        titulo="Panorama do catálogo"
        descricao="Quanto você tem cadastrado e o que já está fora da faixa segura."
      >
        <div className="im-grid im-grid--4">
          <KPI rotulo="Itens cadastrados" valor={1482} variacao="24" icone={Pill} />
          <KPI rotulo="Abaixo do estoque mínimo" valor={37} variacao="9%" positivo={false} icone={AlertTriangle} />
          <KPI rotulo="Excedentes disponíveis" valor={112} variacao="16%" icone={Boxes} />
          <KPI rotulo="Valor em estoque" valor={1.24} decimais={2} prefixo="R$ " sufixo=" mi" variacao="7%" icone={Package} />
        </div>
      </Secao>

      <Secao
        icone={Pill}
        rotulo="Seção 2"
        titulo="Medicamentos cadastrados"
        descricao="Cadastre, edite, exclua ou publique um item direto como chamado."
        atraso={90}
      >
        <Card elevar={false}>
          <div className="im-ferramentas">
            <Busca
              placeholder="Buscar por nome ou laboratório"
              largura={198}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <Botao variante="neutro"><SlidersHorizontal size={15} /> Filtros</Botao>
            <span className="im-ferramentas__espaco" />
            <Botao onClick={abrirMedicamento}><Plus size={15} strokeWidth={3} /> Cadastrar medicamento</Botao>
          </div>

          <div className="im-tabela__rolagem">
            <table className="im-tabela" style={{ minWidth: 1010 }}>
              <thead>
                <tr>{COLUNAS.map((coluna) => <th key={coluna}>{coluna}</th>)}</tr>
              </thead>
              <tbody>
                {visiveis.map((item) => {
                  const critico = item.estoque < item.minimo;
                  const proporcao = Math.min(100, (item.estoque / (item.minimo * 4)) * 100);

                  return (
                    <tr key={item.id}>
                      <td className="im-tabela__forte im-num">{item.id}</td>

                      <td>
                        <div className="im-medicamento">
                          <span className="im-medicamento__icone"><Pill size={15} /></span>
                          <div>
                            <p className="im-tabela__forte">{item.nome}</p>
                            <p className="im-tabela__fraco">{item.concentracao}</p>
                          </div>
                        </div>
                      </td>

                      <td className="im-tabela__fraco">{item.laboratorio}</td>
                      <td><Tag>{item.categoria}</Tag></td>

                      <td>
                        <p className={`im-tabela__forte im-num ${critico ? "im-medicamento__critico" : ""}`}>
                          {item.estoque}
                        </p>
                        <BarraProgresso
                          porcentagem={proporcao}
                          pronto={montado}
                          alerta={critico}
                          altura={6}
                          largura={80}
                        />
                      </td>

                      <td className="im-tabela__forte im-num">R$ {item.preco}</td>
                      <td className="im-tabela__fraco im-num">{item.validade}</td>
                      <td><StatusTag status={item.situacao} /></td>

                      <td>
                        <div className="im-medicamento__acoes">
                          <Botao variante="icone" title="Editar"><Pencil size={14} /></Botao>
                          <Botao variante="icone" title="Excluir" className="im-medicamento__excluir">
                            <Trash2 size={14} />
                          </Botao>
                          <Botao variante="sutil">Abrir chamado</Botao>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </Secao>
    </>
  );
}
