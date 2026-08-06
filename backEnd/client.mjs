const response = await fetch('http://localhost:3000'); 

const json = await response.json()
JSON.stringify(json)

console.log(JSON.stringify(json))