import { createServer } from "node:http";

const server = createServer((request, response) => {
    response.end("Ola")
})

server.listen(3000, () => {
    console.log("Servidor: http://localhost:3000")
})