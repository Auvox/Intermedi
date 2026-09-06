import { useEffect } from "react";
import { X } from "lucide-react";
import "./Modal.css";

/** Camada escura + folha branca. Fecha no Esc e no clique do fundo. */
export function Modal({ children, aoFechar, largura = 640 }) {
  useEffect(() => {
    const noEsc = (e) => e.key === "Escape" && aoFechar();
    window.addEventListener("keydown", noEsc);
    return () => window.removeEventListener("keydown", noEsc);
  }, [aoFechar]);

  return (
    <div className="im-modal" onClick={aoFechar} role="dialog" aria-modal="true">
      <div
        className="im-modal__folha im-rise"
        style={{ maxWidth: largura }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <button className="im-modal__fechar" onClick={aoFechar} aria-label="Fechar">
        <X size={18} />
      </button>
    </div>
  );
}

/** Rodapé fixo do modal: aviso à esquerda, ações à direita. */
export function ModalRodape({ aviso, children }) {
  return (
    <div className="im-modal__rodape">
      {aviso && <p className="im-modal__aviso">{aviso}</p>}
      <div className="im-modal__acoes">{children}</div>
    </div>
  );
}
