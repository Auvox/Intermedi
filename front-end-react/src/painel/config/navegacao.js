import {
  LayoutDashboard, Ticket, Repeat2, Pill, Users,
  Building2, FileBarChart2, Settings,
} from "lucide-react";

/**
 * Base onde o painel está montado dentro do app. Se um dia mudar o prefixo
 * da rota (em router.jsx), basta trocar aqui.
 */
export const BASE = "/app";

/**
 * Menu lateral. `caminho` é a rota completa (BASE + trecho).
 * Mudar aqui muda o menu, o item destacado e a trilha da barra superior.
 */
export const MENU = [
  {
    grupo: "Operação",
    itens: [
      { caminho: `${BASE}`,               rotulo: "Painel",     icone: LayoutDashboard },
      { caminho: `${BASE}/chamados`,      rotulo: "Chamados",   icone: Ticket,  selo: "12" },
      { caminho: `${BASE}/matches`,       rotulo: "Matches",    icone: Repeat2, selo: "4", destaque: true },
    ],
  },
  {
    grupo: "Cadastros",
    itens: [
      { caminho: `${BASE}/medicamentos`,  rotulo: "Medicamentos",        icone: Pill },
      { caminho: `${BASE}/parceiras`,     rotulo: "Farmácias parceiras", icone: Users },
    ],
  },
  {
    grupo: "Minha farmácia",
    itens: [
      { caminho: `${BASE}/minha-farmacia`, rotulo: "Gestão e indicadores", icone: Building2 },
      { caminho: `${BASE}/relatorios`,     rotulo: "Relatórios",           icone: FileBarChart2 },
      { caminho: `${BASE}/configuracoes`,  rotulo: "Configurações",        icone: Settings },
    ],
  },
];

/** Título e subtítulo da barra superior por rota. */
export const CABECALHOS = {
  [`${BASE}`]:                { titulo: "Painel",              subtitulo: "Visão geral da sua operação na rede Intermedi" },
  [`${BASE}/chamados`]:       { titulo: "Chamados",            subtitulo: "Tudo o que sua farmácia publicou de falta e de sobra" },
  [`${BASE}/matches`]:        { titulo: "Matches",             subtitulo: "Farmácias compatíveis encontradas para os seus chamados" },
  [`${BASE}/medicamentos`]:   { titulo: "Medicamentos",        subtitulo: "Cadastro, estoque e validade dos seus produtos" },
  [`${BASE}/parceiras`]:      { titulo: "Farmácias parceiras", subtitulo: "Quem troca medicamentos com você na rede" },
  [`${BASE}/minha-farmacia`]: { titulo: "Minha farmácia",      subtitulo: "Indicadores de estoque, giro e resultado" },
  [`${BASE}/relatorios`]:     { titulo: "Relatórios",          subtitulo: "Exportações e fechamentos periódicos" },
  [`${BASE}/configuracoes`]:  { titulo: "Configurações",       subtitulo: "Preferências da unidade e da conta" },
};

/** Nome do grupo a que a rota pertence, usado na trilha do topo. */
export function grupoDaRota(caminho) {
  const grupo = MENU.find((g) => g.itens.some((i) => i.caminho === caminho));
  return grupo ? grupo.grupo : "Operação";
}
