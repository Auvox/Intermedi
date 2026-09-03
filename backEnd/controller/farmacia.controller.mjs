import * as serviceFarmacia from '../services/farmacia.service.mjs';

export async function cadastrarFarmacia(req, res) {
    try {
        const chunks = [];

        for await (const chunk of req) {
            chunks.push(chunk);
        }

        const body = Buffer.concat(chunks).toString('utf-8');
        console.log("body:", body);

        const data = JSON.parse(body);
        console.log("data:", data);

        const result = serviceFarmacia.cadastrar(data);
        console.log("result:", result);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            mensagem: "Farmácia cadastrada com sucesso!",
            resultado: result
        }));

    } catch (error) {
        console.error("ERRO AO CADASTRAR FARMÁCIA:", error);

        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            error: error.message
        }));
    }
}