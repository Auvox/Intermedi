/** Séries usadas nos gráficos. Trocar por dados da API quando o back existir. */

export const SERIE_CHAMADOS = [
  { mes: "Jan", publicados: 38, resolvidos: 26 },
  { mes: "Fev", publicados: 45, resolvidos: 34 },
  { mes: "Mar", publicados: 41, resolvidos: 33 },
  { mes: "Abr", publicados: 62, resolvidos: 48 },
  { mes: "Mai", publicados: 54, resolvidos: 45 },
  { mes: "Jun", publicados: 71, resolvidos: 61 },
  { mes: "Jul", publicados: 83, resolvidos: 74 },
];

export const SERIE_FATURAMENTO = [
  { mes: "Jan", valor: 128 }, { mes: "Fev", valor: 142 }, { mes: "Mar", valor: 119 },
  { mes: "Abr", valor: 168 }, { mes: "Mai", valor: 154 }, { mes: "Jun", valor: 192 },
  { mes: "Jul", valor: 211 },
];

export const SERIE_GIRO = [
  { mes: "Jan", entradas: 420, saidas: 380 },
  { mes: "Fev", entradas: 510, saidas: 470 },
  { mes: "Mar", entradas: 380, saidas: 410 },
  { mes: "Abr", entradas: 620, saidas: 540 },
  { mes: "Mai", entradas: 480, saidas: 520 },
  { mes: "Jun", entradas: 700, saidas: 640 },
  { mes: "Jul", entradas: 760, saidas: 720 },
];

export const CATEGORIAS_ESTOQUE = [
  { nome: "Genéricos",   valor: 42, cor: "#00B14F" },
  { nome: "Similares",   valor: 24, cor: "#22C55E" },
  { nome: "Referência",  valor: 18, cor: "#7CD9A3" },
  { nome: "OTC / Livre", valor: 10, cor: "#B6E9CB" },
  { nome: "Perfumaria",  valor: 6,  cor: "#DDF3E6" },
];

export const SAUDE_ESTOQUE = [
  { rotulo: "Cobertura de estoque",   valor: 78, detalhe: "42 dias" },
  { rotulo: "Itens em ruptura",       valor: 22, detalhe: "37 SKUs", alerta: true },
  { rotulo: "Acurácia de inventário", valor: 96, detalhe: "última contagem 12/07" },
];

export const CURVA_A = [
  { nome: "Dipirona 500 mg",   unidades: 4820, participacao: 18, tendencia: 12 },
  { nome: "Losartana 50 mg",   unidades: 3940, participacao: 15, tendencia: 8 },
  { nome: "Omeprazol 20 mg",   unidades: 3120, participacao: 12, tendencia: -3 },
  { nome: "Atenolol 25 mg",    unidades: 2680, participacao: 10, tendencia: 5 },
  { nome: "Sertralina 50 mg",  unidades: 1970, participacao: 7,  tendencia: 21 },
];

export const VALIDADE_PROXIMA = [
  { nome: "Salbutamol Aerossol 100 mcg", lote: "L-88214", dias: 34, quantidade: 42 },
  { nome: "Insulina NPH 100 UI",         lote: "L-77190", dias: 58, quantidade: 18 },
  { nome: "Amoxicilina 875 mg",          lote: "L-91002", dias: 71, quantidade: 96 },
];
