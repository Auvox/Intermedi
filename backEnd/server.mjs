import { createServer } from "node:http";

const server = createServer((request, response) => {
    // response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    response.end({nome: "Fabas"});

});

server.listen(3000, () => {
  console.log("Servidor: http://localhost:3000");
});
