const Produto = require('../models/Produto.js')
const Entrega = require('../models/Entrega.js')

// Cria vários objetos e os adiciona a um array para simular uma lista de objetos
const bdProdutos = []
const bdEntregas = []

// Cria um objeto do tipo produto e adiciona a lista de produtos
const produto = new Produto('Nome do produto', 'Marca', 'Valor:')
bdProdutos.push(produto)
// Cria um objeto do tipo produto e adiciona a lista de produtos
const produto2 = new Produto('Nome do produto 2', 'Marca', 'Valor:')
bdProdutos.push(produto2)




// Cria um objeto do tipo entrega e adiciona a lista de entregas
const entrega = new Entrega('Título da entrega', 'Descrição da entrega', 'A fazer', new Date())
bdEntregas.push(entrega)

const entrega2 = new Entrega('Título da entrega 2', 'Descrição da entrega 2', 'A fazer', new Date())
bdEntregas.push(entrega2)

// Exporta as listas de objetos
module.exports = { bdProdutos, bdEntregas }