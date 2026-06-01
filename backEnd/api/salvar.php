<?php

// Permite acesso do frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Pega o JSON enviado pelo React
$dados = json_decode(file_get_contents("php://input"), true);

// Variável enviada
$nome = $dados["nome"];

// Retorno da API
echo json_encode([
    "mensagem" => "Nome recebido com sucesso",
    "nome" => $nome
]);

?>