/**
 * Espelho em JavaScript dos tokens de cor.
 * Necessário porque o Recharts recebe cores como valor literal,
 * não como variável CSS. Ao mudar tokens.css, mude aqui também.
 */
export const cores = {
  green:       "#00B14F",
  greenBright: "#22C55E",
  greenDark:   "#04803A",
  greenSoft:   "#E9F8EF",
  ink:         "#0B1220",
  slate:       "#67757F",
  line:        "#E6EDE8",
  track:       "#EDF3EF",
  amber:       "#F59E0B",
  red:         "#EF4444",
  blue:        "#3B82F6",
};

/** Cor de cada nível de urgência de um chamado. */
export const corUrgencia = {
  "Crítica": cores.red,
  "Alta":    cores.amber,
  "Baixa":   cores.slate,
};
