const response = await fetch("http://localhost:3000/cadastrarFarmacia", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  }, 
  body: JSON.stringify({
    nomeFarmacia: 'Sla',
    cnesFarmacia: '123456',
    telFarmacia: '123456'
  })
});

const json = await response.json();

console.log(json);
