// Importando o packages
const express = require('express')

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json())

// importando os controllers
const usuarioController = require('./controllers/usuario-controller.js')
const produtoController = require('./controllers/produto-controller.js')

usuarioController.rotas(app)
produtoController.rotas(app)

module.exports = app
