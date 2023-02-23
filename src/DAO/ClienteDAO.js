// Importa o bd.js para poder usar o banco de dados simulado
const db = require("../infra/bd");


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe UsuarioController... Alguns vão dar retorno e para outros, isso não será necessário
class ClienteDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM CLIENTE"; 
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }


  // GET  --  Função GET - Retorna APENAS UMA linha que será a linha do usuário dono do email que passamos por parâmetro. No callback existe o argumento ROW, no SINGULAR
  static buscarPorID(id) {
    const query = "SELECT * FROM CLIENTE WHERE ID = ?";

    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }


  // POST  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR, porém devolvemos os usuário
  static inserir(cliente) {
    const query = `INSERT INTO CLIENTE (id, nome, email, endereco, cpf, telefone) VALUES (?, ?, ?, ?. ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(query, [cliente.id, cliente.nome, cliente.email, cliente.endereco, cliente.cpf, cliente.telefone], (err) => {
        if (err) {
          reject({
            messagem: "Erro ao inserir o cliente",
            erro: err,
          });
        }
        resolve(cliente);
      });
    });
  }


  // PUT  --   Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Usuário atualizado com sucesso" }
  static atualizar(ID, cliente) {
    const query =
      "UPDATE CLIENTE SET  ID = ?, NOME = ?, EMAIL = ?, ENDERECO = ?, CPF = ?, TELEFONE = ?,  WHERE ID = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [cliente.ID, cliente.NOME, cliente.EMAIL, cliente.ENDERECO, cliente.CPF, cliente.TELEFONE, ID],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o cliente",
              erro: err,
            });
          }
          resolve({ mensagem: "Cliente atualizado com sucesso" });
        }
      );
    });
  }


  // DELETE  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Usuário deletado com sucesso", email: email }
  static deletar(id) {    
    const query = "DELETE FROM CLIENTE WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o cliente",
            erro: err,
          });
        }
        resolve({ mensagem: "Cliente deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
module.exports = ClienteDAO;
