import { useMemo, useState } from "react";
import { Gauge, Ticket, Repeat2, CheckCircle2, Clock, Plus, SlidersHorizontal } from "lucide-react";
import { Secao } from "../components/layout";
import { Card, Botao, Abas, Busca } from "../components/ui";
import { KPI, TabelaChamados } from "../components/painel";
import { useModais } from "../context/ModaisContext";
import { CHAMADOS, FILTROS_CHAMADO } from "../data/chamados";
import "../components/painel/Tabela.css";

export default function Chamados() {
  const [filtro, setFiltro] = useState("Todos");
  const { abrirChamado } = useModais();

  const visiveis = useMemo(() => {
    if (filtro === "Todos") return CHAMADOS;
    return CHAMADOS.filter((c) => c.tipo === filtro || c.status === filtro);
  }, [filtro]);

  return (
    <>
      <Secao
        icone={Gauge}
        rotulo="Seção 1"
        titulo="Situação dos chamados"
        descricao="Onde estão os seus pedidos de falta e de sobra neste momento."
      >
        <div className="im-grid im-grid--4">
          <KPI rotulo="Chamados abertos" valor={12} variacao="3" icone={Ticket} />
          <KPI rotulo="Em processo de match" valor={9} variacao="14%" icone={Repeat2} />
          <KPI rotulo="Concluídos no mês" valor={63} variacao="19%" icone={CheckCircle2} />
          <KPI rotulo="Tempo médio de resposta" texto="2h14" variacao="22%" icone={Clock} />
        </div>
      </Secao>

      <Secao
        icone={Ticket}
        rotulo="Seção 2"
        titulo="Lista de chamados"
        descricao="Filtre por tipo ou por status para encontrar um chamado específico."
        atraso={90}
      >
        <Card elevar={false}>
          <div className="im-ferramentas">
            <Abas opcoes={FILTROS_CHAMADO} ativa={filtro} aoTrocar={setFiltro} />
            <span className="im-ferramentas__espaco" />
            <Busca placeholder="Buscar chamado" largura={148} />
            <Botao variante="neutro"><SlidersHorizontal size={15} /> Filtros</Botao>
            <Botao onClick={abrirChamado}><Plus size={15} strokeWidth={3} /> Novo chamado</Botao>
          </div>

          <TabelaChamados chamados={visiveis} />

          <div className="im-paginacao">
            <p className="im-paginacao__contagem">
              Mostrando <strong>{visiveis.length}</strong> de {CHAMADOS.length} chamados
            </p>
            <div className="im-paginacao__paginas">
              {["1", "2", "3"].map((pagina, i) => (
                <button key={pagina}
                  className={`im-paginacao__pagina ${i === 0 ? "im-paginacao__pagina--ativa" : ""}`}>
                  {pagina}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </Secao>
    </>
  );
}
