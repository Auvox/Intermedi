<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include './config/conexao.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dados = json_decode(file_get_contents("php://input"), true);

if(isset($dados["nome"])){

    $nome = $dados["nome"];

    try{

        $sql = "INSERT INTO testeuser (nome) VALUES (:nome)";
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(":nome", $nome);

        if($stmt->execute()){
            echo json_encode([
                "sucesso" => true,
                "mensagem" => "Cadastro realizado com sucesso"
            ]);
        }else{

            echo json_encode([
                "sucesso" => false,
                "mensagem" => "Erro ao salvar"
            ]);

        }

    } catch (PDOException $e) {

        echo json_encode([
            "erro" => $e->getMessage()
        ]);

    }

}else{

    echo json_encode([
        "erro" => "Nenhum nome enviado"
    ]);

}