// Função auxiliar para capturar o body da requisição no Node.js nativo.

function parseBody(req) {
  return new Promise((resolve, reject) => {
    // lê os chuncks da requisição.
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    // Lê o body da requisição
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", (err) => reject(err));
  });
}

export async function loginPaciente(req, res) {
  try {
    // Lê os dados enviados no fetch ou no Postman.
    const body = await parseBody(req);
    const { email, senha } = body;

    // Validação simples de email e senha.
    if (!email || !senha) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "Email e senha são obrigatórios" }));
    }

    // Para fazer: Adicionar a lógica de consulta do banco de dados aqui (SQLite):

    // Resposta de sucesso temporária
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        mensagem: "Login realizado com sucesso!",
        paciente: { email }
      })
    );
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Erro interno no servidor" }));
  }
}