import "./Eyebrow.css";

/** Rótulo miúdo em caixa alta que abre um bloco. */
export function Eyebrow({ children, verde = false, className = "" }) {
  return (
    <p className={`im-eyebrow ${verde ? "im-eyebrow--verde" : ""} ${className}`}>
      {children}
    </p>
  );
}
