const response = await fetch('http://localhost:3000/cadastrarFarmacia', {
    method: 'POST', 
    headers: {
        "Content-Type": "application/json"
    }, 
    body: JSON.stringify({nome: "Fabas"})
}); 

const json = await response.json()

console.log(json)