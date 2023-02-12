const express = require('express');
const app = express();

// Aqui estamos configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json());

// Criando a rota PUT
app.put('/api/tarefas/:id', (req, res) => {
  // Aqui estamos pegando o ID da tarefa a partir dos parâmetros da URL
  const id = req.params.id;

  // Aqui estamos pegando as informações da tarefa a partir do corpo da requisição
  const tarefa = req.body;

  // Aqui estamos fazendo uma lógica de atualização da tarefa, por exemplo, procurando a tarefa
  // no banco de dados e atualizando-a com as informações recebidas
  // ...

  // Aqui estamos retornando uma resposta para o cliente, indicando que a tarefa foi atualizada com sucesso
  return res.status(200).send({
    message: `A tarefa de ID ${id} foi atualizada com sucesso!`,
    tarefa: tarefa
  });
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});