import { createServer } from "node:http";
import { Router } from "./router.mjs";
import db from "./database/database.mjs";
const router = new Router();

router.get("/", (req, res) => {
  res.end("HOME");
});
// CADASTRA REMEDIO
router.post("/cadastrarRemedio", async (req, res) => {
  try {
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const body = Buffer.concat(chunks).toString("utf-8");

    const dataRemedio = JSON.parse(body);

    console.log("Nova Remedio Recebida", dataRemedio);

    const insert = db.prepare(/*sql*/ `
      INSERT OR IGNORE INTO "tbCadastroRemedio" 
        ("nomeRemedio", "descRemedio", "dosagemRemedio", "fabricanteRemedio")
      VALUES 
        (?, ?, ?, ?)
      `);

    insert.run(
      dataRemedio.nomeRemedio,
      dataRemedio.descRemedio,
      dataRemedio.dosagemRemedio,
      dataRemedio.fabricanteRemedio,
    );

    // --------------

    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        status: "CADASTRADO COM SUCESSO - POST",
        recebido: dataRemedio,
      }),
    );
  } catch (error) {
    console.log(error);
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        error: "JSON inválido",
      }),
    );
  }
});

// CONSULTA REMEDIO
router.get("/consultarRemedio", (req, res) => {
  try {
    const remedios = db
      .prepare(
        /*sql*/ `
      SELECT * FROM "tbCadastroRemedio"
      `,
      )
      .all();

    res.end(
      JSON.stringify({
        mensagem: "TODOS OS REMEDIO CADASTRADOS - GET",
        remedios,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        error: "JSON inválido",
      }),
    );
  }
});

// EDITAR/ATUALIZAR REMEDIO
router.put("/editarRemedio/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const body = Buffer.concat(chunks).toString("utf-8");
    console.log("BODY", body);
    const dataRemedio = JSON.parse(body);
    console.log("REMEDIO", dataRemedio);
    const update = db.prepare(/*sql*/ `
      UPDATE tbCadastroRemedio
      SET 
        "nomeRemedio" = ?, 
        "descRemedio" = ?, 
        "dosagemRemedio" = ?, 
        "fabricanteRemedio" = ?
      WHERE 
        "idRemedio" = ?
      `);

    const resultado = update.run(
      dataRemedio.nomeRemedio,
      dataRemedio.descRemedio,
      dataRemedio.dosagemRemedio,
      dataRemedio.fabricanteRemedio,
      id,
    );

    res.setHeader("ContentType", "application/json");

    res.end(
      JSON.stringify({
        mensagem: "Remedio atualizado com sucesso - PUT",
        alterados: resultado.changes,
      }),
    );
  } catch (error) {
    console.error("ERRO REAL:", error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        error: error.message,
      }),
    );
  }
});

// DELETAR REMEDIO
router.delete("/deletarRemedio/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const deletar = db.prepare(/*sql*/ `
        DELETE FROM tbCadastroRemedio 
        WHERE "idRemedio" = ?
      `);

    const resultado = deletar.run(id);

    // se o remedio nao existir
    if (resultado.changes === 0) {
      res.statusCode = 404;

      return res.end(
        JSON.stringify({
          error: "Remedio não encontrado",
        }),
      );
    }

    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        mensagem: "Remedio Deletado com sucesso - DELETE",
        deletado: resultado,
      }),
    );
  } catch (error) {
    console.log(error);
    res.statusCode = 500;

    res.end(
      JSON.stringify({
        error: "Erro ao deletar remedio",
      }),
    );
  }
});

// -----------------------------------------------

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, "http://localhost");

  const handle = router.find(req.method, url.pathname);
  if (handle) {
    handle(req, res);
  } else {
    res.statusCode = 404;
    res.end("Nao encontrado");
  }
});

server.listen(3000, () => {
  console.log("Servidor: http://localhost:3000");
});
