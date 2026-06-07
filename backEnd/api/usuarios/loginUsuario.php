<?php

include '../../config/conexao.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dados = json_decode(file_get_contents("php://input"), true);

if(
    !isset($dados["email"]) ||
    !isset($dados["senha"])
){
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Dados inválidos"
    ]);
    exit;
}

$email = $dados["email"];
$senha = $dados["senha"];

try {

    $sql = "SELECT * FROM usuario WHERE email = :email";

    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":email", $email);

    $stmt->execute();

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$usuario){

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Usuário não encontrado"
        ]);

        exit;
    }

    if(password_verify($senha, $usuario["senha"])){

        echo json_encode([
            "sucesso" => true,
            "mensagem" => "Login realizado",
            "usuario" => [
                "id" => $usuario["id"],
                "nome" => $usuario["nome"],
                "email" => $usuario["email"]
            ]
        ]);

    }else{

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Senha incorreta"
        ]);

    }

} catch(PDOException $e){

    echo json_encode([
        "sucesso" => false,
        "erro" => $e->getMessage()
    ]);

}