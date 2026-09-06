import { Calendar } from "lucide-react";
import { Card } from "../components/ui";
import "./EmBreve.css";

/** Tela reservada para uma área ainda não construída. */
export default function EmBreve({ titulo, texto }) {
  return (
    <Card className="im-embreve im-rise">
      <span className="im-embreve__icone"><Calendar size={26} /></span>
      <p className="im-embreve__titulo">{titulo}</p>
      <p className="im-embreve__texto">{texto}</p>
    </Card>
  );
}
