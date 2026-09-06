import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginUser from "../pages/auth/LoginUser";
import CadastroUser from "../pages/auth/CadastroUser";
import { painelRoutes } from "../painel/PainelRoutes";

function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/login" element={<LoginUser />}/>
                <Route path="/cadastro" element={<CadastroUser />}/>
                {/* Painel administrativo — vive sob /app, isolado da landing */}
                {painelRoutes}
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
