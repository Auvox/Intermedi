# Como plugar o painel Intermedi no seu projeto

O painel foi construído para **não tocar** no seu código existente.
Sua landing continua em `/`. O painel vive sob `/app`.

## O que você recebe

Uma pasta única: **`src/painel/`**. Tudo dela é isolado:
todas as classes CSS têm prefixo `im-` e vivem sob `.im-app`,
então não colidem com o seu `global.css`, `index.css` nem com a landing.

## Passo 1 — copie a pasta

Copie `src/painel/` inteira para dentro do seu `src/`.

## Passo 2 — instale 2 dependências

O painel usa duas libs que seu projeto ainda não tem:

```bash
npm install lucide-react recharts
```

(`react-router-dom` você já usa.)

## Passo 3 — inclua as rotas (2 linhas no seu router)

No seu `src/router/router.jsx`, adicione o import e o bloco de rotas:

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginUser from "../pages/LoginUser";
import LandingPage from "../pages/LandingPage";
import { painelRoutes } from "../painel/PainelRoutes";   // ← 1. novo import

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginUser />} />
        {painelRoutes}                                    {/* ← 2. inclusão */}
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
```

Pronto. Nada mais no seu código muda.

## Rotas do painel

| URL                     | Tela                 |
|-------------------------|----------------------|
| `/app`                  | Painel               |
| `/app/chamados`         | Lista de chamados    |
| `/app/matches`          | Matches encontrados  |
| `/app/medicamentos`     | Catálogo (CRUD)      |
| `/app/parceiras`        | Farmácias parceiras  |
| `/app/minha-farmacia`   | Gestão e indicadores |

## Ligar a landing ao painel

O botão "Entrar" da sua `Nav.jsx` hoje vai para `/login`.
Quando quiser mandar para o painel, troque o destino:

```jsx
<NavLink to="/app"><button className="btn-nav-primary">Entrar</button></NavLink>
```

Ou, depois do login, redirecione para `/app`.

## Por que não há conflito

1. **CSS isolado** — todo estilo do painel é `.im-*` sob `.im-app`.
   Seu `--green`, `.btn`, `.section` continuam valendo só na landing.
2. **`#root` de 1126px** — seu `index.css` fixa essa largura, ótima para a
   landing. O painel a libera **só quando está na tela**, via a regra
   `#root:has(.im-app)` dentro de `painel/styles/base.css`. A landing nunca
   é afetada.
3. **Rotas separadas** — a landing é `/`, o painel é `/app/*`. Sem sobreposição.

## Mudar o prefixo /app

Se preferir outro prefixo (ex.: `/painel`), troque em dois lugares:
- `painel/config/navegacao.js` → constante `BASE`
- `painel/PainelRoutes.jsx` → `<Route path="app" ...>`

## Trocar os dados de exemplo pela sua API

Os arquivos em `painel/data/` exportam arrays no formato que as telas esperam.
Substitua cada `export const` por uma chamada ao seu backend. Só as páginas
importam de `data/`; os componentes recebem tudo por props.
