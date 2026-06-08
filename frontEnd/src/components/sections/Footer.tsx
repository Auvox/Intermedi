import { IMG2 } from "../../constants/images";
import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div className="footer-logo-wrap">
            <img src={IMG2} alt="Intermedi" />
          </div>
          <p className="footer-tagline">
            Conectamos farmácias, distribuidores e laboratórios para garantir
            qualidade e eficiência na cadeia farmacêutica brasileira.
          </p>
          <div className="footer-newsletter">
            <input type="email" placeholder="Seu e-mail profissional" />
            <button>Assinar</button>
          </div>
          <div className="footer-socials">
            {(["𝕏", "in", "f", "▶"] as const).map((icon, i) => (
              <a key={i} href="#" className="social-btn" aria-label={icon}>{icon}</a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <div className="footer-col-title">Plataforma</div>
          <ul className="footer-links">
            {["Início", "Como funciona", "Catálogo", "Parceiros", "Depoimentos"].map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="footer-col-title">Contato</div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon">✉</div>
            contato@intermedi.com.br
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon">📞</div>
            (11) 99999-9999
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon">📍</div>
            São Paulo, SP
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 <span>Intermedi</span>. Todos os direitos reservados.</span>
        <div className="footer-legal">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
          <a href="#">LGPD</a>
        </div>
      </div>
    </footer>
  );
}
