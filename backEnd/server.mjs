import { createServer } from "node:http";
import { Router } from "./router.mjs";

const router = new Router();

router.get("/", (req, res) => {
  res.end("HOME");
});

// ---------------------------------------
// CRUD FARMACIA

// CADASTRA FARMACIA
router.post("/cadastrarFarmacia", async (req, res) => {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf-8");
  try {
    const dataFarmacia = JSON.parse(body);
    console.log("Nova Farmacia Recebida", dataFarmacia);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "Sucesso", recebido: dataFarmacia }));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Playod JSON inválido" }));
  }
});

// CONSULTA FARMACIAS
router.get("/consultarFarmacia", (req, res) => {
  res.end("Consultar Farmacia");
});

// EDITAR/ATUALIZAR FARMACIAS
router.put("/editarFarmacia", (req, res) => {
  res.end("Atualizar Farmacia");
});

// DELETAR FARMACIAS
router.delete("/deletarFarmacia", (req, res) => {
  res.end("Deletar Farmacia");
});

// -----------------------------------------------

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === 'OPTIONS') {
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
