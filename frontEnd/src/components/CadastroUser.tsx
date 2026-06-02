import { useState } from "react";

function CadastroUser() {

  const [nome, setNome] = useState("");

  function enviar() {

    fetch("http://localhost/repositorioIntermedi/Intermedi/backEnd/api/usuarios/cadastrarUsuario.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nome: nome
    })
})
.then(res => res.json())
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
});

  }

  return (
    <div>

      <input
        type="text"
        onChange={(e) => setNome(e.target.value)}
      />

      <button onClick={enviar}>
        Enviar
      </button>

    </div>
  );
}

export default CadastroUser;