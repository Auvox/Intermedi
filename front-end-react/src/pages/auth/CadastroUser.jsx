import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./auth.css";

/**
 * Cadastro da farmácia (somente front).
 * Cadastrar leva ao painel; nada é validado.
 */
export default function CadastroUser() {
  const navegar = useNavigate();
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirma, setVerConfirma] = useState(false);

  return (
    <div className="au-tela au-tela--login">
      <div className="au-lado au-lado--esq" />

      <main className="au-painel">
        <div className="au-emblema">
          {/* prédio + pessoa: empresa parceira */}
          <svg width="90" height="150" viewBox="0 0 90 150" fill="currentColor">
            <circle cx="45" cy="20" r="15" />
            <rect x="24" y="46" width="42" height="86" rx="3" />
            <g fill="#fff">
              <rect x="31" y="55" width="7" height="7" rx="1" />
              <rect x="42" y="55" width="7" height="7" rx="1" />
              <rect x="53" y="55" width="7" height="7" rx="1" />
              <rect x="31" y="68" width="7" height="7" rx="1" />
              <rect x="42" y="68" width="7" height="7" rx="1" />
              <rect x="53" y="68" width="7" height="7" rx="1" />
              <rect x="31" y="81" width="7" height="7" rx="1" />
              <rect x="42" y="81" width="7" height="7" rx="1" />
              <rect x="53" y="81" width="7" height="7" rx="1" />
              <rect x="31" y="94" width="7" height="7" rx="1" />
              <rect x="42" y="94" width="7" height="7" rx="1" />
              <rect x="53" y="94" width="7" height="7" rx="1" />
              <rect x="40" y="110" width="10" height="22" rx="1" />
            </g>
          </svg>
        </div>

        <form className="au-form" onSubmit={(e) => { e.preventDefault(); navegar("/app"); }}>
          <div className="au-campo">
            <input className="au-input" type="text" placeholder="Nome da Empresa" />
          </div>
          <div className="au-campo">
            <input className="au-input" type="text" placeholder="CNPJ" />
          </div>
          <div className="au-campo">
            <input className="au-input" type="email" placeholder="E-mail Corporativo" />
          </div>
          <div className="au-campo">
            <input className="au-input" type="text" placeholder="Nome do Responsável" />
          </div>
          <div className="au-campo">
            <input className="au-input" type={verSenha ? "text" : "password"} placeholder="Senha" />
            <button type="button" className="au-olho" onClick={() => setVerSenha((v) => !v)} aria-label="Mostrar senha">
              {verSenha ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="au-campo">
            <input className="au-input" type={verConfirma ? "text" : "password"} placeholder="Confirmar Senha" />
            <button type="button" className="au-olho" onClick={() => setVerConfirma((v) => !v)} aria-label="Mostrar senha">
              {verConfirma ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button type="submit" className="au-botao au-botao--solido">CADASTRAR</button>
        </form>
      </main>

      <div className="au-lado au-lado--dir" />
    </div>
  );
}
