import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import {
  TrendingUp, Boxes, Activity, Users, Truck, AlertTriangle,
} from "lucide-react";
import { Secao } from "../components/layout";
import { Card, Abas, Eyebrow, ChartTip } from "../components/ui";
import { KPI, BarraProgresso } from "../components/painel";
import { useMontado } from "../hooks/useMontado";
import {
  SERIE_FATURAMENTO, SERIE_GIRO, CATEGORIAS_ESTOQUE, SAUDE_ESTOQUE, CURVA_A,
} from "../data/series";
import { cores } from "../styles/tokens";
import "./Farmacia.css";

export default function Farmacia() {
  const montado = useMontado(300);
  const ultimo = SERIE_FATURAMENTO.length - 1;

  return (
    <>
      <Secao
        icone={TrendingUp}
        rotulo="Seção 1"
        titulo="Resultado da unidade"
        descricao="Faturamento mês a mês e como o estoque está composto hoje."
      >
        <div className="im-farmacia__resultado">
          <Card className="im-farmacia__faturamento">
            <header className="im-farmacia__topo">
              <div>
                <Eyebrow>Faturamento mensal</Eyebrow>
                <p className="im-farmacia__valor im-num">
                  R$ 211,4 <span className="im-farmacia__unidade">mil</span>
                </p>
                <p className="im-farmacia__variacao">
                  <TrendingUp size={15} strokeWidth={3} /> +9,9% em relação a junho
                </p>
              </div>
              <Abas opcoes={["Mês", "Trimestre", "Ano"]} ativa="Mês" />
            </header>

            <div className="im-farmacia__grafico">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SERIE_FATURAMENTO} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 7" stroke={cores.line} vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false}
                         tick={{ fill: cores.slate, fontSize: 12, fontWeight: 700 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: cores.slate, fontSize: 12 }} />
                  <Tooltip content={<ChartTip prefixo="R$ " sufixo=" mil" />}
                           cursor={{ fill: "rgba(0,177,79,.06)", radius: 12 }} />
                  <Bar dataKey="valor" name="Faturamento" barSize={26}
                       radius={[10, 10, 10, 10]} animationDuration={1200}>
                    {SERIE_FATURAMENTO.map((_, i) => (
                      <Cell key={i} fill={i === ultimo ? cores.green : "#CFE9DA"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="im-farmacia__composicao">
            <Eyebrow>Composição do estoque</Eyebrow>

            <div className="im-farmacia__rosca">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={CATEGORIAS_ESTOQUE} dataKey="valor" nameKey="nome"
                       innerRadius="66%" outerRadius="100%" paddingAngle={3}
                       stroke="none" animationDuration={1200}>
                    {CATEGORIAS_ESTOQUE.map((categoria) => (
                      <Cell key={categoria.nome} fill={categoria.cor} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTip sufixo="%" />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="im-farmacia__rosca-centro">
                <p className="im-farmacia__rosca-valor im-num">1.482</p>
                <p className="im-farmacia__rosca-legenda">SKUs</p>
              </div>
            </div>

            <ul className="im-farmacia__legenda">
              {CATEGORIAS_ESTOQUE.map((categoria) => (
                <li key={categoria.nome}>
                  <span className="im-farmacia__ponto" style={{ background: categoria.cor }} />
                  <span className="im-fill">{categoria.nome}</span>
                  <strong className="im-num">{categoria.valor}%</strong>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Secao>

      <Secao
        icone={Boxes}
        rotulo="Seção 2"
        titulo="Estoque e giro"
        descricao="Movimentação de entradas e saídas, saúde do estoque e curva A."
        atraso={100}
      >
        <div className="im-farmacia__estoque">
          <Card className="im-farmacia__movimentacao">
            <header className="im-farmacia__topo">
              <div>
                <Eyebrow>Movimentação</Eyebrow>
                <p className="im-farmacia__subtitulo">Entradas x saídas de estoque</p>
              </div>
              <div className="im-farmacia__series">
                <span><i style={{ background: cores.green }} />Entradas</span>
                <span><i style={{ background: cores.blue }} />Saídas</span>
              </div>
            </header>

            <div className="im-farmacia__grafico im-farmacia__grafico--alto">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SERIE_GIRO} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 7" stroke={cores.line} vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false}
                         tick={{ fill: cores.slate, fontSize: 12, fontWeight: 700 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: cores.slate, fontSize: 12 }} />
                  <Tooltip content={<ChartTip />}
                           cursor={{ stroke: cores.green, strokeWidth: 1.4, strokeDasharray: "5 5" }} />
                  <Line type="monotone" dataKey="entradas" name="Entradas" stroke={cores.green}
                        strokeWidth={3} animationDuration={1300}
                        dot={{ r: 4, fill: "#fff", strokeWidth: 3 }}
                        activeDot={{ r: 6, fill: "#fff", stroke: cores.green, strokeWidth: 3 }} />
                  <Line type="monotone" dataKey="saidas" name="Saídas" stroke={cores.blue}
                        strokeWidth={3} animationDuration={1500}
                        dot={{ r: 4, fill: "#fff", strokeWidth: 3 }}
                        activeDot={{ r: 6, fill: "#fff", stroke: cores.blue, strokeWidth: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="im-farmacia__coluna">
            <Card className="im-farmacia__saude">
              <Eyebrow>Saúde do estoque</Eyebrow>
              <ul>
                {SAUDE_ESTOQUE.map((indicador) => (
                  <li key={indicador.rotulo}>
                    <div className="im-farmacia__saude-linha">
                      <p className="im-farmacia__saude-rotulo">{indicador.rotulo}</p>
                      <p className={`im-farmacia__saude-valor im-num ${indicador.alerta ? "im-farmacia__saude-valor--alerta" : ""}`}>
                        {indicador.valor}%
                      </p>
                    </div>
                    <BarraProgresso porcentagem={indicador.valor} pronto={montado} alerta={indicador.alerta} />
                    <p className="im-farmacia__saude-detalhe">{indicador.detalhe}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="im-farmacia__curva">
              <header className="im-farmacia__curva-topo">
                <Eyebrow>Curva A</Eyebrow>
                <p className="im-farmacia__subtitulo">Medicamentos de maior giro</p>
              </header>

              <ul>
                {CURVA_A.map((produto, i) => (
                  <li className="im-farmacia__curva-item" key={produto.nome}>
                    <span className="im-farmacia__posicao im-num">{i + 1}</span>
                    <div className="im-fill">
                      <p className="im-farmacia__curva-nome im-truncate">{produto.nome}</p>
                      <BarraProgresso porcentagem={produto.participacao * 5} pronto={montado} altura={6} />
                    </div>
                    <div className="im-farmacia__curva-numeros">
                      <p className="im-farmacia__curva-unidades im-num">
                        {produto.unidades.toLocaleString("pt-BR")}
                      </p>
                      <p className={`im-farmacia__curva-tendencia im-num ${produto.tendencia < 0 ? "im-farmacia__curva-tendencia--queda" : ""}`}>
                        {produto.tendencia >= 0 ? "▲" : "▼"} {Math.abs(produto.tendencia)}%
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Secao>

      <Secao
        icone={Activity}
        rotulo="Seção 3"
        titulo="Indicadores operacionais"
        descricao="Números de atendimento e reposição da farmácia no mês."
        atraso={200}
      >
        <div className="im-grid im-grid--4">
          <KPI rotulo="Ticket médio" valor={87.4} decimais={2} prefixo="R$ " variacao="4,2%" icone={Activity} />
          <KPI rotulo="Atendimentos no mês" valor={2418} variacao="11%" icone={Users} />
          <KPI rotulo="Pedidos via rede" valor={146} variacao="27%" icone={Truck} />
          <KPI rotulo="Ruptura de gôndola" valor={3.1} decimais={1} sufixo="%" variacao="1,4 p.p." icone={AlertTriangle} />
        </div>
      </Secao>
    </>
  );
}
