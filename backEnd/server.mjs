import { createServer } from "node:http";
import { Router } from "./router.mjs";

const router = new Router();

router.get("/", (req, res) => {
  res.end("HOME");
});

// ---------------------------------------
// CRUD FARMACIA

// CADASTRA FARMACIA
router.post("/cadastrarFarmacia", (req, res) => {
  res.end("Cadastrar farmacia");
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
