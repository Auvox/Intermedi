import { useLocation } from "react-router-dom";
import { Menu, ChevronRight, ChevronDown, Bell, Plus, Search } from "lucide-react";
import { Botao } from "../ui";
import { CABECALHOS, grupoDaRota } from "../../config/navegacao";
import { useModais } from "../../context/ModaisContext";
import "./TopBar.css";

/** Barra superior: trilha, título, busca global e ação principal. */
export function TopBar({ aoAbrirMenu }) {
  const { pathname } = useLocation();
  const { abrirChamado } = useModais();

  const { titulo, subtitulo } =
    CABECALHOS[pathname] || { titulo: "Painel", subtitulo: "" };

  return (
    <header className="im-topbar">
      <div className="im-topbar__interno im-wrap">
        <button className="im-topbar__menu" onClick={aoAbrirMenu} aria-label="Abrir menu">
          <Menu size={18} />
        </button>

        <div className="im-topbar__identificacao">
          <p className="im-topbar__trilha">
            {grupoDaRota(pathname)}
            <ChevronRight size={11} strokeWidth={3} />
            <span className="im-topbar__trilha-atual">{titulo}</span>
          </p>
          <h1 className="im-topbar__titulo">{titulo}</h1>
          <p className="im-topbar__subtitulo im-truncate">{subtitulo}</p>
        </div>

        <label className="im-topbar__busca">
          <Search size={16} />
          <input placeholder="Buscar medicamento, chamado ou farmácia" />
        </label>

        <Botao className="im-topbar__acao" onClick={abrirChamado}>
          <Plus size={16} strokeWidth={3} /> Abrir chamado
        </Botao>

        <button className="im-topbar__sino" aria-label="Notificações">
          <Bell size={17} />
          <span className="im-topbar__ponto im-pulse" />
        </button>

        <button className="im-topbar__conta">
          <span className="im-topbar__avatar">BS</span>
          <span className="im-topbar__pessoa">
            <span className="im-topbar__nome">Brenda Santos</span>
            <span className="im-topbar__cargo">Farmacêutica RT</span>
          </span>
          <ChevronDown size={15} />
        </button>
      </div>
    </header>
  );
}
