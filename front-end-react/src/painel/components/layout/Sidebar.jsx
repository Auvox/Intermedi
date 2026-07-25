import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import logoIntermedi from "../../../assets/logoIntermedi.png";
import { MENU, BASE } from "../../config/navegacao";
import "./Sidebar.css";

/** Navegação principal. Vira gaveta abaixo de 1024px. */
export function Sidebar({ aberta, aoFechar }) {
  return (
    <>
      {aberta && <div className="im-sidebar__cortina" onClick={aoFechar} />}

      <aside className={`im-sidebar ${aberta ? "im-sidebar--aberta" : ""}`}>
        <div className="im-sidebar__topo">
          <img src={logoIntermedi} alt="Intermedi" className="im-sidebar__logo" />
          <button className="im-sidebar__fechar" onClick={aoFechar} aria-label="Fechar menu">
            <X size={18} />
          </button>
        </div>

        <nav className="im-sidebar__nav">
          {MENU.map((grupo) => (
            <div className="im-sidebar__grupo" key={grupo.grupo}>
              <p className="im-sidebar__titulo">{grupo.grupo}</p>

              {grupo.itens.map(({ caminho, rotulo, icone: Icone, selo, destaque }) => (
                <NavLink
                  key={caminho}
                  to={caminho}
                  end={caminho === BASE}
                  onClick={aoFechar}
                  className={({ isActive }) =>
                    `im-sidebar__item ${isActive ? "im-sidebar__item--ativo" : ""}`
                  }
                >
                  <Icone size={17} strokeWidth={2.2} />
                  <span className="im-sidebar__rotulo">{rotulo}</span>
                  {selo && (
                    <span className={`im-sidebar__selo ${destaque ? "im-sidebar__selo--destaque im-pulse" : ""}`}>
                      {selo}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
