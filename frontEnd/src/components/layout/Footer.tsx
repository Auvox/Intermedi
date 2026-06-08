import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Brand */}
          <div>
            <div className="footer-brand-logo">
              <div className="footer-brand-logo-mark">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <span className="footer-brand-name"><span>Inter</span>medi</span>
            </div>
            <p className="footer-tagline">
              Conectando o setor farmacêutico através de match inteligente de estoques.
            </p>
            <div className="footer-anvisa">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              Parceiro ANVISA certificado
            </div>
          </div>

          {/* Plataforma */}
          <div className="footer-col">
            <div className="footer-col-title">Plataforma</div>
            <a href="#personas">Para farmácias</a>
            <a href="#personas">Para pacientes</a>
            <a href="#how">Como funciona</a>
            <a href="#partners">Parceiros</a>
            <a href="#cadastro">Cadastrar farmácia</a>
          </div>

          {/* Catálogo */}
          <div className="footer-col">
            <div className="footer-col-title">Catálogo</div>
            <a href="#partners">Medicamentos</a>
            <a href="#partners">Distribuidores</a>
            <a href="#partners">Laboratórios</a>
            <a href="#">Chamados ativos</a>
            <a href="#">Buscar remédio</a>
          </div>

          {/* Empresa */}
          <div className="footer-col">
            <div className="footer-col-title">Empresa</div>
            <a href="#">Sobre nós</a>
            <a href="#">Blog</a>
            <a href="#">Contato</a>
            <a href="#">Privacidade</a>
            <a href="#">Termos de uso</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Intermedi. Todos os direitos reservados.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#">Privacidade</a>
            <a href="#">Termos</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
