# Telas de Login e Cadastro — Intermedi

Reconstruídas fiéis às imagens: painel branco central, laterais verdes
(manchas no login, padrão de cruzes no cadastro), campos com linha inferior
que fica verde no foco, botões arredondados. Somente front, sem validação.

## O que muda no seu projeto

Uma pasta nova, `src/pages/auth/`, e 3 linhas no seu `router.jsx`.
Seus arquivos antigos `pages/LoginUser.tsx` e `pages/CadastroUser.tsx`
continuam onde estão — nada foi apagado. As rotas só passam a apontar
para as telas novas.

## Passo 1 — copie a pasta

Copie `src/pages/auth/` para dentro do seu `src/pages/`.
Ela tem: LoginUser.jsx, CadastroUser.jsx, auth.css.

## Passo 2 — ajuste o router

Seu src/router/router.jsx fica assim:

    import React from "react";
    import { BrowserRouter, Route, Routes } from "react-router-dom";
    import LandingPage from "../pages/LandingPage";
    import LoginUser from "../pages/auth/LoginUser";
    import CadastroUser from "../pages/auth/CadastroUser";
    import { painelRoutes } from "../painel/PainelRoutes";

    function Rotas() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/cadastro" element={<CadastroUser />} />
            {painelRoutes}
          </Routes>
        </BrowserRouter>
      );
    }

    export default Rotas;

## Fluxo pronto

- /login  -> botao ENTRAR vai para /app (o painel)
- /login  -> SOLICITAR ACESSO vai para /cadastro
- /cadastro -> botao CADASTRAR vai para /app

Nada e validado; e so navegacao de front, como pedido.

## Dependencia

As telas usam lucide-react (icones do olho e do check), que o painel ja
trouxe. Se ainda nao instalou: npm install lucide-react.

## Efeitos incluidos

- linha do campo cresce do centro em verde ao focar
- placeholder fica verde no foco
- botao solido: sobe, sombra cresce e uma luz varre no hover
- botao de contorno: preenche de verde no hover
- olho de senha e checkbox com micro-hover
- entrada suave dos campos, em cascata
- tudo respeita prefers-reduced-motion

## Isolamento

Todo o CSS usa prefixo au- sob .au-tela e libera a largura fixa do #root
so nestas telas (#root:has(.au-tela)). Nao afeta a landing nem o painel.
