/** Chamados publicados pela unidade. tipo: "Falta" ou "Sobra". */
export const CHAMADOS = [
  { id: "CHM-2841", tipo: "Falta", medicamento: "Insulina NPH Humana 100 UI",      quantidade: 120, urgencia: "Crítica", unidade: "Matriz — Pinheiros",  data: "22/07/2026", status: "Em match",  matches: 4 },
  { id: "CHM-2840", tipo: "Sobra", medicamento: "Losartana Potássica 50 mg",       quantidade: 900, urgencia: "Baixa",   unidade: "Matriz — Pinheiros",  data: "22/07/2026", status: "Em match",  matches: 7 },
  { id: "CHM-2838", tipo: "Falta", medicamento: "Salbutamol Aerossol 100 mcg",     quantidade: 60,  urgencia: "Alta",    unidade: "Filial Santo Amaro",  data: "21/07/2026", status: "Aberto",    matches: 0 },
  { id: "CHM-2835", tipo: "Sobra", medicamento: "Atenolol 25 mg",                  quantidade: 740, urgencia: "Baixa",   unidade: "Matriz — Pinheiros",  data: "20/07/2026", status: "Concluído", matches: 3 },
  { id: "CHM-2833", tipo: "Falta", medicamento: "Amoxicilina + Clavulanato 875 mg",quantidade: 200, urgencia: "Alta",    unidade: "Filial Tatuapé",      data: "19/07/2026", status: "Em match",  matches: 2 },
  { id: "CHM-2830", tipo: "Sobra", medicamento: "Omeprazol 20 mg",                 quantidade: 380, urgencia: "Baixa",   unidade: "Filial Santo Amaro",  data: "18/07/2026", status: "Concluído", matches: 5 },
  { id: "CHM-2827", tipo: "Falta", medicamento: "Enoxaparina Sódica 40 mg",        quantidade: 45,  urgencia: "Crítica", unidade: "Matriz — Pinheiros",  data: "17/07/2026", status: "Concluído", matches: 1 },
];

/** Filtros disponíveis na lista de chamados. */
export const FILTROS_CHAMADO = ["Todos", "Falta", "Sobra", "Em match", "Concluído"];
