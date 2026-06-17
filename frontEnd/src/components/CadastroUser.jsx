import React from "react";
import {useForm} from "../hooks/useForm.jsx"
import { Input } from "./Input.jsx";

 function CadastroUser() {

  const nome = useForm("nome")
  

  function handleSubmit(e) {
    e.preventDefault() 
    if(nome.validate()) {
      console.log("enviou")
    } else {
      console.log("nao enviou")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input />
      </form>
    </div>
  );
}


export default CadastroUser;