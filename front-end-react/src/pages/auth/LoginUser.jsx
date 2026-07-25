import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";
import "./auth.css";

/**
 * Tela de acesso (somente front).
 * Entrar e Solicitar acesso levam ao painel; nada é validado.
 */
export default function LoginUser() {
  const navegar = useNavigate();
  const [verSenha, setVerSenha] = useState(false);
  const [lembrar, setLembrar] = useState(true);

  return (
    <div className="au-tela au-tela--login">
      <div className="au-lado au-lado--esq" />

      <main className="au-painel">
        <div className="au-emblema">
          {/* três pessoas: equipe da farmácia */}
          <svg width="150" height="120" viewBox="0 0 150 120" fill="currentColor">
            <circle cx="42" cy="42" r="13" />
            <path d="M24 96c0-13 8-22 18-22s18 9 18 22a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4Z" />
            <circle cx="108" cy="42" r="13" />
            <path d="M90 96c0-13 8-22 18-22s18 9 18 22a4 4 0 0 1-4 4H94a4 4 0 0 1-4-4Z" />
            <circle cx="75" cy="30" r="17" />
            <path d="M52 100c0-16 10-27 23-27s23 11 23 27a5 5 0 0 1-5 5H57a5 5 0 0 1-5-5Z" />
          </svg>
        </div>

        <form className="au-form" onSubmit={(e) => { e.preventDefault(); navegar("/app"); }}>
          <div className="au-campo">
            <input className="au-input" type="email" placeholder="E-mail" autoComplete="email" />
          </div>

          <div className="au-campo">
            <input
              className="au-input"
              type={verSenha ? "text" : "password"}
              placeholder="Senha"
              autoComplete="current-password"
            />
            <button type="button" className="au-olho" onClick={() => setVerSenha((v) => !v)} aria-label="Mostrar senha">
              {verSenha ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <div className="au-linha">
            <label className="au-lembre" onClick={() => setLembrar((v) => !v)}>
              <span className={`au-check ${lembrar ? "" : "au-check--off"}`}>
                {lembrar && <Check size={15} strokeWidth={3} />}
              </span>
              lembre de mim
            </label>
            <button type="button" className="au-esqueceu">Esqueceu da senha ?</button>
          </div>

          <button type="submit" className="au-botao au-botao--solido">ENTRAR</button>
        </form>

        <div className="au-rodape">
          <p className="au-rodape__pergunta">Já possui uma conta?</p>
          <button className="au-botao au-botao--contorno" onClick={() => navegar("/cadastro")}>
            SOLICITAR ACESSO
          </button>
        </div>
      </main>

      <div className="au-lado au-lado--dir" />
    </div>
  );
}
