import { useEffect, useRef, useState } from "react";
import { prefereMenosMovimento } from "../utils/formato";

/**
 * Faz um número subir de zero até o valor final ao entrar na tela.
 * Devolve o valor final imediatamente se o sistema pedir menos movimento.
 */
export function useContagem(alvo, duracao = 1100) {
  const [valor, setValor] = useState(prefereMenosMovimento() ? alvo : 0);
  const quadro = useRef();

  useEffect(() => {
    if (prefereMenosMovimento()) {
      setValor(alvo);
      return;
    }
    const inicio = performance.now();
    const passo = (agora) => {
      const p = Math.min(1, (agora - inicio) / duracao);
      setValor(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) quadro.current = requestAnimationFrame(passo);
    };
    quadro.current = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro.current);
  }, [alvo, duracao]);

  return valor;
}
