import { useState } from "react";

function LoginPaciente() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function enviar() {
    fetch("http://localhost:3000/api/pacientes/loginPaciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Erro na requisição:", err);
      });
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email do Paciente"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={enviar}>
        Entrar
      </button>
    </div>
  );
}

export default LoginPaciente;