/** Farmácias da rede que já trocaram com a unidade. Consulta em leitura. */
export const PARCEIRAS = [
  { nome: "Drogaria Vida Plena",     responsavel: "Camila Andrade",   crf: "CRF-SP 48.221", cidade: "Perdizes · SP",    telefone: "(11) 3872-4410", email: "compras@vidaplena.com.br",    trocas: 34, status: "Parceiro ouro",  iniciais: "VP" },
  { nome: "Farmácia São Lucas",      responsavel: "Roberto Nakamura", crf: "CRF-SP 33.907", cidade: "Butantã · SP",     telefone: "(11) 3721-8890", email: "contato@saolucas.com.br",     trocas: 28, status: "Parceiro ouro",  iniciais: "SL" },
  { nome: "Rede Bem Estar — Mooca",  responsavel: "Patrícia Lemos",   crf: "CRF-SP 51.664", cidade: "Mooca · SP",       telefone: "(11) 2601-3345", email: "suprimentos@bemestar.com",    trocas: 21, status: "Parceiro prata", iniciais: "BE" },
  { nome: "Farmácia Popular Centro", responsavel: "Anderson Vieira",  crf: "CRF-SP 29.118", cidade: "Sé · SP",          telefone: "(11) 3105-7720", email: "compras@popularcentro.com",   trocas: 17, status: "Parceiro prata", iniciais: "PC" },
  { nome: "Drogal Bela Vista",       responsavel: "Juliana Prado",    crf: "CRF-SP 44.502", cidade: "Bela Vista · SP",  telefone: "(11) 3288-9014", email: "estoque@drogalbv.com.br",     trocas: 12, status: "Ativo",          iniciais: "BV" },
  { nome: "Farma Nossa Senhora",     responsavel: "Marcelo Duarte",   crf: "CRF-SP 37.850", cidade: "Ipiranga · SP",    telefone: "(11) 2063-4477", email: "farma@nossasenhora.com",      trocas: 9,  status: "Ativo",          iniciais: "NS" },
  { nome: "Saúde & Cia Osasco",      responsavel: "Fernanda Ribeiro", crf: "CRF-SP 55.310", cidade: "Osasco · SP",      telefone: "(11) 3684-2200", email: "compras@saudecia.com.br",     trocas: 6,  status: "Novo parceiro",  iniciais: "SC" },
  { nome: "Drogaria Central ABC",    responsavel: "Thiago Moreira",   crf: "CRF-SP 41.773", cidade: "Santo André · SP", telefone: "(11) 4438-6612", email: "central@abcfarma.com.br",     trocas: 4,  status: "Novo parceiro",  iniciais: "CA" },
];

export const FILTROS_PARCEIRA = ["Todas", "Parceiro ouro", "Parceiro prata", "Novos"];
