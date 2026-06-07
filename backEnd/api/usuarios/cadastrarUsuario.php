<?php

include '../../config/conexao.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dados = json_decode(file_get_contents("php://input"), true);

if(
    isset($dados["nome"]) &&
    isset($dados["cpf"]) &&
    isset($dados["email"]) &&
    isset($dados["senha"])&&
    isset($dados["telefone"]) &&
    isset($dados["logradouro"]) &&
    isset($dados["numero"]) &&
    isset($dados["bairro"])&&
    isset($dados["cidade"]) &&
    isset($dados["estado"]) &&
    isset($dados["uf"]) &&
    isset($dados["cep"]) &&
    isset($dados["complemento"])

){

    $nome = $dados["nome"];
    $cpf = $dados["cpf"];
    $email = $dados["email"];
    $senha = $dados["senha"];
    $telefone = $dados["telefone"];
    $logradouro = $dados["logradouro"];
    $numero = $dados["numero"];
    $bairro = $dados["bairro"];
    $cidade = $dados["cidade"];
    $estado = $dados["estado"];
    $uf = $dados["uf"];
    $cep = $dados["cep"];
    $complemento = $dados["complemento"];

    try{

        $sql = "SELECT id FROM usuario WHERE cpf = :cpf";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":cpf", $cpf);
        $stmt->execute();

        if($stmt->rowCount() > 0){
            echo json_encode([
                "sucesso" => false,
                "mensagem" => "CPF já cadastrado"
            ]);
            exit;
        }
        
        $sql = "SELECT id FROM usuario WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        if($stmt->rowCount() > 0){
            echo json_encode([
                "sucesso" => false,
                "mensagem" => "E-Mail já cadastrado"
            ]);
            exit;
        }

        $sql = "INSERT INTO usuario
                (nome, cpf, email, senha, telefone, logradouro, numero, bairro, cidade, estado, uf, cep, complemento)
                VALUES
                (:nome, :cpf, :email, :senha, :telefone, :logradouro, :numero, :bairro, :cidade, :estado, :uf, :cep, :complemento)";

        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":cpf", $cpf);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":telefone", $telefone);
        $stmt->bindParam(":logradouro", $logradouro);
        $stmt->bindParam(":numero", $numero);
        $stmt->bindParam(":bairro", $bairro);
        $stmt->bindParam(":cidade", $cidade);
        $stmt->bindParam(":estado", $estado);
        $stmt->bindParam(":uf", $uf);
        $stmt->bindParam(":cep", $cep);
        $stmt->bindParam(":complemento", $complemento);

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
        "erro" => "Dados não enviados corretamente"
    ]);

}