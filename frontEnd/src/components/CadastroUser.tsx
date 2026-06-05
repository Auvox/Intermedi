import { useState } from "react";

function CadastroUser() {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState(""); 
  const [complemento, setComplemento] = useState(""); 
  
  function enviar() {

    fetch("http://localhost/repositorioIntermedi/Intermedi/backEnd/api/usuarios/cadastrarUsuario.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
        telefone: telefone,
        logradouro: logradouro,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        uf: uf,
        cep: cep,
        complemento: complemento,
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert(data.message);
    })
    .catch(err => {
      console.log(err);
    });

  }

  return (
    <div>

      <input
        type="text"
        placeholder="Nome"
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="CPF"
        onChange={(e) => setCpf(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />

       <input
        type="text"
        placeholder="Telefone"
        onChange={(e) => setTelefone(e.target.value)}
      />

       <input
        type="text"
        placeholder="Logradouro"
        onChange={(e) => setLogradouro(e.target.value)}
      />

       <input
        type="text"
        placeholder="Numero"
        onChange={(e) => setNumero(e.target.value)}
      />

       <input
        type="text"
        placeholder="Bairro"
        onChange={(e) => setBairro(e.target.value)}
      />

       <input
        type="text"
        placeholder="Cidade"
        onChange={(e) => setCidade(e.target.value)}
      />

       <input
        type="text"
        placeholder="Estado"
        onChange={(e) => setEstado(e.target.value)}
      />

       <input
        type="text"
        placeholder="Uf"
        onChange={(e) => setUf(e.target.value)}
      />
      
       <input
        type="text"
        placeholder="CEP"
        onChange={(e) => setCep(e.target.value)}
      />

       <input
        type="text"
        placeholder="Complemento"
        onChange={(e) => setComplemento(e.target.value)}
      />

      <button onClick={enviar}>
        Cadastrar
      </button>

      <div>
        Olá {nome}
      </div>

    </div>
  );
}

export default CadastroUser;