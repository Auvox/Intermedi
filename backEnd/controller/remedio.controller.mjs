import * as serviceRemedio from "../services/remedio.service.js";

// Captura de forma nativa do node o body dessa requisição
function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];


    // recebe os dados "data" em partes.
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf-8").trim();

        // teste para ver se o body recebe os valores
        console.log("STRING RECEBIDA NO BODY:", JSON.stringify(raw));

        if (!raw) {
          return resolve({});
        }
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (err) => reject(err));
  });
}

// POST /remedios - Cadastrar remédio
export async function cadastrarRemedio(req, res) {
  try {
    const data = await parseBody(req);

    if (!data || Object.keys(data).length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "O corpo da requisição está vazio ou mal formatado",
        })
      );
    }

    // executa a ação cadastrar da pasta service.
    const remedio = serviceRemedio.cadastrar(data);

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        status: "CADASTRADO COM SUCESSO - POST",
        recebido: remedio,
      })
    );
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        error: "JSON inválido: " + error.message,
      })
    );
  }
}

// GET /remedios - Consultar todos os remédios
export async function consultarRemedio(req, res) {
  try {
    const remedios = serviceRemedio.listar();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        mensagem: "TODOS OS REMEDIOS CADASTRADOS - GET",
        remedios,
      })
    );
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        error: "Erro ao consultar remédios",
      })
    );
  }
}

// GET /remedios/:id - Buscar remédio por ID
export async function buscarRemedio(req, res) {
  try {
    const id = req.params.id;
    const remedio = serviceRemedio.buscarPorId(id);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        status: "Remedio encontrado",
        resultado: remedio,
      })
    );
  } catch (error) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        error: "Remedio nao encontrado",
      })
    );
  }
}

// PUT /remedios/:id - Editar remédio
export async function editarRemedio(req, res) {
  const id = req.params.id;
  try {
    const dataRemedio = await parseBody(req);
    const remedio = serviceRemedio.editar(id, dataRemedio);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        status: "Remedio atualizado",
        alterados: remedio.changes,
      })
    );
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        error: error.message,
      })
    );
  }
}

// DELETE /remedios/:id - Deletar remédio
export async function deletarRemedio(req, res) {
  const id = Number(req.params.id);

  try {
    const deleteRemedio = serviceRemedio.deletar(id);

    if (deleteRemedio.changes === 0) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Remedio não encontrado",
        })
      );
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        mensagem: "Remedio Deletado!",
        deletado: deleteRemedio,
      })
    );
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        error: "Erro ao deletar remedio",
      })
    );
  }
}