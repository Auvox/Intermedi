// depois vou terminar essa parte do usuário

import { loginPaciente } from '../controller/paciente.controller.mjs';


// aqui é só um post simples para a api dos pacientes.
export default function pacienteRoutes(router) {
  router.post('/api/pacientes/loginPaciente', async (req, res) => {
    await loginPaciente(req, res);
  });
}