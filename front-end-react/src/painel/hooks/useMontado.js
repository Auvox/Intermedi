import { useEffect, useState } from "react";

/**
 * Vira true logo após a montagem.
 * Serve para disparar o preenchimento das barras de progresso.
 */
export function useMontado(atraso = 120) {
  const [montado, setMontado] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMontado(true), atraso);
    return () => clearTimeout(t);
  }, [atraso]);
  return montado;
}
