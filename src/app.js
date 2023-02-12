// Importando o packages
const express = require('express')

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json())

// importando os controllers
const produtoController = require('./controllers/produtoController.js')
const entregaController = require('./controllers/entregaController.js')

produtoController.rotas(app)
entregaController.rotas(app)

module.exports = app
