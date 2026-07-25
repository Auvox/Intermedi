/**
 * Pares encontrados pelo motor de compatibilidade.
 * `falta` é quem precisa, `sobra` é quem tem, `compatibilidade` é o cruzamento.
 */
export const MATCHES = [
  {
    id: "MTC-0912", compatibilidade: 98, medicamento: "Insulina NPH Humana 100 UI",
    quantidade: 120, distancia: "3,4 km", prazo: "Retirada hoje",
    valor: "8.700,00", status: "Aguardando aceite",
    falta: { farmacia: "Matriz — Pinheiros",   cidade: "São Paulo · SP", chamado: "CHM-2841" },
    sobra: { farmacia: "Drogaria Vida Plena",  cidade: "Perdizes · SP",  chamado: "CHM-2799" },
  },
  {
    id: "MTC-0911", compatibilidade: 92, medicamento: "Losartana Potássica 50 mg",
    quantidade: 600, distancia: "7,1 km", prazo: "Entrega em 24h",
    valor: "5.640,00", status: "Aguardando aceite",
    falta: { farmacia: "Farmácia São Lucas",   cidade: "Butantã · SP",   chamado: "CHM-2802" },
    sobra: { farmacia: "Matriz — Pinheiros",   cidade: "São Paulo · SP", chamado: "CHM-2840" },
  },
  {
    id: "MTC-0908", compatibilidade: 87, medicamento: "Amoxicilina + Clavulanato 875 mg",
    quantidade: 200, distancia: "11,8 km", prazo: "Entrega em 48h",
    valor: "9.740,00", status: "Em negociação",
    falta: { farmacia: "Filial Tatuapé",        cidade: "São Paulo · SP", chamado: "CHM-2833" },
    sobra: { farmacia: "Rede Bem Estar — Mooca",cidade: "São Paulo · SP", chamado: "CHM-2781" },
  },
];
