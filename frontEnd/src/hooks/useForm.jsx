import React from "react";

const types = {
  nome: {
    regex: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/,
    message: "Preencha um nome válido",
  },
};

export function useForm(type) {
  const [value, setValue] = React.useState("");
  const [erro, setErro] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setErro("Preenha um valor");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setErro(types[type].message);
      return false;
    } else {
      setErro(null);
      return true;
    }
  }

  function onChange({target}) {
    if(erro) validate(target.value); 
    setValue(target.value); 
  }

  return {
    value, 
    setValue, 
    onChange, 
    erro,
    onBlur: () =>validate(value), 
    validate:() => validate(value)
  }
}
