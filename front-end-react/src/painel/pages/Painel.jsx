import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  RadialBarChart, RadialBar,
} from "recharts";
import {
  Gauge, Zap, Repeat2, Activity, History, Ticket, ShieldCheck,
  AlertTriangle, Clock,
} from "lucide-react";
import { Secao } from "../components/layout";
import { Card, Botao, Eyebrow, ChartTip } from "../components/ui";
import {
  KPI, MatchCard, TabelaChamados, ChamadoRapido, PassosDoMatch,
} from "../components/painel";
import { useModais } from "../context/ModaisContext";
import { SERIE_CHAMADOS, VALIDADE_PROXIMA } from "../data/series";
import { MATCHES } from "../data/matches";
import { CHAMADOS } from "../data/chamados";
import { cores } from "../styles/tokens";
import { BASE } from "../config/navegacao";
import "./Painel.css";

const EFICIENCIA = [{ nome: "taxa", valor: 89, fill: cores.green }];

export default function Painel() {
  const navegar = useNavigate();
  const { abrirChamado } = useModais();

  return (
    <>
      <Secao
        icone={Gauge}
        rotulo="Seção 1"
        titulo="Resumo do mês"
        descricao="Como a sua unidade se comportou na rede em julho de 2026."
      >
        <div className="im-grid im-grid--4">
          <KPI rotulo="Chamados ativos" valor={24} variacao="12%" icone={Ticket} />
          <KPI rotulo="Matches no mês" valor={74} variacao="21%" icone={Repeat2} />
          <KPI rotulo="Itens salvos do vencimento" valor={1284} variacao="18%" icone={ShieldCheck} />
          <KPI rotulo="Perda evitada" valor={84.3} decimais={1} prefixo="R$ " sufixo=" mil"
               variacao="4%" positivo={false} icone={Activity} />
        </div>
      </Secao>

      <Secao
        icone={Zap}
        rotulo="Seção 2"
        titulo="Abrir chamado"
        descricao="Publique uma falta ou uma sobra e o motor cruza com as farmácias da rede."
        atraso={90}
      >
        <div className="im-painel__abrir">
          <ChamadoRapido aoPublicar={abrirChamado} />
          <PassosDoMatch />

          <Card className="im-painel__eficiencia">
            <Eyebrow>Eficiência da rede</Eyebrow>

            <div className="im-painel__rosca">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart data={EFICIENCIA} innerRadius="72%" outerRadius="100%"
                                startAngle={90} endAngle={-270}>
                  <RadialBar background={{ fill: cores.track }} dataKey="valor"
                             cornerRadius={20} animationDuration={1400} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="im-painel__rosca-centro">
                <p className="im-painel__rosca-valor im-num">89%</p>
                <p className="im-painel__rosca-legenda">dão match</p>
              </div>
            </div>

            <p className="im-painel__rosca-nota">
              Primeiro match em<br /><strong>2 h 14 min</strong> em média
            </p>
          </Card>
        </div>
      </Secao>

      <Secao
        icone={Repeat2}
        rotulo="Seção 3"
        titulo="Matches aguardando você"
        descricao="Farmácias que já responderam aos seus chamados e esperam um aceite."
        acao="Ver todos os matches"
        aoClicarAcao={() => navegar(`${BASE}/matches`)}
        atraso={180}
      >
        <div className="im-painel__matches">
          <MatchCard match={MATCHES[0]} />
          <MatchCard match={MATCHES[1]} />
        </div>
      </Secao>

      <Secao
        icone={Activity}
        rotulo="Seção 4"
        titulo="Monitoramento"
        descricao="Volume de chamados ao longo do ano e itens que precisam de decisão agora."
        atraso={260}
      >
        <div className="im-painel__monitoramento">
          <Card className="im-painel__grafico">
            <header className="im-painel__grafico-topo">
              <div>
                <Eyebrow>Movimento da rede</Eyebrow>
                <p className="im-painel__grafico-titulo">
                  Chamados publicados x resolvidos por match
                </p>
              </div>
              <div className="im-painel__legenda">
                <span><i style={{ background: "#BFDCCB" }} />Publicados</span>
                <span><i style={{ background: cores.green }} />Resolvidos</span>
              </div>
            </header>

            <div className="im-painel__area">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SERIE_CHAMADOS} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="im-gradiente-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cores.green} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={cores.green} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 7" stroke={cores.line} vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false}
                         tick={{ fill: cores.slate, fontSize: 12, fontWeight: 700 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: cores.slate, fontSize: 12 }} />
                  <Tooltip content={<ChartTip />}
                           cursor={{ stroke: cores.green, strokeWidth: 1.4, strokeDasharray: "5 5" }} />
                  <Area type="monotone" dataKey="publicados" name="Publicados" stroke="#BFDCCB"
                        strokeWidth={2.5} fill="none" animationDuration={1300}
                        activeDot={{ r: 5, fill: "#fff", stroke: "#BFDCCB", strokeWidth: 3 }} />
                  <Area type="monotone" dataKey="resolvidos" name="Resolvidos" stroke={cores.green}
                        strokeWidth={3} fill="url(#im-gradiente-area)" animationDuration={1500}
                        activeDot={{ r: 6, fill: "#fff", stroke: cores.green, strokeWidth: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="im-painel__validade">
            <header className="im-painel__validade-topo">
              <div>
                <Eyebrow>Precisa de atenção</Eyebrow>
                <p className="im-painel__validade-titulo">Validade próxima</p>
              </div>
              <AlertTriangle size={16} className="im-painel__alerta" />
            </header>

            <ul>
              {VALIDADE_PROXIMA.map((item) => (
                <li className="im-painel__validade-item" key={item.lote}>
                  <span className="im-painel__validade-icone"><Clock size={15} /></span>
                  <div className="im-fill">
                    <p className="im-painel__validade-nome im-truncate">{item.nome}</p>
                    <p className="im-painel__validade-lote">Lote {item.lote} · {item.quantidade} un.</p>
                  </div>
                  <span className="im-painel__validade-dias im-num">{item.dias}d</span>
                </li>
              ))}
            </ul>

            <div className="im-painel__validade-rodape">
              <Botao variante="neutro" className="im-botao--bloco">Publicar como sobra</Botao>
            </div>
          </Card>
        </div>
      </Secao>

      <Secao
        icone={History}
        rotulo="Seção 5"
        titulo="Últimos chamados da unidade"
        descricao="Histórico recente com tipo, urgência e quantos matches cada um gerou."
        acao="Abrir lista completa"
        aoClicarAcao={() => navegar(`${BASE}/chamados`)}
        atraso={340}
      >
        <Card elevar={false} className="im-painel__tabela">
          <TabelaChamados chamados={CHAMADOS.slice(0, 4)} />
        </Card>
      </Secao>
    </>
  );
}
