import "./Logo.css";

/** Marca da Intermedi: cruz farmacêutica vazada + assinatura. */
export function Logo({ escuro = false, tamanho = 30 }) {
  const cor = escuro ? "#FFFFFF" : "var(--im-green)";
  return (
    <div className={`im-logo ${escuro ? "im-logo--escuro" : ""}`}>
      <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M18.5 3h11a4 4 0 0 1 4 4v10.5H44a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H33.5V47a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4V36.5H4a4 4 0 0 1-4-4v-11a4 4 0 0 1 4-4h10.5V7a4 4 0 0 1 4-4Z"
          transform="scale(0.92) translate(2,-1)"
          stroke={cor} strokeWidth="3.4" fill="none"
        />
        <circle cx="33" cy="14" r="3.6" fill="var(--im-green-bright)" />
      </svg>
      <span className="im-logo__texto">
        Inter<span className="im-logo__medi">medi</span>
      </span>
    </div>
  );
}
