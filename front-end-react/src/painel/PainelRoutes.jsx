import { Route } from "react-router-dom";
import { AppLayout } from "./components/layout";
import { ModaisProvider } from "./context/ModaisContext";

import Painel from "./pages/Painel";
import Chamados from "./pages/Chamados";
import Matches from "./pages/Matches";
import Medicamentos from "./pages/Medicamentos";
import Parceiras from "./pages/Parceiras";
import Farmacia from "./pages/Farmacia";
import EmBreve from "./pages/EmBreve";

// estilos do painel — carregados uma única vez, todos com prefixo .im-
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/animations.css";

/**
 * Casca do painel: envolve o layout no provider dos modais.
 * Fica separada para que o elemento da rota-mãe seja só este componente.
 */
function PainelShell() {
  return (
    <ModaisProvider>
      <AppLayout />
    </ModaisProvider>
  );
}

/**
 * Bloco de rotas do painel, para ser incluído dentro do <Routes> do projeto.
 *
 * Uso em router.jsx:
 *   import { painelRoutes } from "../painel/PainelRoutes";
 *   ...
 *   <Routes>
 *     <Route path="/" element={<LandingPage />} />
 *     {painelRoutes}
 *   </Routes>
 *
 * As rotas ficam sob /app (definido em config/navegacao.js -> BASE).
 * Caminhos relativos aqui = "app", "app/chamados"… (sem barra inicial),
 * porque o React Router resolve relativo à raiz do <Routes>.
 */
export const painelRoutes = (
  <Route path="app" element={<PainelShell />}>
    <Route index element={<Painel />} />
    <Route path="chamados" element={<Chamados />} />
    <Route path="matches" element={<Matches />} />
    <Route path="medicamentos" element={<Medicamentos />} />
    <Route path="parceiras" element={<Parceiras />} />
    <Route path="minha-farmacia" element={<Farmacia />} />
    <Route
      path="relatorios"
      element={
        <EmBreve
          titulo="Relatórios"
          texto="Fechamentos de trocas, curva ABC e exportação para o ERP entram nesta área."
        />
      }
    />
    <Route
      path="configuracoes"
      element={
        <EmBreve
          titulo="Configurações"
          texto="Dados da unidade, usuários, raio padrão de busca e regras de aceite automático."
        />
      }
    />
    <Route
      path="*"
      element={
        <EmBreve
          titulo="Página não encontrada"
          texto="O endereço acessado não existe no painel. Use o menu lateral para voltar."
        />
      }
    />
  </Route>
);
