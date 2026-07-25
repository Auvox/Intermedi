import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import "./AppLayout.css";

/** Casca do painel: menu lateral, barra superior e área de conteúdo. */
export function AppLayout() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="im-app">
      <Sidebar aberta={menuAberto} aoFechar={() => setMenuAberto(false)} />

      <div className="im-conteudo">
        <TopBar aoAbrirMenu={() => setMenuAberto(true)} />

        {/* a key remonta a página a cada rota, reiniciando as animações */}
        <main className="im-principal" key={pathname}>
          <div className="im-wrap"><Outlet /></div>
        </main>

        <footer className="im-rodape">
          <div className="im-wrap">
            <p>© 2026 Intermedi · Interligando medicamentos</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
