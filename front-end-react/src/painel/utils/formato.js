/** Formata número no padrão brasileiro. */
export const numero = (n, decimais = 0) =>
  n.toLocaleString("pt-BR", {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  });

/** Diz se o sistema operacional pede menos movimento. */
export const prefereMenosMovimento = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
