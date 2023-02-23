// Importa o bd.js para poder usar o banco de dados simulado
const db = require("../infra/bd");


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe UsuarioController... Alguns vão dar retorno e para outros, isso não será necessário
class ProdutoDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM PRODUTO"; 
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
    const query = "SELECT * FROM PRODUTO WHERE ID = ?";

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
  static inserir(produto) {
    const query = `INSERT INTO PRODUTO (id, nome, marca, modelo, descricao, valor) VALUES (?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(query, [produto.id, produto.nome, produto.marca, produto.modelo, produto.descricao, produto.valor], (err) => {
        if (err) {
          reject({
            messagem: "Erro ao inserir o produto no banco de dados",
            erro: err,
          });
        }
        resolve(produto);
      });
    });
  }


  // PUT  --   Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Usuário atualizado com sucesso" }
  static atualizar(id, produto) {
    const query = 'UPDATE PRODUTO SET id = ?, nome = ?, marca = ?, modelo = ?, descricao = ?, valor = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(query, [produto.id, produto.nome, produto.marca, produto.modelo, produto.descricao, produto.valor, id], (err) => {
            if (err) {
                reject(err);
            }
            resolve({mensagem:'Produto atualizado'});
        });
    });
}


  // DELETE  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Usuário deletado com sucesso", email: email }
  static deletar(id) {    
    const query = "DELETE FROM PRODUTO WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o produto",
            erro: err,
          });
        }
        resolve({ mensagem: "Produto deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
module.exports = ProdutoDAO;
