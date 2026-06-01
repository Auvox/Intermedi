<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

// Responde o preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dados = json_decode(file_get_contents("php://input"), true);

if(isset($dados["nome"])){

    $nome = $dados["nome"];

    echo json_encode([
        "mensagem" => "Nome recebido com sucesso",
        "nome" => $nome
    ]);

}else{

    echo json_encode([
        "erro" => "Nenhum nome enviado"
    ]);

}