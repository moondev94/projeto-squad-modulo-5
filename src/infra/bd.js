const Usuario = require('../models/Usuario.js')
const Produto= require('../models/Produto.js')

// Cria vários objetos e os adiciona a um array para simular uma lista de objetos
const bdUsuarios = []
const bdProdutos = []

// Cria um objeto do tipo Usuario e adiciona a lista de usuarios
const usuario = new Usuario('Nome do usuário', 'email@email.com', 'Senha')
bdUsuarios.push(usuario)
// Cria um objeto do tipo Usuario e adiciona a lista de usuarios
const usuario2 = new Usuario('Nome do usuário 2', 'email2@email.com', 'Senha 2')
bdUsuarios.push(usuario2)




// Cria um objeto do tipo Tarefa e adiciona a lista de tarefas
const produto = new Produto('Nome', 'Descrição', 'Id', 'Preco')
bdProdutos.push(produto)

const produto2 = new Produto('Nome 2', 'Descrição 2', 'Id 2', 'Preco 2')
bdProdutos.push(produto2)

// Exporta as listas de objetos
module.exports = { bdUsuarios, bdProdutos }