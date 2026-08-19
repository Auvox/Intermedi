const response = await fetch('http://localhost:3000/deletarFarmacia', {
    method: 'DELETE'
}); 

const json = await response.text()

console.log(json)