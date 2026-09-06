import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ModalChamado, ModalMedicamento } from "../components/modais";

const ModaisContext = createContext(null);

/**
 * Guarda qual modal está aberto e o disponibiliza para qualquer tela.
 * Evita passar callbacks de abertura por toda a árvore de componentes.
 */
export function ModaisProvider({ children }) {
  const [aberto, setAberto] = useState(null);

  const fechar = useCallback(() => setAberto(null), []);

  const valor = useMemo(() => ({
    abrirChamado: () => setAberto("chamado"),
    abrirMedicamento: () => setAberto("medicamento"),
    fechar,
  }), [fechar]);

  return (
    <ModaisContext.Provider value={valor}>
      {children}
      {aberto === "chamado" && <ModalChamado aoFechar={fechar} />}
      {aberto === "medicamento" && <ModalMedicamento aoFechar={fechar} />}
    </ModaisContext.Provider>
  );
}

/** Acesso aos modais de qualquer componente dentro do provider. */
export function useModais() {
  const contexto = useContext(ModaisContext);
  if (!contexto) throw new Error("useModais precisa estar dentro de <ModaisProvider>.");
  return contexto;
}
