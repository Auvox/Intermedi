const response = await fetch("http://localhost:3000/remedios", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
});

const json = await response.json();

console.log(json);
