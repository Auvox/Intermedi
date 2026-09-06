const response = await fetch("http://localhost:3000/deletarRemedio/2", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
});

const json = await response.json();

console.log(json);
