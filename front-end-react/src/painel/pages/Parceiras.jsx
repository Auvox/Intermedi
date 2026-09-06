import { useState } from "react";
import { Users, MapPin, Phone, Mail } from "lucide-react";
import { Secao } from "../components/layout";
import { Card, Botao, Tag, StatusTag, Abas, Busca } from "../components/ui";
import { PARCEIRAS, FILTROS_PARCEIRA } from "../data/parceiras";
import "./Parceiras.css";

export default function Parceiras() {
  const [filtro, setFiltro] = useState("Todas");

  return (
    <Secao
      icone={Users}
      rotulo="Seção única"
      titulo="Farmácias parceiras"
      descricao="Consulta em leitura: quem já trocou medicamentos com a sua unidade."
    >
      <div className="im-parceiras__ferramentas">
        <Busca placeholder="Buscar farmácia, responsável ou CRF" largura={240} />
        <Abas opcoes={FILTROS_PARCEIRA} ativa={filtro} aoTrocar={setFiltro} />
        <span className="im-fill" />
        <Tag>Somente leitura</Tag>
      </div>

      <div className="im-grid im-grid--4">
        {PARCEIRAS.map((parceira) => (
          <Card className="im-parceira" key={parceira.nome}>
            <header className="im-parceira__topo">
              <span className="im-parceira__avatar">{parceira.iniciais}</span>
              <StatusTag status={parceira.status} />
            </header>

            <p className="im-parceira__nome">{parceira.nome}</p>
            <p className="im-parceira__responsavel">{parceira.responsavel} · {parceira.crf}</p>

            <ul className="im-parceira__contato">
              <li><MapPin size={13} />{parceira.cidade}</li>
              <li><Phone size={13} />{parceira.telefone}</li>
              <li className="im-truncate"><Mail size={13} />{parceira.email}</li>
            </ul>

            <footer className="im-parceira__rodape">
              <div>
                <p className="im-parceira__trocas im-num">{parceira.trocas}</p>
                <p className="im-parceira__trocas-rotulo">trocas concluídas</p>
              </div>
              <Botao variante="sutil">Ver histórico</Botao>
            </footer>
          </Card>
        ))}
      </div>
    </Secao>
  );
}
